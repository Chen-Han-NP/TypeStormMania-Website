class LeaderBoard extends Phaser.Scene {
    constructor() {
        super({key:"LeaderBoard"});
    }

    preload(){
        this.load.image('background', '/assets/5518.jpg');
        this.load.image('reload', '/assets/reload-icon-16894.png');

    }

    create(){
        var graphics;
        let bg = this.add.image(375,540, "background"); //375, 540 is center of game
        bg.displayWidth = game.config.width * 1.44;
        bg.scaleY = bg.scaleX;

        if (leaderboardData != null){

            this.header = this.add.text(250,100,"Leaderboard ", {font: "50px Impact"});

            graphics = this.add.graphics();

            graphics.fillStyle(0x7B7B7B, 1);

            //  12px radius on the corners
            graphics.fillRoundedRect(600, 25, 130, 30, 12);


            this.backButton = this.add.text(600, 25, ' << Go back ',{font: "30px Staatliches", fill: 'white'});
            this.backButton.setInteractive();
            this.backButton.setX(game.config.width - this.backButton.width - 25); //Make sure that its alw center
            this.backButton.on('pointerdown', () => { this.scene.start("MainMenu") });
            
            this.backButton.on('pointerover', () => {
                this.backButton.setColor('#DE9C2B');
            })
    
            this.backButton.on('pointerout', () => { 
                this.backButton.setColor('white');
            })


            let rdImg = this.add.image(50, 50, 'reload');
            rdImg.scale = 0.15;
            this.reloadButton = rdImg;
            this.reloadButton.setInteractive();
            this.reloadButton.on('pointerdown', () => {
                getData();
                this.scene.restart();
                setTimeout(() => {
                    console.log(leaderboardData);
                }, 1000);
            })

            this.statsHeader = this.add.text(100, 200,"RANK", {font: "32px Dosis"});
            this.statsHeader = this.add.text(220, 200,"NAME", {font: "32px Dosis"});
            this.statsHeader = this.add.text(430, 200,"SCORE", {font: "32px Dosis"});
            this.statsHeader = this.add.text(550, 200,"DATE", {font: "32px Dosis"});


            // a.dateOfScore < b.dateOfScore checks for which date earlier
            leaderboardData.sort((a, b) => (a.score > b.score) ? 1 : (a.score == b.score) ? ((a.dateOfScore < b.dateOfScore) ? 1 : -1) : -1 ).reverse();
            
            
            for (var i = 0; i < leaderboardData.length; i++){
                if (i < 15){
                    this.stats = this.add.text(100,240 + i * 30,`${i+1}`, {font: "26px Staatliches"});
                    this.stats = this.add.text(220,240 + i * 30,`${leaderboardData[i].name}`, {font: "26px Staatliches"});
                    this.stats = this.add.text(430,240 + i * 30,`${leaderboardData[i].score}`, {font: "26px Staatliches"});
                    this.stats = this.add.text(550,240 + i * 30,`${leaderboardData[i].dateOfScore.substring(0, 10)}`, {font: "26px Staatliches"});
                }
            }
        };
    }
    

    

    update(){
        if(leaderboardData == null){
            this.notReady = this.add.text(200,300,"Data not loaded, please stand by.", {font: "30px Dosis", fill: 'white'})
            this.header = this.add.text(250,100,"Leaderboard ", {font: "50px Impact"});
    
            // this.add.sprite(400, 300, 'loading1').play('load');
        }

            this.scene.restart();
    }
}