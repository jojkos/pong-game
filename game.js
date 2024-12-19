const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const player = {
    x: 10,
    y: canvas.height / 2 - 50,
    width: 10,
    height: 100,
    dy: 0
};

const ai = {
    x: canvas.width - 20,
    y: canvas.height / 2 - 50,
    width: 10,
    height: 100,
    dy: 2
};

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speed: 4,
    dx: 4 * (Math.random() > 0.5 ? 1 : -1),
    dy: 4 * (Math.random() > 0.5 ? 1 : -1)
};

let isGameRunning = false;

function drawRect(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function drawCircle(x, y, radius, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
}

function drawText(text, x, y, color) {
    ctx.fillStyle = color;
    ctx.font = '20px Arial';
    ctx.fillText(text, x, y);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function update() {
    if (!isGameRunning) return;

    player.y += player.dy;

    if (player.y < 0) player.y = 0;
    if (player.y + player.height > canvas.height) player.y = canvas.height - player.height;

    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy *= -1;
    }

    if (ball.x - ball.radius < player.x + player.width && ball.y > player.y && ball.y < player.y + player.height) {
        ball.dx *= -1;
    }

    if (ball.x + ball.radius > ai.x && ball.y > ai.y && ball.y < ai.y + ai.height) {
        ball.dx *= -1;
    }

    ai.y += ai.dy;

    if (ai.y < 0 || ai.y + ai.height > canvas.height) {
        ai.dy *= -1;
    }

    if (ball.x > canvas.width / 2) {
        if (ball.y < ai.y + ai.height / 2) {
            ai.dy = -2;
        } else {
            ai.dy = 2;
        }
    }

    clearCanvas();
    drawRect(player.x, player.y, player.width, player.height, 'white');
    drawRect(ai.x, ai.y, ai.width, ai.height, 'white');
    drawCircle(ball.x, ball.y, ball.radius, 'white');

    requestAnimationFrame(update);
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = 4 * (Math.random() > 0.5 ? 1 : -1);
    ball.dy = 4 * (Math.random() > 0.5 ? 1 : -1);
}

function displayGameOverMessage() {
    const message = playerScore >= 5 ? 'Player Wins!' : 'AI Wins!';
    const gameOverMessage = document.getElementById('gameOverMessage');
    gameOverMessage.textContent = message;
    gameOverMessage.style.display = 'block';
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
        player.dy = -5;
    } else if (e.key === 'ArrowDown') {
        player.dy = 5;
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        player.dy = 0;
    }
});

document.getElementById('startButton').addEventListener('click', () => {
    if (!isGameRunning) {
        isGameRunning = true;
        update();
    }
});
