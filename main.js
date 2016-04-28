// Game variables
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const RENDERER = Phaser.AUTO;
const HTML_ELEMENT = 'game';


var game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, RENDERER, HTML_ELEMENT, null);

game.state.add('Ameblob.MainMenu', Ameblob.MainMenu);
game.state.add('Ameblob.Game', Ameblob.Game);

game.state.start('Ameblob.MainMenu');