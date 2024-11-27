class Sprite {
  constructor({ position, imgSrc, scale = 1, framesMax = 1 }) {
    this.position = position;
    this.width = 50;
    this.height = 150;
    this.image = new Image();
    this.image.src = imgSrc;
    this.scale = scale;
    this.framesMax = framesMax;
    this.frameCur = 0;
    this.framesElapsed = 0;
    this.framesHold = 13;
  }

  draw() {
    c.drawImage(
      this.image,
      this.frameCur * (this.image.width / this.framesMax),
      0,
      this.image.width / this.framesMax,
      this.image.height,
      this.position.x,
      this.position.y,
      (this.image.width / this.framesMax) * this.scale,
      this.image.height * this.scale
    );
  }

  update() {
    this.draw();
    this.framesElapsed++;
    if (this.framesElapsed % this.framesHold === 0) {
      if (this.frameCur < this.framesMax - 1) {
        this.frameCur++;
      } else {
        this.frameCur = 0;
      }
    }
  }
}
class Fighter extends Sprite {
  constructor({
    position,
    velocity,
    color,
    offset,
    imgSrc,
    scale = 1,
    framesMax = 1,
  }) {
    super((position, imgSrc, scale, framesMax));

    this.velocity = velocity;
    this.width = 50;
    this.height = 150;
    this.lastKey;
    this.jumps = 2;
    this.color = color;
    this.health = 100;
    this.frameCur = 0;
    this.framesElapsed = 0;
    this.framesHold = 13;
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset: offset,
      width: 100,
      height: 50,
    };
    this.isAttacking;
  }

  draw() {
    c.fillStyle = this.color;
    c.fillRect(this.position.x, this.position.y, this.width, this.height);

    //attack box
    if (this.isAttacking) {
      c.fillStyle = "green";
      c.fillRect(
        this.attackBox.position.x,
        this.position.y,
        this.attackBox.width,
        this.attackBox.height
      );
    }
  }
  update() {
    this.draw();
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
      this.velocity.y = 0;
      this.jumps = 2;
    } else {
      this.velocity.y += gravity;
    }
  }
  attack() {
    this.isAttacking = true;
    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
  }
}
