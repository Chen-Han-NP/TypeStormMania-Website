

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
        const startButton = this.add.text(400, 600, 'Start Game', { fill: '#0f0' });
        startButton.setInteractive();
    
        startButton.on('pointerdown', () => { this.scene.start("TypeGame") });

        const leaderBoardButton = this.add.text(400, 650, 'LeaderBoard', { fill: '#0f0' });
        leaderBoardButton.setInteractive();
    
        leaderBoardButton.on('pointerdown', () => { this.scene.start("LeaderBoard") });   
 
    }


    update(delta){

     }

}