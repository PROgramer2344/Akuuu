const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20; // ukuran kotak
let snake = [];
snake[] = { x: 9 * box, y: 10 * box };

let food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box
};

let score = ;
let d;

document.addEventListener("keydown", direction);

function direction(event) {
    if(event.keyCode === 37 && d !== "RIGHT") {
        d = "LEFT";
    } else if(event.keyCode === 38 && d !== "DOWN") {
        d = "UP";
    } else if(event.keyCode === 39 && d !== "LEFT") {
        d = "RIGHT";
    } else if(event.keyCode === 40 && d !== "UP") {
        d = "DOWN";
    }
}

function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(, , 400, 400);

    // Ular
    for(let i = ; i < snake.length; i++) {
        ctx.fillStyle = (i === ) ? "lime" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        
        ctx.strokeStyle = "black";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    // Makanan
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    // Posisi kepala
    let snakeX = snake[].x;
    let snakeY = snake[].y;

    if(d === "LEFT") snakeX -= box;
    if(d === "UP") snakeY -= box;
    if(d === "RIGHT") snakeX += box;
    if(d === "DOWN") snakeY += box;

    // Jika makan makanan
    if(snakeX === food.x && snakeY === food.y) {
        score++;
        document.getElementById("score").innerText = score;
        food = {
            x: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 20) * box
        };
    } else {
        snake.pop(); // hapus ekor
    }

    // Tambahkan kepala baru
    let newHead = { x: snakeX, y: snakeY };

    // Game Over kondisi
    if(snakeX <  || snakeX >= 400 || snakeY <  || snakeY >= 400 || collision(newHead, snake)) {
        clearInterval(game);
        alert("Game Over! Skor akhir: " + score);
    }

    snake.unshift(newHead);
}

function collision(head, array) {
    for(let i = ; i < array.length; i++) {
        if(head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}

let game = setInterval(draw, 100);