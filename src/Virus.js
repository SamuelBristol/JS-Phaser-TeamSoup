// Virus class, Extends entity
function Virus () {
  // Call parent constructor
  Entity.call(this, 'virus', 1, 'assets/resource/Blob.png', 0.5);

  // Extra virus members
  this.maxDurationInFrames = 300; // 5 seconds
  this.framesActive = 0;

  // Sprite members
  this.alpha = 0.5;
  this.tint = 0x9D7445;
}

Virus.prototype = Object.create(Entity.prototype);
Virus.prototype.constructor = Virus;

Virus.prototype.update = function () {
  this.framesActive++;

  var maxDurationExceeded = this.framesActive > this.maxDurationInFrames;
  if (maxDurationExceeded || !this.isAlive()) {
    this.kill();
  }
};
