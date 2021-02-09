class LeaderBoard extends Phaser.Scene {
    constructor() {
        super({key:"LeaderBoard"});
    }

    create(){
        
        console.log(leaderboardData);
        if(leaderboardData == null){
            this.notReady = this.add.text(120,500,"Data not loaded, please try again", { fontSize: 20, fill: 'white'})
            this.header = this.add.text(0,0,"Leaderboard ", {font: "50px Impact"});

            this.backButton = this.add.text(600, 25, 'Go back', { fontSize: 30, fill: 'white', backgroundColor:"green" });
            this.backButton.setInteractive();
            this.backButton.setX(game.config.width - this.backButton.width - 25); //Make sure that its alw center
            this.backButton.on('pointerdown', () => { this.scene.start("MainMenu") });
        }

        if (leaderboardData != null){
            this.header = this.add.text(0,0,"Leaderboard ", {font: "50px Impact"});

            this.backButton = this.add.text(600, 25, 'Go back', { fontSize: 30, fill: 'white', backgroundColor:"green" });
            this.backButton.setInteractive();
            this.backButton.setX(game.config.width - this.backButton.width - 25); //Make sure that its alw center
            this.backButton.on('pointerdown', () => { this.scene.start("MainMenu") });
            
            this.statsHeader = this.add.text(100, 200,"RANK", {font: "32px Palatino"});
            this.statsHeader = this.add.text(220, 200,"NAME", {font: "32px Palatino"});
            this.statsHeader = this.add.text(450, 200,"SCORE", {font: "32px Palatino"});
            this.statsHeader = this.add.text(570, 200,"DATE", {font: "32px Palatino"});
            
            //TO BE CHANGED
            var scoreList = [];
            for (var i = 0; i < leaderboardData.length; i++){
                scoreList.push(leaderboardData[i].score);
            }
            scoreList.sort();
            console.log(scoreList);
            leaderboardData.sort();
            for (var i = 0; i < leaderboardData.length; i++){
                this.stats = this.add.text(220,230 + i * 26,`${leaderboardData[i].name}`, {font: "26px Calibri"});
                this.stats = this.add.text(450,230 + i * 26,`${leaderboardData[i].score}`, {font: "26px Calibri"});
                this.stats = this.add.text(570,230 + i * 26,`${leaderboardData[i].dateOfScore}`, {font: "18px Calibri"});
            }
            
        };
        
    }
    

    

    update(){
        
    }

    
}