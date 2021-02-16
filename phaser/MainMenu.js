

class MainMenu extends Phaser.Scene {
    constructor() {
        super({key:"MainMenu"});
    }

    preload(){
        this.load.image("bug", "/assets/bug.jpg");
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: "/phaser/rexuiplugin.min.js",
            sceneKey: 'rexUI'
        });
    }

    create(){
        this.text = this.add.text(200,200,"TypeStorm Mania ", {font: "50px Impact"});
        this.bug = this.add.image(380, 400, "bug");
        const startButton = this.add.text(400, 600, 'Start Game', {font:"30px Dosis", fill: 'white' });
        startButton.setInteractive();
        startButton.setX(game.config.width / 2 - startButton.width / 2); //Make sure that its alw center


        
        startButton.on('pointerdown', () => { this.scene.start("TypeGame") });

        const leaderBoardButton = this.add.text(400, 700, 'LeaderBoard', {font:"30px Dosis", fill: 'white' });
        leaderBoardButton.setInteractive();
        leaderBoardButton.setX(game.config.width / 2 - leaderBoardButton.width / 2);

        leaderBoardButton.on('pointerdown', () => { this.scene.start("LeaderBoard") });   
 
    }


    update(delta){

     }

}