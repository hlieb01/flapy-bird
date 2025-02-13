var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");
var menu = document.getElementById("menushka");
var dictuffity = "easy"




var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();
var sky = new Image()
var ispaused = false;
var audiopass = true
var speed = 1


bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";
sky.src = "img/sky.png"

// Звуковые файлы
var fly = new Audio();
var score_audio = new Audio();

fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";

var gap = 90;


// При нажатии на какую-либо кнопку
document.addEventListener("keydown", moveUp);

function moveUp(event) {
    console.log(event)
    if (event.keyCode == 27) {
        // пауза
        ispaused = !ispaused
        menu.style.display = ispaused ? 'block' : 'none'
        // menu.style.display= if (ispaused) { 'block' } else {'nono'}
    } else {
        // прыджок

        yPos -= 25;
        if (audiopass == true) {
            fly.play();
        }

    }
}

function changedictuffity(newDictuffity) {
    dictuffity = newDictuffity

    if (dictuffity == "easy") {
        speed = 1
    } else if (dictuffity == "mendium") {

        speed = 2.3
    } else if (dictuffity == "hard") {

        speed = 4.5
    } else if (dictuffity == "extreme") {

        speed = 15
    } else if (dictuffity == "prime") {

        speed = 38
    }
}
// Создание блоков
var pipe = [];
pipe[0] = {
    x: 200,
    y: 0
}

var score = 0;
// Позиция птички
var xPos = 10;
var yPos = 150;
var grav = 1.5;

function draw() {
    ctx.drawImage(bg, 0, 0);
    ctx.drawImage(bg, 287, 0);
    ctx.drawImage(bg, 287 * 2, 0);
    ctx.drawImage(bg, 287 * 3, 0);
    ctx.drawImage(bg, 287 * 4, 0);
    ctx.drawImage(bg, 287 * 5, 0);
    ctx.drawImage(bg, 287 * 6, 0);


    for (var i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

        if (!ispaused)
            pipe[i].x = pipe[i].x - speed;

        if (pipe[i].x <= 125 && pipe[i].x >= 120) {
            pipe.push({
                x: 1000,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }

        // Отслеживание прикосновений
        if (xPos + bird.width >= pipe[i].x
            && xPos <= pipe[i].x + pipeUp.width
            && (yPos <= pipe[i].y + pipeUp.height
                || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height) {
            location.reload(); // Перезагрузsка страницы
        }

        if (pipe[i].x <= 125 && pipe[i].x >= 125 ) {
            score++;
            if (audiopass == true) {
                score_audio.play();
            }

        }
    }



    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(fg, 287, cvs.height - fg.height);
    ctx.drawImage(fg, 287 * 2, cvs.height - fg.height);
    ctx.drawImage(fg, 287 * 3, cvs.height - fg.height);
    ctx.drawImage(fg, 287 * 4, cvs.height - fg.height);
    ctx.drawImage(fg, 287 * 5, cvs.height - fg.height);
    ctx.drawImage(fg, 287 * 6, cvs.height - fg.height);
    ctx.drawImage(fg, 287 * 7, cvs.height - fg.height);
    ctx.drawImage(bird, xPos, yPos);

    if (!ispaused)
        yPos += grav;


    ctx.fillStyle = "#000";
    ctx.font = "24px Pacifico";
    ctx.fillText("Счет: " + score, 10, cvs.height - 20);
    ctx.fillText("сложность: " + dictuffity, 10 * 12, cvs.height - 20);

    requestAnimationFrame(draw);
}



pipeBottom.onload = draw;

function reload() {
    location.reload()
}


function audioline() {
    audiopass = !audiopass

}



