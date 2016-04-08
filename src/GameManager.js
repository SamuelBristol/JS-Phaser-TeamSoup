var GameManager = function(game) {
  this.game = game;

  this.player = null;
  this.enemies = new Array();

  this.collisionGroups = {};
};

GameManager.prototype.init = function () {
  this._setupWorldPhysics();

  // Set up collisionGroups
  this.collisionGroups["player"] = this.game.physics.p2.createCollisionGroup();
  this.collisionGroups["virus"] = this.game.physics.p2.createCollisionGroup();
  this.collisionGroups["enemy"] = this.game.physics.p2.createCollisionGroup();

  this.spawnPlayer();

  // Spawn enemies
  for(var i = 0; i < 10; i++) {
    var randomScale = Math.random() * (2 - 0.25 + 1) + 0.25;
    var enemy = this.spawnEnemy(randomScale);
    this.enemies.push(enemy);
  }
  //
};

GameManager.prototype.update = function () {
  // Update all objects this GameManager controls
  this.player.update();
  for(var i = 0; i < this.enemies.length; i++) {
    this.enemies[i].update();
  }
};

// Private functions
GameManager.prototype.spawnPlayer = function () {
  var playerHealth = 2;
  var keyboard = game.input.keyboard.createCursorKeys();
  keyboard.specialKey = game.input.keyboard.addKey(Phaser.KeyCode.Z);
  this.player = new Player(playerHealth, keyboard);
  this._addPhysicsObject(this.player, 50, 50);
  this.player.sprite.body.damping = this.player.damping;
  this.player.sprite.body.fixedRotation = this.player.fixedRotation;

  // Set collision groups
  this.player.sprite.body.setCollisionGroup(this.collisionGroups["player"]);
  this.player.sprite.body.collides([
    this.collisionGroups["virus"],
    this.collisionGroups["enemy"]
  ], console.log('player collided'), this);
  this.player.sprite.body.collideWorldBounds = true;
  this.game.physics.p2.updateBoundsCollisionGroup();

};

GameManager.prototype.spawnVirus = function (x, y) {

  var virus = new Virus();
  this._addPhysicsObject(virus, x, y);
  virus.sprite.tint = virus.tint;
  virus.sprite.alpha = virus.alpha;

  // Set collision groups
  virus.sprite.body.setCollisionGroup(this.collisionGroups["virus"]);
  virus.sprite.body.collides([
    this.collisionGroups["player"],
    this.collisionGroups["enemy"],
    this.collisionGroups["virus"]
  ], console.log('virus collided'), this);
  virus.sprite.body.collideWorldBounds = true;
  this.game.physics.p2.updateBoundsCollisionGroup();

  return virus;
};

GameManager.prototype.spawnEnemy = function (scale) {
  var x = Math.floor(Math.random() * (GAME_WIDTH - 0 + 1)) + 0;
  var y = Math.floor(Math.random() * (GAME_HEIGHT - 0 + 1)) + 0;

  var enemy = new Enemy(scale);
  this._addPhysicsObject(enemy, x, y);
  enemy.sprite.tint = enemy.tint;
  enemy.sprite.alpha = enemy.alpha;

  // Set collision groups
  enemy.sprite.body.setCollisionGroup(this.collisionGroups["enemy"]);
  enemy.sprite.body.collides([
    this.collisionGroups["player"],
    this.collisionGroups["virus"],
    this.collisionGroups["enemy"]
  ], console.log('enemy collided'), this);
  enemy.sprite.body.collideWorldBounds = true;
  this.game.physics.p2.updateBoundsCollisionGroup();

  return enemy;
};

GameManager.prototype._addPhysicsObject = function(entity, x, y) {
  entity.sprite = game.add.sprite(x, y, entity.name);
  entity.sprite.scale.setTo(entity.scale, entity.scale);
  this._enablePhysics(entity);
};

GameManager.prototype._enablePhysics = function(entity) {
  // Enable p2 phsyics on the entity's sprite
  game.physics.p2.enable(entity.sprite);
};

GameManager.prototype._setupWorldPhysics = function () {
  //	Enable p2 physics
  this.game.physics.startSystem(Phaser.Physics.P2JS);
  this.game.physics.p2.defaultRestitution = 0.9;
};
