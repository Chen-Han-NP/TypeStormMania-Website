class LeaderBoard extends Phaser.Scene {
    constructor() {
        super({key:"LeaderBoard"});
    }

    create(){
        this.text = this.add.text(0,0,"Leaderboard ", {font: "50px Impact"});


        
    }

    
}
