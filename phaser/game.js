
var config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: "thegame",
        width: 750,
        height: 1080
    },
    autoRound: false,
    physics: {
        default: 'arcade',
        arcade: {fps: 60}
    },
    dom: {
        createContainer: true
    },
    scene: [MainMenu, TypeGame, PauseScreen, UploadScoreScreen, LeaderBoard]
    
};

var game = new Phaser.Game(config);
var gameOptions = {
    textGravity: 100,
    localStorageName: 'bestScore'
}

