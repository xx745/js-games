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
  handleParticles();
  
  requestAnimationFrame(animate);

  angle += 0.12;
  hue++;
  frame++;
}

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

animate();