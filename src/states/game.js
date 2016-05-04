Ameblob.Game = function(game) {

  this.gameManager = new GameManager(game);

};

Ameblob.Game.prototype = {
  preload: function() {
    game.load.image('blob', 'assets/resource/Amoeba.png');
    game.load.image('virus', 'assets/resource/Virus.png');
    game.load.image('enemy', 'assets/resource/Enemy.png');

    game.load.spritesheet('amoeba_idle', 'assets/animations/Amoeba_Idle.png', 16, 16, 3);
    game.load.spritesheet('enemy_idle', 'assets/animations/Enemy_Idle.png', 16, 16, 3);
  },

  create: function() {
    // Setup the GameManager
    this.gameManager.init();
  },

  update: function() {

    this.gameManager.update();

  }
};
