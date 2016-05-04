Ameblob.Credits = function() {};

Ameblob.Credits.prototype = {
    
    create: function() {
        
        // Add text here pick positions to add it to
        var titleText = "CREDITS"
        var samText = "Samuel D. Bristol: Programmer";
        var romeoText = "Romeo Salinas Jr: Lead";
        var ericText = "Eric Mohr: Menus";
        var backText = "BACK";
        
        var style = { font: "bold 72px Arial", fill: "#2f0", boundsAlignH: "center", boundsAlignV: "middle" };
    
        title = game.add.text(0, -200, titleText, style);
    
        style = { font: "bold 38px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
    
        samLabel = game.add.text(0, 0, samText, style);
        romeoLabel = game.add.text(0, 0, romeoText, style);
        ericLabel = game.add.text(0, 0, ericText, style);
        back = game.add.text(0, 0, backText, style);
        
        title.setTextBounds(0, 0, GAME_WIDTH, GAME_HEIGHT);
        samLabel.setTextBounds(0, -100, GAME_WIDTH, GAME_HEIGHT);
        romeoLabel.setTextBounds(0, -50, GAME_WIDTH, GAME_HEIGHT);
        ericLabel.setTextBounds(0, 0, GAME_WIDTH, GAME_HEIGHT);
        
        back.setTextBounds(0, 200, GAME_WIDTH, GAME_HEIGHT);
        
        goBackHover();
    }
};
