// Game variables
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const RENDERER = Phaser.AUTO;
const HTML_ELEMENT = 'game';

var game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, RENDERER, HTML_ELEMENT, {
    preload: preload, // the method to preload assets
    create: create,   // the method to create objects before updating
    update: update    // the method to call on every game update
  }
);

var gameManager = new GameManager(game);

function preload() {
  
};

function create() {
  // Add text here pick positions to add it to
    var titleText = "CREDITS"
    var samText = "Samuel D. Bristol: Programmer";
    var romeoText = "Romeo Salinas Jr: Lead";
    var ericText = "Eric Mohr: Menus";
    
    var style = { font: "bold 72px Arial", fill: "#2f0", boundsAlignH: "center", boundsAlignV: "middle" };
    
    title = game.add.text(0, -200, titleText, style);
    
    style = { font: "bold 38px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
    
    samLabel = game.add.text(0, 0, samText, style);
    romeoLabel = game.add.text(0, 0, romeoText, style);
    ericLabel = game.add.text(0, 0, ericText, style);
    
    title.setTextBounds(0, 0, GAME_WIDTH, GAME_HEIGHT);
    samLabel.setTextBounds(0, -100, GAME_WIDTH, GAME_HEIGHT);
    romeoLabel.setTextBounds(0, -50, GAME_WIDTH, GAME_HEIGHT);
    ericLabel.setTextBounds(0, 0, GAME_WIDTH, GAME_HEIGHT);
  
}

function update() {

  

}
