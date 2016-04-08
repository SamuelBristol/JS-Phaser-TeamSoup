// Enemy class, Extends entity
function Enemy (scale) {
  // Call parent constructor
  Entity.call(this, 'blob', 1, 'assets/resource/Blob.png', scale);

  // Extra virus members
  this.isAlive = true;
  this.speed = 100;
  this.autoMoveTimer = Math.floor(Math.random() * (60 - 0 + 1)) + 0; // random portion of 1 second
  // Sprite members
  this.alpha = 0.8;
  this.tint = 0x00AAAA;
}

Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function () {

  if (this.autoMoveTimer % 60 == 0) {
    this.autoMoveTimer = 0;

    // move in a random direction
    var random = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
      switch (random) {
        case 1:
          this.sprite.body.moveUp(this.speed);
          break;
        case 2:
          this.sprite.body.moveLeft(this.speed);
          break;
        case 3:
          this.sprite.body.moveRight(this.speed);
          break;
        case 4:
          this.sprite.body.moveDown(this.speed);
          break;
        default:
          // should never be hit
      }

    }
    this.autoMoveTimer++;
};

Enemy.prototype.kill = function () {
  this.isAlive = false;
  this.sprite.exists = false;
};
