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
function createEnemy() {

    const lane = Math.floor(Math.random() * 3);

    enemies.push({
        x: canvas.width / 2 - ROAD_WIDTH / 2 + lane * LANE_WIDTH + 20,
        y: -120,
        width: 50,
        height: 90
    });

}

setInterval(() => {

    if(gameRunning){
        createEnemy();
    }

},1200);

function drawEnemies(){

    ctx.fillStyle="#0095ff";

    enemies.forEach(enemy=>{

        ctx.fillRect(
            enemy.x,
            enemy.y,
            enemy.width,
            enemy.height
        );

    });

}

function updateEnemies(){

    for(let i=enemies.length-1;i>=0;i--){

        enemies[i].y+=speed;

        if(enemies[i].y>canvas.height){

            enemies.splice(i,1);

            score+=10;

        }

    }

}

function updatePlayer(){

    const left=canvas.width/2-ROAD_WIDTH/2;
    const right=canvas.width/2+ROAD_WIDTH/2-player.width;

    if(keys["ArrowLeft"] && player.x>left){
        player.x-=player.speed;
    }

    if(keys["ArrowRight"] && player.x<right){
        player.x+=player.speed;
    }

}
function checkCollision(){

    for(let enemy of enemies){

        if(
            player.x < enemy.x + enemy.width &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height &&
            player.y + player.height > enemy.y
        ){

            gameRunning = false;

            alert("💥 GAME OVER\n\nScore : " + score);

            location.reload();

        }

    }

}

function gameLoop(){

    if(!gameRunning) return;

    ctx.clearRect(0,0,canvas.width,canvas.height);

    drawRoad();

    updatePlayer();

    updateEnemies();

    drawEnemies();

    drawPlayer();

    checkCollision();

    document.getElementById("score").innerText = score;

    requestAnimationFrame(gameLoop);

}

window.addEventListener("resize",()=>{

    canvas.width = window.innerWidth;

    canvas.height = window.innerHeight;

    player.y = canvas.height - 130;

});
