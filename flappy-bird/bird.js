class FlappyBird {
  constructor() {
    this.x = 150;
    this.y = 200;
    this.velocityY = 0; // how fast it moves up or down
    this.width = 20;
    this.height = 20;
    this.weight = 1; // force pulling down the bird
  }

  update() {
    let curve = Math.sin(angle) * 20;
    if (this.y > canvas.height - (this.height * 3) + curve) {
      this.y = canvas.height - (this.height * 3) + curve;       
      this.velocityY = 0;
    } else {
      this.velocityY += this.weight;
      this.velocityY *= 0.8;
      this.y += this.velocityY;
    }

    if (this.y < 0 + this.height) {
      this.y = 0 + this.height
      this.velocityY = 0;
    }

    if (spacePressed && this.y > (this.height * 3)) {
      this.flapWings();
    }
  }

  draw() {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  flapWings() {
    this.velocityY -= 2; // this will push bird up
  }
}

const bird = new FlappyBird();