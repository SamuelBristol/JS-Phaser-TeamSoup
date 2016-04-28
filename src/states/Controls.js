Ameblob.Controls = function() {};

Ameblob.Controls.prototype = {
  create: function() {
    var titleText = "Controls"
    var upControlText = "UP ARROW: Moves up.";
    var downControlText = "DOWN ARROW: Moves down.";
    var leftControlText = "LEFT ARROW: Moves left.";
    var rightControlText = "RIGHT ARROW: Moves right.";
    var zKeyControlText = "Z KEY: Special ability.";
    
    var style = { font: "bold 72px Arial", fill: "#2f0", boundsAlignH: "center", boundsAlignV: "middle" };
    
    title = game.add.text(0, -200, titleText, style);
    
    style = { font: "bold 38px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
    
    upArrow = game.add.text(0, 0, upControlText, style);
    downArrow = game.add.text(0, 0, downControlText, style);
    leftArrow = game.add.text(0, 0, leftControlText, style);
    rightArrow = game.add.text(0, 0, rightControlText, style);
    zKey = game.add.text(0, 0, zKeyControlText, style);
    
    title.setTextBounds(0, 0, GAME_WIDTH, GAME_HEIGHT);
    upArrow.setTextBounds(0, -100, GAME_WIDTH, GAME_HEIGHT);
    downArrow.setTextBounds(0, -50, GAME_WIDTH, GAME_HEIGHT);
    leftArrow.setTextBounds(0, 0, GAME_WIDTH, GAME_HEIGHT);
    rightArrow.setTextBounds(0, 50, GAME_WIDTH, GAME_HEIGHT);
    zKey.setTextBounds(0, 100, GAME_WIDTH, GAME_HEIGHT);
  }
};