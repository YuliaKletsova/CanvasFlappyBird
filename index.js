const canvas = document.getElementById('canvas');
const button = document.getElementById('button');
const ctx = canvas.getContext('2d');

// - - - - - - - - - - Images - - - - - - - - - - - - - - -
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
// - - - - - - - - - - - - - - - - - - - - - - - - - -
var x = 10;
var y = (canvas.height - footer.height) / 2;
var score = 0;
var g = 0.5;
var pipeSpeed = 1;
var verticalGap = 90,
  horizontalGap = 100;
var animationFrameCounter;
var abort = false;

var pipes = [
  {
    x: canvas.width,
    y: 0,
  },
];

function drawAbortScreen() {
    ctx.fillStyle = 'rgb(224,224,224,0.7)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgb(0,0,0)';
    ctx.fillText('GAMEOVER', canvas.width / 2 - 70, canvas.height / 2);
}

function drawGame() {
  ctx.drawImage(bg, 0, 0);

  for (let pipe of pipes) {
    ctx.drawImage(pipeTop, pipe.x, pipe.y);
    ctx.drawImage(pipeBottom, pipe.x, pipe.y + pipeTop.height + verticalGap);

    pipe.x -= pipeSpeed;

    if (
      (x + bird.width >= pipe.x &&
        x <= pipe.x + pipeTop.width &&
        (y <= pipe.y + pipeTop.height || y + bird.height >= pipe.y + pipeTop.height + verticalGap)) ||
      y + bird.height >= canvas.height - footer.height
    ) {
      abort = true;
    } else if (x === pipe.x + pipeTop.width + 1) {
      score++;
    }

    if (pipe.x < horizontalGap + 1 && pipe.x > horizontalGap - 1) {
      pipes.push({
        x: canvas.width,
        y: Math.floor(Math.random() * pipeTop.height) - pipeTop.height,
      });
    }
  }

  ctx.drawImage(bird, x, y);
  ctx.drawImage(footer, 0, canvas.height - footer.height);
  ctx.fillStyle = '#000';
  ctx.font = '24px Verdana';
  ctx.fillText('Счет: ' + score, 10, canvas.height - 20);

  // - - - - - - Dealing with top & bottom touches - - - - - - - - - -
  if (y <= 0 || y >= canvas.height - footer.height - bird.height - g) {
    abort = true;
  } else {
    y += g;
  }

  if (abort) {
    drawAbortScreen();
    cancelAnimationFrame(animationFrameCounter);
    return;
  }
  animationFrameCounter = requestAnimationFrame(drawGame);
}

document.addEventListener('keydown', () => {
  y -= 20;
});

document.addEventListener('touchend', () => {
  y -= 20;
});

button.addEventListener('click', () => {
    location.reload();
})

drawGame();
