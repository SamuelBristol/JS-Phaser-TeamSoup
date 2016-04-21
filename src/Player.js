// Player class, Extends Entity
function Player (health, keyboard) {
  // Call parent constructor
  Entity.call(this, 'blob', health, 'assets/resource/Blob.png', 1.25);

  // Extension from Entity are player controls
  this.keyboard = keyboard;

  // Extra player members
  this.speed = 500;
  this.maxSpeed = 500;
  this.minSpeed = 50;
  this.damping = 0.999;
  this.fixedRotation = true;

  this.maxViruses = 8;
  this.viruses = new Array();

  //this.autoShootTimer = 10; // 1/6th seconds
}

Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;

// Update() function to be called from game.update()
// This pattern is similar to Unity, where your Entity has an update function
// that is called every frame to handle that script's behavior
Player.prototype.update = function () {
  // Player behavior to be executed every frame
  // Call from update() in game
  this.sprite.health = this.health;

  this.doMovement();
  this.doAbilities();
  this.doViruses();

};

Player.prototype.damage = function(amount) {
  this.health -= amount;
};

Player.prototype.getBigger = function () {
  this.scale += 0.25;
  this.sprite.body.mass = this.scale;
  this.speed = (this.maxSpeed / this.sprite.body.mass) + this.minSpeed;
  this.sprite.scale.setTo(this.scale, this.scale);

  this.sprite.body.setRectangleFromSprite(this.sprite);
  this.sprite.body.collideWorldBounds = true;
};

Player.prototype.getSmaller = function () {
  this.scale -= 0.25;
  this.sprite.body.mass = this.scale;
  this.speed = (this.maxSpeed / this.sprite.body.mass) + this.minSpeed;
  this.sprite.scale.setTo(this.scale, this.scale);

  this.sprite.body.setRectangleFromSprite(this.sprite);
  this.sprite.body.collideWorldBounds = true;
};

Player.prototype.doAbilities = function () {
  // calls doSpecial() on specialKey down event
  this.keyboard.specialKey.onDown.add(this.doSpecial, this);

  /* autoshoot alternative
  if (this.autoShootTimer % 10 == 0) {
    this.doSpecial();
    this.autoShootTimer = 0;
  }
  this.autoShootTimer++;
  */
};

Player.prototype.doSpecial = function () {
  if (this.viruses.length < this.maxViruses) {
    // spawn up to maxViruses
    var virusesToSpawn = this.maxViruses - this.viruses.length;
    for (var i = 0; i < virusesToSpawn; i++) {
      var x = this.sprite.position.x;
      var y = this.sprite.position.y

      var virus = gameManager.spawnVirus(x, y - 5);
      this.viruses.push(virus);
    }
  }
};

Player.prototype.doViruses = function () {
  if (this.viruses.length > 0) {
    // Update the viruses
    for (var i = 0; i < this.viruses.length; i++) {
      if (this.viruses[i].isAlive()) {
        // Update the virus if it is alive
        this.viruses[i].update();
      } else {
        // Remove from this.viruses if not alive
        this.viruses.splice(i, 1);
      }
    }
  }
};

Player.prototype.doMovement = function () {
  if (this.keyboard.left.isDown)
  {
  	this.sprite.body.moveLeft(this.speed);
  }
  if (this.keyboard.right.isDown)
  {
  	this.sprite.body.moveRight(this.speed);
  }
  if (this.keyboard.up.isDown)
  {
  	this.sprite.body.moveUp(this.speed);
  }
  if (this.keyboard.down.isDown)
  {
  	this.sprite.body.moveDown(this.speed);
  }
};
