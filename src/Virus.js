// Virus class, Extends entity
function Virus () {
  // Call parent constructor
  Entity.call(this, 'blob', 1, 'assets/resource/Blob.png', 0.5);

  // Extra virus members
  this.maxDurationInFrames = 300; // 5 seconds
  this.framesActive = 0;
  this.isAlive = true;

  // Sprite members
  this.alpha = 0.5;
  this.tint = 0xFFFF00;
}

Virus.prototype = Object.create(Entity.prototype);
Virus.prototype.constructor = Virus;

Virus.prototype.update = function () {
  this.framesActive++;

  if (this.framesActive > this.maxDurationInFrames) {
    this.kill();
  }
};

Virus.prototype.kill = function () {
  this.isAlive = false;
  this.sprite.exists = false;
};
