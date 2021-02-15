
var config = {
    type: Phaser.AUTO,
    width: 750,
    height: 1080,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    autoRound: false,
    physics: {
        default: 'arcade',
        arcade: {fps: 30}
    },
    scene: [ MainMenu, TypeGame, LeaderBoard ]
    
};

var game = new Phaser.Game(config);
var gameOptions = {
    textGravity: 100,
    localStorageName: 'bestScore'
}

