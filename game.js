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
  game.load.image('blob', 'assets/resource/Blob.png');
  game.load.image('virus', 'assets/resource/Blob.png');
  game.load.image('enemy', 'assets/resource/Blob.png');
};

function create() {
  // Setup the GameManager
  gameManager.init();
}

function update() {

  gameManager.update();

}
