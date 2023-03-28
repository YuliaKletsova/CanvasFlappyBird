const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

var bird = new Image();
bird.src = 'static/flappy_bird_bird.png';
var bg = new Image();
bg.src = 'static/flappy_bird_bg.png';
var pipeTop = new Image();
pipeTop.src = 'static/flappy_bird_pipeTop.png';
var pipeBottom = new Image();
pipeBottom.src = 'static/flappy_bird_pipeBottom.png';
var footer = new Image();
footer.src = 'static/flappy_bird_footer.png';
// - - - - - - - - - - - - - - - - - 
var x = 10;
var y = (canvas.height - footer.height) / 2;
var score = 0;
var g = 0.5;
var pipeSpeed = 1;
var verticalGap = 90, horizontalGap = 100;
var animationFrameCounter;

const ORIENTATION = {
    top: 'top',
    bottom: 'bottom',
    both: 'both',
}

function goUp() {
    y -=20;
}

var pipes = [{
    orientation: ORIENTATION.both,
    x: canvas.width,
    y: 0
}];

function drawPipes() {
    for(let pipe of pipes) {
        ctx.drawImage(pipeTop, pipe.x, pipe.y);
        ctx.drawImage(pipeBottom, pipe.x, pipe.y + pipeTop.height + verticalGap);

        pipe.x -= pipeSpeed;

        if (pipe.x < horizontalGap + 1 && pipe.x > horizontalGap - 1) {
            pipes.push({
                x : canvas.width,
                y : Math.floor(Math.random() * pipeTop.height) - pipeTop.height
            });
        }

    }
}

function drawGame() {
    ctx.drawImage(bg, 0, 0);
    // switch(score) {
    //     case score > 5:
    //         pipeSpeed = 2;
    //         break;
    //     case score > 10:
    //         pipeSpeed = 5;
    //         break;
    //     default:
    //         pipeSpeed = 1;
    //         break;
    // }

    drawPipes();

    ctx.drawImage(bird, x, y);
    ctx.drawImage(footer, 0, canvas.height - footer.height);

    ctx.fillStyle = "#000";
    ctx.font = "24px Verdana";
    ctx.fillText("Счет: " + score, 10, canvas.height - 20);

    if (y <= 0 || y >= canvas.height - footer.height - bird.height - g) {
        cancelAnimationFrame(animationFrameCounter);
        return;
    } else {
        y += g;
    }

    animationFrameCounter = requestAnimationFrame(drawGame);
}

document.addEventListener('keydown', goUp);

drawGame();