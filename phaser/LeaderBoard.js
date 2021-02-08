class LeaderBoard extends Phaser.Scene {
    constructor() {
        super({key:"LeaderBoard"});
    }

    create(){
        this.header = this.add.text(0,0,"Leaderboard ", {font: "50px Impact"});

        this.backButton = this.add.text(600, 25, 'Go back', { fontSize: 30, fill: 'white', backgroundColor:"green" });
        this.backButton.setInteractive();
        this.backButton.setX(game.config.width - this.backButton.width - 25); //Make sure that its alw center
        this.backButton.on('pointerdown', () => { this.scene.start("MainMenu") });

        this.rank1 = this.add.text(200,200, "1. ", { fontSize: 30, fill: 'white'});
        this.rank2 = this.add.text(0,0, "2. ");
    }
    

    

    update(){
        
    }

    
}
