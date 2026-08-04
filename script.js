const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const roadWidth = 320;
const laneWidth = roadWidth / 3;

let score = 0;
let gameRunning = false;

const player = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 140,
    width: 50,
    height: 90,
    speed: 8
};

let keys = {};

document.addEventListener("keydown", e => {
    keys[e.key] = true;
});

document.addEventListener("keyup", e => {
    keys[e.key] = false;
});

document.getElementById("startBtn").onclick = function () {
    document.getElementById("menu").style.display = "none";
    gameRunning = true;
    animate();
};

function drawRoad() {
    const left = canvas.width / 2 - roadWidth / 2;

    ctx.fillStyle = "#444";
    ctx.fillRect(left, 0, roadWidth, canvas.height);

    ctx.strokeStyle = "white";
    ctx.lineWidth = 5;

    for (let i = 0; i < canvas.height; i += 40) {
        ctx.beginPath();
        ctx.moveTo(left + laneWidth, i);
        ctx.lineTo(left + laneWidth, i + 20);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(left + laneWidth * 2, i);
        ctx.lineTo(left + laneWidth * 2, i + 20);
        ctx.stroke();
    }
}

function drawCar() {
    ctx.fillStyle = "red";
    ctx.fillRect(player.x, player.y, player.width, player.height);

    ctx.fillStyle = "black";
    ctx.fillRect(player.x + 8, player.y + 10, 12, 20);
    ctx.fillRect(player.x + 30, player.y + 10, 12, 20);
}

function update() {

    const leftLimit = canvas.width / 2 - roadWidth / 2;
    const rightLimit = canvas.width / 2 + roadWidth / 2 - player.width;

    if (keys["ArrowLeft"] && player.x > leftLimit)
        player.x -= player.speed;

    if (keys["ArrowRight"] && player.x < rightLimit)
        player.x += player.speed;

    score++;

    document.getElementById("score").innerText = score;
}

function animate() {

    if (!gameRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawRoad();

    update();

    drawCar();

    requestAnimationFrame(animate);
}

window.onresize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};
