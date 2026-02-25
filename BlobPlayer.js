class BlobPlayer {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.r = 26;
    this.vx = 0;
    this.vy = 0;

    this.accel = 0.55;
    this.maxRun = 4.0;

    this.gravity = 0.65;
    this.jumpV = -11.0;

    this.frictionAir = 0.995;
    this.frictionGround = 0.88;

    this.onGround = false;
  }

  spawnFromLevel(level) {
    this.x = level.start.x;
    this.y = level.start.y;
    this.r = level.start.r;

    this.vx = 0;
    this.vy = 0;
    this.onGround = false;

    this.gravity = level.gravity;
    this.jumpV = level.jumpV;
  }

  tryJump() {
    if (this.onGround) {
      this.vy = this.jumpV;
      this.onGround = false;
    }
  }

  update(level) {
    let move = 0;
    if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) move -= 1;
    if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) move += 1;

    this.vx += this.accel * move;
    this.vx *= this.onGround ? this.frictionGround : this.frictionAir;
    this.vx = constrain(this.vx, -this.maxRun, this.maxRun);

    this.vy += this.gravity;

    let box = {
      x: this.x - this.r,
      y: this.y - this.r,
      w: this.r * 2,
      h: this.r * 2,
    };

    // move X
    box.x += this.vx;
    for (const s of level.platforms) {
      if (BlobPlayer.overlap(box, s)) {
        if (this.vx > 0) box.x = s.x - box.w;
        else if (this.vx < 0) box.x = s.x + s.w;
        this.vx = 0;
      }
    }

    // move Y
    box.y += this.vy;
    this.onGround = false;
    for (const s of level.platforms) {
      if (BlobPlayer.overlap(box, s)) {
        if (this.vy > 0) {
          box.y = s.y - box.h;
          this.vy = 0;
          this.onGround = true;
        } else if (this.vy < 0) {
          box.y = s.y + s.h;
          this.vy = 0;
        }
      }
    }

    this.x = box.x + box.w / 2;
    this.y = box.y + box.h / 2;

    this.x = constrain(this.x, this.r, level.w - this.r);
  }

  draw() {
    // face
    fill("#FFFF00");
    stroke(0);
    strokeWeight(2);
    ellipse(this.x, this.y, this.r * 2, this.r * 2);

    // eyes
    fill(0);
    noStroke();
    let eyeOffsetX = this.r * 0.4;
    let eyeOffsetY = -this.r * 0.2;
    let eyeSize = this.r * 0.2;
    ellipse(this.x - eyeOffsetX, this.y + eyeOffsetY, eyeSize, eyeSize);
    ellipse(this.x + eyeOffsetX, this.y + eyeOffsetY, eyeSize, eyeSize);

    // smile
    noFill();
    stroke(0);
    strokeWeight(2);
    let smileRadius = this.r * 0.6;
    arc(this.x, this.y + this.r * 0.1, smileRadius, smileRadius, 0, PI);
  }

  static overlap(a, b) {
    return (
      a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y
    );
  }
}
