const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let gameRunning = false;
let score = 0;
let roadOffset = 0;
let speed = 6;

const ROAD_WIDTH = 320;
const LANE_WIDTH = ROAD_WIDTH / 3;

const player = {
    width: 50,
    height: 90,
    x: canvas.width / 2 - 25,
    y: canvas.height - 130,
    speed: 8,
    color: "#ff2d2d"
};

const keys = {};

document.addEventListener("keydown",(e)=>{
    keys[e.key]=true;
});

document.addEventListener("keyup",(e)=>{
    keys[e.key]=false;
});

const startBtn=document.getElementById("startBtn");

startBtn.onclick=()=>{
    document.getElementById("menu").style.display="none";
    gameRunning=true;
    requestAnimationFrame(gameLoop);
};
function drawRoad(){

    const left = canvas.width/2-ROAD_WIDTH/2;

    ctx.fillStyle="#3d3d3d";
    ctx.fillRect(left,0,ROAD_WIDTH,canvas.height);

    ctx.strokeStyle="white";
    ctx.lineWidth=4;

    roadOffset+=speed;

    if(roadOffset>=40){
        roadOffset=0;
    }

    for(let y=-40;y<canvas.height+40;y+=40){

        ctx.beginPath();
        ctx.moveTo(left+LANE_WIDTH,y+roadOffset);
        ctx.lineTo(left+LANE_WIDTH,y+20+roadOffset);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(left+LANE_WIDTH*2,y+roadOffset);
        ctx.lineTo(left+LANE_WIDTH*2,y+20+roadOffset);
        ctx.stroke();
    }
}
function drawPlayer(){

    ctx.fillStyle=player.color;

    ctx.fillRect(
        player.x,
        player.y,
        player.width,
        player.height
    );

    ctx.fillStyle="black";

    ctx.fillRect(player.x+6,player.y+8,12,18);
    ctx.fillRect(player.x+32,player.y+8,12,18);
}
const enemies = [];

function createEnemy() {

    const lane = Math.floor(Math.random() * 3);

    enemies.push({

        x: canvas.width / 2 - ROAD_WIDTH / 2 + lane * LANE_WIDTH + 20,

        y: -120,

        width: 50,

        height: 90,

        color: "blue"

    });

}

setInterval(() => {

    if (gameRunning) {

        createEnemy();

    }

}, 1200);

function drawEnemies() {

    enemies.forEach(enemy => {

        enemy.y += speed;

        ctx.fillStyle = enemy.color;

        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);

    });

}
function updatePlayer(){

    const leftLimit = canvas.width/2-ROAD_WIDTH/2;
    const rightLimit = canvas.width/2+ROAD_WIDTH/2-player.width;

    if(keys["ArrowLeft"] && player.x>leftLimit){
        player.x-=player.speed;
    }

    if(keys["ArrowRight"] && player.x<rightLimit){
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

            gameRunning=false;

            alert("💥 Game Over!\n\nScore : "+score);

            location.reload();

        }

    }

}

function updateEnemies(){

    enemies.forEach(enemy=>{

        enemy.y+=speed;

    });

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

    score++;

    document.getElementById("score").innerText=score;

    requestAnimationFrame(gameLoop);

}
