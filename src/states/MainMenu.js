var Ameblob = {};

Ameblob.MainMenu = function(game) {};

Ameblob.MainMenu.prototype = {
  preload: function() {
    game.load.image('blob', '../assets/resource/Blob.png');
    game.load.image('virus', '../assets/resource/Blob.png');
    game.load.image('enemy', '../assets/resource/Blob.png');
  },
  
  create: function() {
   // Add text here pick positions to add it to
    var titleText = "AMOEBLOB"
    var playText = "PLAY";
    var settingsText = "SETTINGS";
    var controlsText = "CONTROLS";
    var creditsText = "CREDITS";
    
    // initialize style
    var style = { font: "bold 72px Arial", fill: "#2f0", boundsAlignH: "center", boundsAlignV: "middle" };
    
    // adds title text to screen
    title = game.add.text(0, -200, titleText, style);
    
    // re-assign style with smaller font
    style = { font: "bold 38px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
    
    play = game.add.text(0, 0, playText, style);
    settings = game.add.text(0, 0, settingsText, style);
    controls = game.add.text(0, 0, controlsText, style);
    credits = game.add.text(0, 0, creditsText, style);
    
    // Setting text bounds
    title.setTextBounds(0, 0, GAME_WIDTH, GAME_HEIGHT);
    play.setTextBounds(0, -100, GAME_WIDTH, GAME_HEIGHT);
    settings.setTextBounds(0, -50, GAME_WIDTH, GAME_HEIGHT);
    controls.setTextBounds(0, 0, GAME_WIDTH, GAME_HEIGHT);
    credits.setTextBounds(0, 50, GAME_WIDTH, GAME_HEIGHT);
  },
  
  start: function() {
    this.state.start('Ameblob.Game');
  }
};

