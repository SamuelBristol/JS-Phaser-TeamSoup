// Player class, Extends Entity
function Player (health, keyboard) {
  // Call parent constructor
  Entity.call(this, 'amoeba', health, 'assets/resource/Amoeba.png', 1);

  // Extension from Entity are player controls
  this.keyboard = keyboard;

  // Extra player members
  this.speed = 500;
  this.damping = 0.999;
  this.fixedRotation = true;

  this.maxViruses = 2;
  this.viruses = new Array();
}

Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;

// Update() function to be called from game.update()
// This pattern is similar to Unity, where your Entity has an update function
// that is called every frame to handle that script's behavior
Player.prototype.update = function () {
  // Player behavior to be executed every frame
  // Call from update() in game
  this.doMovement();
  this.doAbilities();
  this.doViruses();

};

Player.prototype.doAbilities = function () {
  // calls doSpecial() on specialKey down event
  this.keyboard.specialKey.onDown.add(this.doSpecial, this);
};

Player.prototype.doSpecial = function () {
  if (this.viruses.length < this.maxViruses) {
    var virus = gameManager.spawnVirus();
    this.viruses.push(virus);
  }
};

Player.prototype.doViruses = function () {
  if (this.viruses.length > 0) {
    // Update the viruses
    for (var i = 0; i < this.viruses.length; i++) {
      this.viruses[i].update();

      // remove any dead viruses
      if (!this.viruses[i].isAlive) {
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
