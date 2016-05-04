// Game variables
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const RENDERER = Phaser.AUTO;
const HTML_ELEMENT = 'game';

var game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, RENDERER, HTML_ELEMENT, null);

game.state.add('Ameblob.MainMenu', Ameblob.MainMenu);
game.state.add('Ameblob.Game', Ameblob.Game);
game.state.add('Ameblob.Controls', Ameblob.Controls);
game.state.add('Ameblob.Credits', Ameblob.Credits);
game.state.add('Ameblob.End', Ameblob.End);
game.state.add('Ameblob.Settings', Ameblob.Settings);

game.state.start('Ameblob.MainMenu');
