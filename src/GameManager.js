var GameManager = function(game, difficulty) {
  this.game = game;

  this.player = null;
  this.enemies = new Array();
};

GameManager.prototype.init = function () {
  this._setupWorldPhysics();
  this._addPlayer();
  this._addPhysicsObject(this.player, 50, 50);
  this.player.sprite.body.damping = this.player.damping;
  this.player.sprite.body.fixedRotation = this.player.fixedRotation;
};

GameManager.prototype.update = function () {
  // Update all objects this GameManager controls
  this.player.update();
};

// Private functions
GameManager.prototype._addPlayer = function () {
  var playerHealth = 2;
  var keyboard = game.input.keyboard.createCursorKeys();
  keyboard.specialKey = game.input.keyboard.addKey(Phaser.KeyCode.Z);
  this.player = new Player(playerHealth, keyboard);
};

GameManager.prototype.spawnVirus = function () {
  var x = this.player.sprite.position.x;
  var y = this.player.sprite.position.y;
  var scale = 0.5;

  var virus = new Virus();
  this._addPhysicsObject(virus, x, y - 50);
  virus.sprite.scale.setTo(scale, scale);
  virus.sprite.tint = virus.tint;
  virus.sprite.alpha = virus.alpha;

  return virus;
};

GameManager.prototype._addPhysicsObject = function(entity, x, y) {
  entity.sprite = game.add.sprite(x, y, entity.name);
  this._enablePhysics(entity);
};

GameManager.prototype._enablePhysics = function(entity) {
  // Enable p2 phsyics on the entity's sprite
  game.physics.p2.enable(entity.sprite);
};

GameManager.prototype._setupWorldPhysics = function () {
  //	Enable p2 physics
  this.game.physics.startSystem(Phaser.Physics.P2JS);
  this.game.physics.p2.defaultRestitution = 0.5;
};
