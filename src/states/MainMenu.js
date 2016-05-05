var Ameblob = {};

Ameblob.MainMenu = function(game, musicOn) {
  this.menuMusic = null;
  this.musicOn = musicOn;
};

Ameblob.MainMenu.prototype = {
  preload: function() {
    game.load.image('logo', 'assets/resource/logo.png');

    game.load.audio('bgMusic', [
      'assets/music/150413_Weird_Electro.mp3',
      'assets/music/150413_Weird_Electro.ogg'
    ]);

    if (this.menuMusic != null) {
      this.menuMusic.stop();
    }
  },

  create: function() {
    // Start the bgMusic

    game.stage.backgroundColor = 0xAACC99;

    this.menuMusic = game.add.audio('bgMusic');
    this.menuMusic.play();

    // Add text here, pick positions to add it to.
    var titleText = "AMOEBLOB"
    var playText = "PLAY";
    var settingsText = "SETTINGS";
    var controlsText = "CONTROLS";
    var creditsText = "CREDITS";

    // initialize style
    var style = { font: "bold 72px Arial", fill: "#2f0", boundsAlignH: "center", boundsAlignV: "middle" };

    // adds title text to screen
    title = game.add.sprite(120, 0, 'logo');

    // re-assign style with smaller font
    style = { font: "bold 38px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

    play = game.add.text(0, 0, playText, style);
    //settings = game.add.text(0, 0, settingsText, style);
    controls = game.add.text(0, 0, controlsText, style);
    credits = game.add.text(0, 0, creditsText, style);

    // Setting text bounds
    play.setTextBounds(0, -100, GAME_WIDTH, GAME_HEIGHT);
    //settings.setTextBounds(0, -50, GAME_WIDTH, GAME_HEIGHT);
    controls.setTextBounds(0, 0, GAME_WIDTH, GAME_HEIGHT);
    credits.setTextBounds(0, 50, GAME_WIDTH, GAME_HEIGHT);

    // Make clickables and hover abilitiy
    play.inputEnabled = true;
    play.events.onInputUp.add(startGame);
    play.events.onInputOver.add(onOver);
    play.events.onInputOut.add(onOut);

    /*settings.inputEnabled = true;
    settings.events.onInputUp.add(startSettings);
    settings.events.onInputOver.add(onOver);
    settings.events.onInputOut.add(onOut);*/

    controls.inputEnabled = true;
    controls.events.onInputUp.add(startControls);
    controls.events.onInputOver.add(onOver);
    controls.events.onInputOut.add(onOut);

    credits.inputEnabled = true;
    credits.events.onInputUp.add(startCredits);
    credits.events.onInputOver.add(onOver);
    credits.events.onInputOut.add(onOut);

  },


};

function startGame() {
    game.state.start('Ameblob.Game');
};

function startSettings() {
    game.state.start('Ameblob.Settings');
};

function startControls() {
    game.state.start('Ameblob.Controls');
};

function startCredits() {
    game.state.start('Ameblob.Credits');
};

function goBack() {
    game.state.start("Ameblob.MainMenu");
};

function onOver(target) {
    target.fill = "red";
    target.fontSize = "45px";
};

function onOut(target) {
    target.fill = "white";
    target.fontSize = "38px";
};

function goBackHover() {
    back.inputEnabled = true;
    back.events.onInputUp.add(goBack);
    back.events.onInputOver.add(onOver);
    back.events.onInputOut.add(onOut);
};
