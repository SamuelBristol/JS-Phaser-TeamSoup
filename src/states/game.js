Ameblob.Game = function(game) {
  
  this.gameManager = new GameManager(game);
  
};

Ameblob.Game.prototype = {

  create: function() {
    // Setup the GameManager
    this.gameManager.init();
  },

  update: function() {

    this.gameManager.update();

  }
};