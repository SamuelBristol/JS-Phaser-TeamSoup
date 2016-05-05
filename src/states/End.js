Ameblob.End = function(game, world, cache, endState) {};

Ameblob.End.prototype = {
  init: function(endState) {
    this.endState = endState
  },
  
  create: function() {
    var replayText = "Replay";
    var mainMenuText = "Main Menu";
    var titleText = 'Title';
    
    switch(this.endState) {
      case 1:
        titleText = "You Win!"
        style = { font: "bold 72px Arial", fill: "#2f0", boundsAlignH: "center", boundsAlignV: "middle" };
        break;
      case 2:
        titleText = "Game Over"
        style = { font: "bold 72px Arial", fill: "#f00", boundsAlignH: "center", boundsAlignV: "middle" };
        break;
      case 3:
        titleText = "Times Up"
        style = { font: "bold 72px Arial", fill: "#f00", boundsAlignH: "center", boundsAlignV: "middle" };
      default:
        break;
    };

    title = game.add.text(0, -200, titleText, style);

    style = { font: "bold 38px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

    replayLabel = game.add.text(0, 0, replayText, style);
    mainMenuLabel = game.add.text(0, 0, mainMenuText, style);

    title.setTextBounds(0, 0, GAME_WIDTH, GAME_HEIGHT);
    replayLabel.setTextBounds(0, -100, GAME_WIDTH, GAME_HEIGHT);
    mainMenuLabel.setTextBounds(0, -50, GAME_WIDTH, GAME_HEIGHT);

    replayLabel.inputEnabled = true;
    replayLabel.events.onInputUp.add(startGame);
    replayLabel.events.onInputOver.add(onOver);
    replayLabel.events.onInputOut.add(onOut); 

    mainMenuLabel.inputEnabled = true;
    mainMenuLabel.events.onInputUp.add(goBack);
    mainMenuLabel.events.onInputOver.add(onOver);
    mainMenuLabel.events.onInputOut.add(onOut); 
  }
};