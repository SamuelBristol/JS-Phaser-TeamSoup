var GameManager = function(game) {
  this.game = game;

  this.keyboard = {};

  this.player = null;
  this.enemies = null;
  this.viruses = null;

  this.playerCollisionGroup = {};
  this.virusCollisionGroup = {};
  this.enemyCollisionGroup = {};
};

GameManager.prototype.init = function () {
  this._setupWorldPhysics();

  this.keyboard = this.game.input.keyboard.createCursorKeys();
  this.keyboard.specialKey = this.game.input.keyboard.addKey(Phaser.KeyCode.Z);
  this.keyboard.specialKey.onDown.add(this.spawnVirus, this);

  // Set up collisionGroups
  this.playerCollisionGroup = this.game.physics.p2.createCollisionGroup();
  this.virusCollisionGroup = this.game.physics.p2.createCollisionGroup();
  this.enemyCollisionGroup = this.game.physics.p2.createCollisionGroup();

  this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'amoeba_idle');
  this.player.smoothed = false;
  this.player.health = 5;
  this.player.maxHealth = 20;
  this.player.scale.setTo(this.player.health, this.player.health);
  this.game.physics.p2.enable(this.player);
  this.player.body.setRectangleFromSprite();
  this.player.body.setCollisionGroup(this.playerCollisionGroup);
  this.player.body.collides(this.virusCollisionGroup);
  this.player.body.collides(this.enemyCollisionGroup, this.playerCollidesWithEnemy, this);

  // Set up player animations
  this.player.animations.add('amoeba_idle');
  this.player.animations.play('amoeba_idle', 6, true);

  this.enemies = this.game.add.group();

  // Spawn enemies
  for(var i = 0; i < 10; i++) {
    var enemy = this.game.add.sprite(this.game.world.randomX, this.game.world.randomY, 'enemy_idle');
    enemy.health = this.game.rnd.integerInRange(1, 4);
    enemy.maxHealth = enemy.health + 3;

    enemy.smoothed = false;
    enemy.scale.setTo(enemy.health);
    this.game.physics.p2.enable(enemy);

    enemy.body.setRectangleFromSprite();
    enemy.body.setCollisionGroup(this.enemyCollisionGroup);
    enemy.body.collides([this.playerCollisionGroup, this.virusCollisionGroup]);
    enemy.body.collides(this.enemyCollisionGroup, this.enemyCollidesWithEnemy, this);

    // Set up enemy animations
    enemy.animations.add('enemy_idle');
    enemy.animations.play('enemy_idle', 6, true);

    this.enemies.add(enemy);
  }

  this.viruses = this.game.add.group();

  this.game.physics.p2.updateBoundsCollisionGroup();
};

GameManager.prototype.resizePlayer = function (sprite) {
  sprite.scale.setTo(sprite.health, sprite.health);
  sprite.body.setRectangleFromSprite();
  sprite.body.setCollisionGroup(this.playerCollisionGroup);
  sprite.body.collides(this.virusCollisionGroup);
  sprite.body.collides(this.enemyCollisionGroup, this.playerCollidesWithEnemy, this);
};

GameManager.prototype.resizeEnemy = function (sprite) {
  sprite.scale.setTo(sprite.health, sprite.health);
  sprite.body.setRectangleFromSprite();
  sprite.body.setCollisionGroup(this.enemyCollisionGroup);
  sprite.body.collides([this.playerCollisionGroup, this.virusCollisionGroup]);
  sprite.body.collides(this.enemyCollisionGroup, this.enemyCollidesWithEnemy, this);
};

GameManager.prototype.playerCollidesWithEnemy = function (player, enemy) {
  var playerScale = player.sprite.scale.x;
  var enemyScale = enemy.sprite.scale.x;

  if (playerScale > enemyScale) {
    enemy.sprite.damage(1);
    player.sprite.heal(1);
    this.resizeEnemy(enemy.sprite);
    this.resizePlayer(player.sprite);
  } else if (playerScale < enemyScale) {
    player.sprite.damage(1);
    enemy.sprite.heal(1);
    this.resizePlayer(player.sprite);
    this.resizeEnemy(enemy.sprite);
  } else {
    // do nothing, bounce
  }
};

GameManager.prototype.enemyCollidesWithEnemy = function (enemy, other) {
  var enemyScale = enemy.sprite.scale.x;
  var otherScale = other.sprite.scale.x;

  if (enemyScale > otherScale) {
    other.sprite.damage(1);
    enemy.sprite.heal(1);
    this.resizeEnemy(other.sprite);
    this.resizeEnemy(enemy.sprite);
  } else if (enemyScale < otherScale) {
    enemy.sprite.damage(1);
    other.sprite.heal(1);
    this.resizeEnemy(enemy.sprite);
    this.resizeEnemy(other.sprite);
  } else {
    // do nothing, bounce
  }
};

GameManager.prototype.virusCollidesWithEnemy = function (virus, enemy) {

  var tweenScale = this.game.add.tween(virus.sprite.scale);
  tweenScale.to({x: 5, y: 5}, 250, null, true);
  tweenScale.onComplete.add(function(){
    this.sprite.kill();
  }, virus);

  enemy.sprite.damage(1);
  this.resizeEnemy(enemy.sprite);

};

GameManager.prototype.getClosestEnemy = function () {
  var closestEnemy = null;

  var shortestDistance = Number.MAX_VALUE;

  this.enemies.forEachAlive(function(enemy, player){
    var distanceToPlayer = Phaser.Math.distance(
      player.body.x, player.body.y,
      enemy.body.x, enemy.body.y
    );

    if (distanceToPlayer < shortestDistance) {
      shortestDistance = distanceToPlayer;
      closestEnemy = enemy;
    }
  }, this, this.player);

  return closestEnemy;
};

GameManager.prototype.spawnVirus = function () {
  var x = this.player.x;
  var y = this.player.y;

  var virus = this.game.add.sprite(x, y, 'virus');
  this.game.physics.p2.enable(virus);

  virus.body.setCollisionGroup(this.virusCollisionGroup);
  virus.body.collides([this.virusCollisionGroup]);
  virus.body.collides(this.enemyCollisionGroup, this.virusCollidesWithEnemy, this);

  virus.lifespan = 2000;
  virus.body.mass = 0.001;

  this.viruses.add(virus);
};

GameManager.prototype.update = function () {
  if (this.keyboard.left.isDown) { this.player.body.moveLeft(300); }
  if (this.keyboard.right.isDown) { this.player.body.moveRight(300); }
  if (this.keyboard.up.isDown) { this.player.body.moveUp(300); }
  if (this.keyboard.down.isDown) { this.player.body.moveDown(300); }

  this.enemies.forEachAlive(function(enemy, player, speed){
    // Move enemies in the direction of the player
    var angleToPlayer = Math.atan2(player.y - enemy.y, player.x - enemy.x);
    enemy.body.rotation = angleToPlayer + game.math.degToRad(90);
    enemy.body.force.x = Math.cos(angleToPlayer) * speed;
    enemy.body.force.y = Math.sin(angleToPlayer) * speed;
  }, this, this.player, 30);

  this.viruses.forEachAlive(function(virus, speed){
    var target = this.getClosestEnemy();
    if (target != null && target.alive) {
      var angleToTarget = Math.atan2(target.body.y - virus.body.y, target.body.x - virus.body.x);
      virus.body.force.x = Math.cos(angleToTarget) * speed;
      virus.body.force.y = Math.sin(angleToTarget) * speed;
    } else {
      virus.body.force.x = this.game.rnd.integerInRange(-10, 10);
      virus.body.force.y = this.game.rnd.integerInRange(-10, 10);
    }
  }, this, 1);

};

GameManager.prototype._setupWorldPhysics = function () {
  //	Enable p2 physics
  this.game.physics.startSystem(Phaser.Physics.P2JS);
  this.game.physics.p2.defaultRestitution = 0.9;
  //  No collision callbacks without this methods
  this.game.physics.p2.setImpactEvents(true);
};
