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
    var titleText = "SETTINGS"
    var soundText = "SOUND";
    var clickON = "ON";
    var clickOff = "OFF";
    var sprite = game.add.sprite(0, 0);
    
    // initialize style
    var style = { font: "bold 72px Arial", fill: "#2f0", boundsAlignH: "center", boundsAlignV: "middle" };
    
    // adds title text to screen
    title = game.add.text(0, -200, titleText, style);
    
    // re-assign style with smaller font
    style = { font: "bold 38px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
    
    sound = game.add.text(0, 0, soundText, style);
    
    // re-assign style with smaller font
    style = { font: "26px Arial", fill: "#fff", wordWrap: true, wordWrapWidth: sprite.width, boundsAlignH: "center", boundsAlignV: "middle" };
    
    on = game.add.text(0, 0, clickON, style);
    off = game.add.text(0, 0, clickOff, style);
    
    // Setting text bounds
    title.setTextBounds(0, 0, GAME_WIDTH, GAME_HEIGHT);
    sound.setTextBounds(0, -100, GAME_WIDTH, GAME_HEIGHT);
    on.setTextBounds(-50, -50, GAME_WIDTH, GAME_HEIGHT);
    off.setTextBounds(50, -50, GAME_WIDTH, GAME_HEIGHT);
    
    
    // default sound setting
    on.fill = "green";
    on.fontWeight = 900;
    // TODO: add sound
    
    // toggle sound on
    on.inputEnabled = true;
    on.events.onInputUp.add(function () {
        
        on.fill = "green";
        on.fontWeight = 900;
        
        off.fill = "white";
        off.fontWeight = 100;
        
        // TODO: turn sound on
        
    })
    
    // toggle sound off
    off.inputEnabled = true;
    off.events.onInputUp.add(function () {
        
        on.fill = "white";
        on.fontWeight = 100;
        
        off.fill = "red";
        off.fontWeight = 900;
        
        // TODO: turn sound off
        
    })
  
}

function update() {

  

}

