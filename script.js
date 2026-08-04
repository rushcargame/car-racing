const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ROAD_WIDTH = 320;
const LANE_WIDTH = ROAD_WIDTH / 3;

let score = 0;
let speed = 6;
let gameRunning = false;
let roadOffset = 0;

const player = {
    width: 50,
    height: 90,
    x: canvas.width / 2 - 25,
    y: canvas.height - 130,
    speed: 8
};

const keys = {};
const enemies = [];

document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

document.getElementById("startBtn").addEventListener("click", () => {
    document.getElementById("menu").style.display = "none";
    gameRunning = true;
    gameLoop();
});

function drawRoad() {
    const left = canvas.width / 2 - ROAD_WIDTH / 2;

    ctx.fillStyle = "#444";
    ctx.fillRect(left, 0, ROAD_WIDTH, canvas.height);

    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 4;

    roadOffset += speed;
    if (roadOffset >= 40) roadOffset = 0;

    for (let y = -40; y < canvas.height + 40; y += 40) {

        ctx.beginPath();
        ctx.moveTo(left + LANE_WIDTH, y + roadOffset);
        ctx.lineTo(left + LANE_WIDTH, y + 20 + roadOffset);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(left + LANE_WIDTH * 2, y + roadOffset);
        ctx.lineTo(left + LANE_WIDTH * 2, y + 20 + roadOffset);
        ctx.stroke();
    }
}

function drawPlayer() {
    ctx.fillStyle = "#ff2d2d";
    ctx.fillRect(player.x, player.y, player.width, player.height);

    ctx.fillStyle = "#111";
    ctx.fillRect(player.x + 8, player.y + 8, 12, 18);
    ctx.fillRect(player.x + 30, player.y + 8, 12, 18);
}
