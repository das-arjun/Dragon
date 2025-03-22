// Game Setup
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

// Dragon and game variables
let dragonX = 100, dragonY = 300, dragonWidth = 50, dragonHeight = 50;
let dragonSpeed = 0;
const gravity = 0.5;
const lift = -15;

// Obstacles
let obstacles = [];
let obstacleWidth = 50;
let obstacleGap = 150;
let obstacleSpeed = 2;

// Input
let isFlying = false;

// Game Loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dragon Physics
    if (isFlying) {
        dragonSpeed = lift;
    } else {
        dragonSpeed += gravity;
    }
    dragonY += dragonSpeed;

    // Boundaries
    if (dragonY < 0) dragonY = 0;
    if (dragonY > canvas.height - dragonHeight) dragonY = canvas.height - dragonHeight;

    // Draw Dragon
    ctx.fillStyle = "green";
    ctx.fillRect(dragonX, dragonY, dragonWidth, dragonHeight);

    // Update Obstacles
    if (Math.random() < 0.02) {
        let obstacleHeight = Math.floor(Math.random() * (canvas.height - obstacleGap));
        obstacles.push({ x: canvas.width, y: obstacleHeight, width: obstacleWidth, height: canvas.height - obstacleHeight - obstacleGap });
    }

    // Move Obstacles
    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].x -= obstacleSpeed;

        // Collision Detection
        if (dragonX + dragonWidth > obstacles[i].x &&
            dragonX < obstacles[i].x + obstacles[i].width &&
            (dragonY < obstacles[i].y || dragonY + dragonHeight > obstacles[i].y + obstacles[i].height)) {
            // Game Over
            alert("Game Over!");
            resetGame();
        }

        // Remove off-screen obstacles
        if (obstacles[i].x + obstacles[i].width < 0) {
            obstacles.splice(i, 1);
            i--;
        }
    }

    // Draw Obstacles
    ctx.fillStyle = "brown";
    for (let obstacle of obstacles) {
        ctx.fillRect(obstacle.x, 0, obstacle.width, obstacle.y);
        ctx.fillRect(obstacle.x, obstacle.y + obstacleGap, obstacle.width, obstacle.height);
    }

    requestAnimationFrame(gameLoop);
}

// Event Listeners for Flying Mechanism
document.addEventListener("keydown", (event) => {
    if (event.key === " ") {
        isFlying = true;
    }
});
document.addEventListener("keyup", (event) => {
    if (event.key === " ") {
        isFlying = false;
    }
});

// Reset Game
function resetGame() {
    dragonY = canvas.height / 2;
    dragonSpeed = 0;
    obstacles = [];
    gameLoop();
}

// Start the Game Loop
gameLoop();
