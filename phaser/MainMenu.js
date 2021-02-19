

class MainMenu extends Phaser.Scene {
    constructor() {
        super({key:"MainMenu"});
    }

    preload(){
        this.load.image('mainMenuBg', '/assets/25328.jpg')
        this.load.image("bugImg", "/assets/green_little_bug.png");
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: "/phaser/rexuiplugin.min.js",
            sceneKey: 'rexUI'
        });
        
    }

    create(){
        let mainBg = this.add.image(375, 540, "mainMenuBg");
        mainBg.scale = 0.19;

        this.text = this.add.text(200,200,"TypeStorm Mania ", {font: "50px Impact"});
        this.bug = this.add.image(375, 410, "bugImg");
        this.bug.scale = 0.65
        
        let selectL = this.add.text(250, 600, '>>', {font:"30px Dosis", fill: 'lightblue' });
        let selectR = this.add.text(470, 600, '<<', {font:"30px Dosis", fill: 'lightblue' });
        selectL.alpha = 0;
        selectR.alpha = 0;

        const startButton = this.add.text(400, 600, 'Start Game', {font:"30px Dosis", fill: 'white' });
        startButton.setInteractive();
        startButton.setX(game.config.width / 2 - startButton.width / 2); //Make sure that its alw center
        startButton.on('pointerdown', () => { this.scene.start("TypeGame") });
        startButton.on('pointerover', () => { 
            selectL.alpha = 1;
            selectR.alpha = 1;
            startButton.setColor('aquamarine');
        })
        startButton.on('pointerout', () => { 
            selectL.alpha = 0;
            selectR.alpha = 0;
            startButton.setColor('white');
        })


        let selectL2 = this.add.text(250, 700, '>>', {font:"30px Dosis", fill: 'lightblue' });
        let selectR2 = this.add.text(470, 700, '<<', {font:"30px Dosis", fill: 'lightblue' });
        selectL2.alpha = 0;
        selectR2.alpha = 0;
        const leaderBoardButton = this.add.text(400, 700, 'LeaderBoard', {font:"30px Dosis", fill: 'white' });
        leaderBoardButton.setInteractive();
        leaderBoardButton.setX(game.config.width / 2 - leaderBoardButton.width / 2);
        leaderBoardButton.on('pointerdown', () => { this.scene.start("LeaderBoard") });
        leaderBoardButton.on('pointerover', () => { 
            selectL2.alpha = 1;
            selectR2.alpha = 1;
            leaderBoardButton.setColor('aquamarine');
        })
        leaderBoardButton.on('pointerout', () => { 
            selectL2.alpha = 0;
            selectR2.alpha = 0;
            leaderBoardButton.setColor('white');
        })
 
    }


    update(delta){

     }

}