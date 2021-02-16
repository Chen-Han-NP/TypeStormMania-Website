class LeaderBoard extends Phaser.Scene {
    constructor() {
        super({key:"LeaderBoard"});
    }

    preload(){
        this.load.image('background', '/assets/DarkSpace.jpg');
        this.load.path = 'assets/loadingAnimation-png/';
        this.load.image('loading1', 'frame_00_delay-0.03s.png');
        this.load.image('loading2', 'frame_01_delay-0.03s.png');
        this.load.image('loading3', 'frame_02_delay-0.03s.png');
        this.load.image('loading4', 'frame_03_delay-0.03s.png');
        this.load.image('loading5', 'frame_04_delay-0.03s.png');
        this.load.image('loading6', 'frame_05_delay-0.03s.png');
        this.load.image('loading7', 'frame_06_delay-0.03s.png');
        this.load.image('loading8', 'frame_07_delay-0.03s.png');
        this.load.image('loading9', 'frame_08_delay-0.03s.png');
        this.load.image('loading10', 'frame_09_delay-0.03s.png');
        this.load.image('loading11', 'frame_10_delay-0.03s.png');
        this.load.image('loading12', 'frame_11_delay-0.03s.png');
        this.load.image('loading13', 'frame_12_delay-0.03s.png');
        this.load.image('loading14', 'frame_13_delay-0.03s.png');
        this.load.image('loading15', 'frame_14_delay-0.03s.png');
        this.load.image('loading16', 'frame_15_delay-0.03s.png');
        this.load.image('loading17', 'frame_16_delay-0.03s.png');
        this.load.image('loading18', 'frame_17_delay-0.03s.png');
        this.load.image('loading19', 'frame_18_delay-0.03s.png');
        this.load.image('loading20', 'frame_19_delay-0.03s.png');
        this.load.image('loading21', 'frame_20_delay-0.03s.png');
        this.load.image('loading22', 'frame_21_delay-0.03s.png');
        this.load.image('loading23', 'frame_22_delay-0.03s.png');
        this.load.image('loading24', 'frame_23_delay-0.03s.png');
        this.load.image('loading25', 'frame_24_delay-0.03s.png');
        this.load.image('loading26', 'frame_25_delay-0.03s.png');
        this.load.image('loading27', 'frame_26_delay-0.03s.png');
        this.load.image('loading28', 'frame_27_delay-0.03s.png');
        this.load.image('loading29', 'frame_28_delay-0.03s.png');
        this.load.image('loading30', 'frame_29_delay-0.03s.png');
    }

    create(){
        var graphics;
        let bg = this.add.image(375,540, "background"); //375, 540 is center of game
        bg.displayWidth = game.config.width * 1;
        bg.scaleY = bg.scaleX;
        // CURRENTLY NOT WORKING
        // this.anims.create({
        //     key: 'load',
        //     frames: [
        //         { key: 'loading1' },
        //         { key: 'loading2' },
        //         { key: 'loading3' },
        //         { key: 'loading4' },
        //         { key: 'loading5' },
        //         { key: 'loading6' },
        //         { key: 'loading7' },
        //         { key: 'loading8' },
        //         { key: 'loading9' },
        //         { key: 'loading10' },
        //         { key: 'loading11' },
        //         { key: 'loading12' },
        //         { key: 'loading13' },
        //         { key: 'loading14' },
        //         { key: 'loading15' },
        //         { key: 'loading16' },
        //         { key: 'loading17' },
        //         { key: 'loading18' },
        //         { key: 'loading19' },
        //         { key: 'loading20' },
        //         { key: 'loading21' },
        //         { key: 'loading22' },
        //         { key: 'loading23' },
        //         { key: 'loading24' },
        //         { key: 'loading25' },
        //         { key: 'loading26' },
        //         { key: 'loading27' },
        //         { key: 'loading28' },
        //         { key: 'loading29' },
        //         { key: 'loading30' }

        //     ],
        //     frameRate: 800,
        //     repeat: -1
        // });
        // this.add.sprite(400, 300, 'loading1').play('load');

        if (leaderboardData != null){
            this.header = this.add.text(250,100,"Leaderboard ", {font: "50px Impact"});

            graphics = this.add.graphics();

            graphics.fillStyle(0x7B7B7B, 1);

            //  32px radius on the corners
            graphics.fillRoundedRect(600, 25, 130, 30, 12);

            this.backButton = this.add.text(600, 25, ' << Go back ', {font:"30px Staatliches"});
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
                this.stats = this.add.text(100,240 + i * 30,`${i+1}`, {font: "26px Staatliches"});
                this.stats = this.add.text(220,240 + i * 30,`${arrangedData[i].name}`, {font: "26px Staatliches"});
                this.stats = this.add.text(430,240 + i * 30,`${arrangedData[i].score}`, {font: "26px Staatliches"});
                this.stats = this.add.text(550,240 + i * 30,`${arrangedData[i].dateOfScore.substring(0, 10)}`, {font: "26px Staatliches"});
                if (i >9){
                    break;
                }
            }
            
        };
    }
    

    

    update(){
        if(leaderboardData == null){
            this.notReady = this.add.text(200,700,"Data not loaded, please stand by.", {font: "30px Dosis", fill: 'white'})
            this.header = this.add.text(250,100,"Leaderboard ", {font: "50px Impact"});
    
            // this.add.sprite(400, 300, 'loading1').play('load');
        }

            this.scene.restart();
    }
}