var Ameblob = {};

Ameblob.MainMenu = function(game) {};

Ameblob.MainMenu.prototype = {
  preload: function() {
    game.load.image('blob', '../assets/resource/Blob.png');
    game.load.image('virus', '../assets/resource/Blob.png');
    game.load.image('enemy', '../assets/resource/Blob.png');
  },
  
  create: function() {
    game.add.text(300, 300, '- click to start -', {font: "40px Arial", fill: "#fff", align: "center"});
    console.log('mainmenu');
    game.input.onDown.add(this.start, this);
  },
  
  start: function() {
    console.log('startgame');
    this.state.start('Ameblob.Game');
  }
};

