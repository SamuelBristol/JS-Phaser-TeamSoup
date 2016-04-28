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
  
}

function update() {

  

}
