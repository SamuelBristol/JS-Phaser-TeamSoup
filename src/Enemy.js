// Enemy class, Extends entity
function Enemy (scale) {
  // Call parent constructor
  Entity.call(this, 'enemy', 1, 'assets/resource/Blob.png', scale);

  // Extra virus members
  this.speed = 100;
  this.autoMoveTimer = Math.floor(Math.random() * (60 - 0 + 1)) + 0; // random portion of 1 second
  // Sprite members
  this.alpha = 0.8;
  this.tint = 0x00AAAA;
}

Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function () {
  if (this.isAlive()) {

    this.health = this.sprite.health;

    // Check whether the number of frames required to make a move again
    // has been reached
    if (this.autoMoveTimer % 60 == 0) {
      this.autoMoveTimer = 0;

      // move in a random direction
      var randomMovementOption = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
      this.move(randomMovementOption);
    }
    // Increment the move timer
    this.autoMoveTimer++;

  } else {
    this.kill();
  }
};

Enemy.prototype.getBigger = function () {
  this.scale += 0.25;
  this.sprite.body.mass = this.scale;
  this.speed = (this.maxSpeed / this.sprite.body.mass) + this.minSpeed;
  this.sprite.scale.setTo(this.scale, this.scale);

  this.sprite.body.setRectangleFromSprite(this.sprite);
  this.sprite.body.collideWorldBounds = true;
};

Enemy.prototype.getSmaller = function () {
  this.scale -= 0.25;
  this.sprite.body.mass = this.scale;
  this.speed = (this.maxSpeed / this.sprite.body.mass) + this.minSpeed;
  this.sprite.scale.setTo(this.scale, this.scale);

  this.sprite.body.setRectangleFromSprite(this.sprite);
  this.sprite.body.collideWorldBounds = true;
};

Enemy.prototype.move = function (movementOption) {
  switch (movementOption) {
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
      break;
      // should never be hit
  }
}
