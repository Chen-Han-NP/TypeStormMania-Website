class LeaderBoard extends Phaser.Scene {
    constructor() {
        super({key:"LeaderBoard"});
    }

    preload(){
        this.load.image('background', '/assets/DarkSpace.jpg');
    }

    create(){
        var graphics;
        let bg = this.add.image(375,540, "background"); //375, 540 is center of game
        bg.displayWidth = game.config.width * 1;
        bg.scaleY = bg.scaleX;

        if (leaderboardData != null){
            this.header = this.add.text(250,100,"Leaderboard ", {font: "50px Impact"});

            graphics = this.add.graphics();

            graphics.fillStyle(0x7B7B7B, 1);

            //  32px radius on the corners
            graphics.fillRoundedRect(600, 25, 130, 30, 12);

            this.backButton = this.add.text(600, 25, ' << Go back ', {font:"30px Staatliches", fill: 'white'});
            this.backButton.setInteractive();
            this.backButton.setX(game.config.width - this.backButton.width - 25); //Make sure that its alw center
            this.backButton.on('pointerdown', () => { this.scene.start("MainMenu") });
            
            this.statsHeader = this.add.text(100, 200,"RANK", {font: "32px Dosis"});
            this.statsHeader = this.add.text(220, 200,"NAME", {font: "32px Dosis"});
            this.statsHeader = this.add.text(430, 200,"SCORE", {font: "32px Dosis"});
            this.statsHeader = this.add.text(550, 200,"DATE", {font: "32px Dosis"});
     
            var scoreList = [];
            for (var i = 0; i < leaderboardData.length; i++){
                scoreList.push(leaderboardData[i].score);
            }

            scoreList.sort(function(a, b){return a-b}).reverse();
            //arranged properly

            var arrangedData = [];

            for (var e = 0; e < scoreList.length; e++){
                for (var f = 0; f < leaderboardData.length; f++){

                    if(scoreList[e] == leaderboardData[f].score){
                        arrangedData.push(leaderboardData[f]);
                        break;
                    }
                }
            }

            //arrangedData is sorted leaderboard data dictionary

            for (var i = 0; i < arrangedData.length; i++){
                this.stats = this.add.text(100,240 + i * 30,`${i+1}`, {font: "26px Palatino"});
                this.stats = this.add.text(220,240 + i * 30,`${arrangedData[i].name}`, {font: "26px Palatino"});
                this.stats = this.add.text(430,240 + i * 30,`${arrangedData[i].score}`, {font: "26px Palatino"});
                this.stats = this.add.text(550,240 + i * 30,`${arrangedData[i].dateOfScore.substring(0, 10)}`, {font: "26px Palatino"});
                if (i >9){
                    break;
                }
            }
            
        };
    }
    

    

    update(){
        if(leaderboardData == null){
            this.notReady = this.add.text(80,700,"Data not loaded, please stand by", { fontSize: 30, fill: 'white'})
            this.header = this.add.text(250,100,"Leaderboard ", {font: "50px Impact"});
            this.scene.restart();
        }
    }

    
}