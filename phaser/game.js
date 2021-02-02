
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
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: [ MainMenu, TypeGame, LeaderBoard ]
};

var game = new Phaser.Game(config);


