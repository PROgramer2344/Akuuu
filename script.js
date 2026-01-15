const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
let snake = [];
snake[] = { x: 9 * box, y: 10 * box };

let food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box
};

let score = ;
let d;

// --- DETEKSI SWIPE UNTUK HP ---
let touchStartX = ;
let touchStartY = ;
let touchEndX = ;
let touchEndY = ;

canvas.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[].screenX;
    touchStartY = e.changedTouches[].screenY;
});

canvas.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[].screenX;
    touchEndY = e.changedTouches[].screenY;
    handleSwipe();
});

function handleSwipe() {
    let deltaX = touchEndX - touchStartX;
    let deltaY = touchEndY - touchStartY;

    if(Math.abs(deltaX) > Math.abs(deltaY)) {
        // Geser horizontal
        if(deltaX >  && d !== "LEFT") {
            d = "RIGHT";
        } else if(deltaX <  && d !== "RIGHT") {
            d = "LEFT";
        }
    } else {
        // Geser vertikal
        if(deltaY >  && d !== "UP") {
            d = "DOWN";
        } else if(deltaY <  && d !== "DOWN") {
            d = "UP";
        }
    }
}

// --- FUNGSI GAMENYA ---
function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(, , 400, 400);

    // Gambar ular
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

    // Makan
    if(snakeX === food.x && snakeY === food.y) {
        score++;
        document.getElementById("score").innerText = score;
        food = {
            x: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 20) * box
        };
    } else {
        snake.pop();
    }

    let newHead = { x: snakeX, y: snakeY };

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

let game = setInterval(draw, 150);
