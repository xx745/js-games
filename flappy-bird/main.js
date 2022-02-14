const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

canvas.width = 600;
canvas.height = 400;

let spacePressed = false; // key press flag
let angle = 0;
let hue = 0; // HUE color for particles
let frame = 0; // frame count
let score = 0;
let gameSpeed = 2;

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleObstacles();
  bird.update();
  bird.draw();

  ctx.font = "25px Arial";
  ctx.fillStyle = 'blue';
  ctx.fillText(`Score: ${score}`, 480, 30);

  handleParticles();
  if (handleCollisions()) {
    return;
  };
  
  requestAnimationFrame(animate);

  angle += 0.12;
  hue++;
  frame++;
}

animate();

window.addEventListener('keydown', e => {
  if (e.code === 'Space') {
    spacePressed = true
  }
})

window.addEventListener('keyup', e => {
  if (e.code === 'Space') {
    spacePressed = false
  }
})

const bang = new Image();
bang.src = 'bang.png';

function handleCollisions() {
  for (let i = 0; i < obstaclesArray.length; i++) {
    if (bird.x < obstaclesArray[i].x + obstaclesArray[i].width &&
      bird.x + bird.width > obstaclesArray[i].x &&
      ((bird.y < 0 + obstaclesArray[i].top && bird.y + bird.height > 0) ||
      (bird.y > canvas.height - obstaclesArray[i].bottom &&
        bird.y + bird.height < canvas.height))) {
          ctx.drawImage(bang, bird.x, bird.y, 50, 50);
          ctx.font = "25px Arial";
          ctx.fillStyle = 'black';
          ctx.fillText(`Game Over, your score is: ${score}`, 160, canvas.height / 2 - 10);

          return true;
        }
  }
}
