class TypeGame extends Phaser.Scene {
    constructor() {
        super({key:"TypeGame"});
    }

    preload(){
        this.load.image('ground', '/assets/code_ground.png');
        this.load.image("ground_error", '/assets/bug_ground_2.png');
        this.load.image("sky1", "/assets/game_background_vertical.jpg");
        this.load.image("bug", "/assets/coding_bug_outline.png");
    }

    create(){
        const GWIDTH = this.scale.width;
        const GHEIGHT = this.scale.height;
        var graphics;
        var pauseGraphics;

        this.bug;

        let background = this.add.image(GWIDTH * 0.5, GHEIGHT * 0.5, "sky1");
        background.scale = 1.5;

        this.ground = this.physics.add.sprite(game.config.width/2, game.config.height - 30, 'ground');
        this.ground.setImmovable(true);
        this.ground.scale = 0.93;

        graphics = this.add.graphics();

        graphics.fillStyle(0x7B7B7B, 1);

            //  12px radius on the corners
        graphics.fillRoundedRect(589, 31, 150, 32, 12);

        this.backButton = this.add.text(588, 30, ' << GO BACK ', {font:"30px Dosis"});
        this.backButton.setInteractive();
        this.backButton.on('pointerdown', () => { 
            this.scene.start("MainMenu") 
        });

        pauseGraphics = this.add.graphics();

        pauseGraphics.fillStyle(0x7B7B7B, 1);

            //  12px radius on the corners
        pauseGraphics.fillRoundedRect(42, 33, 130, 30, 12);

        this.isPause = false;
        this.pauseButton = this.add.text(50, 32, "PAUSE  | |", {font:"30px Dosis"});
        this.pauseButton.setInteractive();
        this.pauseButton.on('pointerdown', () => {
            game.scene.pause("TypeGame");
            //game.scene.start("GameOverScreen")
            game.scene.start("PauseScreen")
            
        });

        this.gameOver = false;
        this.data = programmingData;
        

        this.textGroup = this.physics.add.group();
        this.textGroupObjects = this.textGroup.getChildren();


        this.currentTextCount = this.textGroup;

        this.maxTextCount = 8;

        


        
        this.NoOfText = 0;
        this.isGenerateBug = true;

        

        this.score = 0;
        //Get the top score stored in the local storage, if first time player, set it to 0 first.
        this.topScore = localStorage.getItem(gameOptions.localStorageName) == null ? 0 : localStorage.getItem(gameOptions.localStorageName);
        this.scoreText = this.add.text(GWIDTH / 2 - 130,    35, '', {font: "20px Arial Black", fill: 'white'});
        this.topScoreText = this.add.text(GWIDTH / 2 + 60, 35, "Best: " + this.topScore, {font: "20px Arial Black", fill: 'white'});

        this.updateScore(this.score);

        

        this.generateText = this.time.addEvent({
            delay: 1000,
            callbackScope: this,
            callback: function() {

                var languageSelected = this.data["programming"];
        
                var randomWord = languageSelected[Math.floor(Math.random() * languageSelected.length)];
                while (this.checkDuplicateWord(randomWord)){
                    randomWord = languageSelected[Math.floor(Math.random() * languageSelected.length)];
                }

                //Check whether the current total number of texts is smaller than the maxTextCount, so as to add new text inside the list
                if (this.textGroupObjects.length < this.maxTextCount){
                    if (this.NoOfText >= 30 && this.isGenerateBug){
                        if (this.generateBugChance()){

                            var randomX = this.generateRandomX();

                            //Add the bug sprite together with a newly spawned text
                            
                            this.bugText = this.add.text(30 + randomX, 50, randomWord,  {font: "20px Arial Black", fill: 'white', backgroundColor: "maroon"});
                            this.bug = this.add.sprite(30 + randomX + 25, 58, "bug");

                            //Adjust the size of the bug sprite
                            this.bug.scaleX = 0.55;
                            this.bug.scaleY = 0.30;
                            this.physics.world.enable(this.bug);
                            this.bug.body.setVelocity(0, 28);
                            this.bug.body.setBounce(1, 1);

                            //Set a data with the special bug text for later referances
                            this.bugText.setData("hasBug", true);
                            this.textGroup.add(this.bugText);

                            //Add physics to the bug text specifically to be the same as the bug sprite so that they move in the same and constant speed.
                            this.physics.world.enable(this.bugText);
                            this.bugText.body.setVelocity(0, 28);
                            this.bugText.body.setBounce(1, 1);
                            
                            //This boolean makes sure that theres only ONE bug exisiting on the screen in a time
                            this.isGenerateBug = false;

                        }
                        else{
                            this.textGroup.add(this.add.text(this.generateRandomX(), 50, randomWord,  {font: "20px Arial Black", fill: 'white', backgroundColor: "black"}));
                        }
                    }
                    else{
                        this.textGroup.add(this.add.text(this.generateRandomX(), 50, randomWord,  {font: "20px Arial Black", fill: 'white', backgroundColor: "black"}));
                    }
                    

                    //Level controller
                    if (this.NoOfText < 20){
                        this.applyVelocity(0, 35);

                    }
                    else if ((this.NoOfText >= 20) && (this.NoOfText < 60)){
                        this.applyVelocity(0, 40);
                        this.maxTextCount = 9;
                    }
                    else if ((this.NoOfText >= 60) && (this.NoOfText < 100)){
                        this.applyVelocity(0, 45);
                        this.maxTextCount = 10;
                    }
                    else if ((this.NoOfText >= 100) && (this.NoOfText < 140)){
                        this.applyVelocity(0, 50);
                        this.maxTextCount = 11;
                    }
                    else if ((this.NoOfText >= 140) && (this.NoOfText < 180)){
                        this.applyVelocity(0, 60);
                        this.maxTextCount = 13;
                    }
                    else if ((this.NoOfText >= 180) && (this.NoOfText < 220)){
                        this.applyVelocity(0, 65);
                        this.maxTextCount = 15;
                    }

                    else {
                        this.applyVelocity(0, 70);
                    }
                    
                }


            },
            loop: true
        });



        this.textPos = -1;

        this.input.keyboard.on('keydown', function (event) { 
            //Check if its first letter entered
            
            if (this.textPos == -1){
                
                for (var i = 0; i < this.textGroupObjects.length; i++){
                    
                    if (event.key == this.textGroupObjects[i].text[0]){
                        var okayToLock = true;
                        if (this.textGroupObjects[i].getData("hasBug") == true){
                            console.log("yes this color")
                            if (this.isGenerateBug == false){
                                console.log("dont lock");
                                okayToLock = false;
                            }
                        }
                        if (okayToLock){
                            var newText = this.textGroupObjects[i].text.substring(1);
                            this.textGroupObjects[i].setText(newText);
                            this.textPos = i;
                            this.textGroupObjects[i].setColor('#ebb134');
                            this.updateScore(1);
                            break;
                        }

                    }
                }
            }

            //Check if a word is locked. 
            else {
                if (event.key == this.textGroupObjects[this.textPos].text){
                    this.textGroupObjects[this.textPos].setText("");
                    this.updateScore(5);
                    this.NoOfText += 1;
                    this.textGroup.remove(this.textGroupObjects[this.textPos]);
                    this.textPos = -1;
                }

                else if (event.key == this.textGroupObjects[this.textPos].text[0]){
                    var newText = this.textGroupObjects[this.textPos].text.substring(1);
                    this.textGroupObjects[this.textPos].setText(newText);
                    this.updateScore(1);
                }
            }

            
        }, this);

        
    }

    updateScore(inc){
        this.score += inc;
        this.scoreText.text = "Score: " + this.score;
    }


    generateBugChance(){
        var value1 = Math.floor(Math.random() * 10);
        var value2 = Math.floor(Math.random() * 10);
        if (value1 == value2){
            return true;
        }
        return false;
    }


    checkDuplicateWord(word){
        for (var i = 0; i < this.textGroupObjects.length; i ++){
            if (word == this.textGroupObjects[i].text){
                return true;
            }
        }
        return false;
    }


    generateRandomX(){
        return Math.floor(Math.random() * (game.config.width - 130));
    }

    generateRandomDelay(minValue, maxValue){
        return Math.floor(Math.random() * (maxValue - minValue +1)) + minValue;
    }


    //For velocity, the bigger the x value the faster the speed travelled horizontally, and same for y.
    applyVelocity(x, y){
        for (var i = 0; i < this.textGroupObjects.length; i++){
            if (this.textGroupObjects[i].getData("hasBug") == null){
                this.physics.world.enable(this.textGroupObjects[i]);
                var randomY = Math.floor(Math.random() * 8);
                this.textGroupObjects[i].body.setVelocity(x, y - 4 + randomY);
                this.textGroupObjects[i].body.setBounce(1, 1);
            }
        }


    }


    checkGameOver(){
        for (var i = 0; i < this.textGroupObjects.length; i++){
            if (this.textGroupObjects[i].y + 20 >= this.ground.getBounds().top){
                this.ground_error = this.add.image(game.config.width/2, game.config.height - 30, 'ground_error');
                this.ground_error.scale = 0.95;
                return true;
            }
        }
        return false;
    }



    update(){
        //Check if any text has collided with the ground
        if (this.checkGameOver()){
            this.gameOver = true;
            console.log("Game Over!");
            if (this.score > this.topScore){

                localStorage.setItem(gameOptions.localStorageName, Math.max(this.score, this.topScore));
                leaderboardData.sort((a, b) => (a.score > b.score) ? 1 : (a.score == b.score) ? ((a.dateOfScore < b.dateOfScore) ? 1 : -1) : -1 ).reverse();
                //this.gameOver = false;

                if (this.score > leaderboardData[9].score){
                    game.scene.pause("TypeGame");
                    game.scene.start("UploadScoreScreen");
                }
                else{
                    game.scene.pause("TypeGame");
                    game.scene.start("GameOverScreen");
                }
            }

            else{
                game.scene.pause("TypeGame");
                game.scene.start("GameOverScreen");  
            }
             
        }

        else{
            this.gameOver = false;
            this.textGroupObjects = this.textGroup.getChildren();

            if (this.bug != null){
                if (this.bug.getBounds().top > 500){
                    for (var i = 0; i < this.textGroupObjects.length; i++){
                        if (this.textGroupObjects[i].getData("hasBug") == true){
                            this.textGroupObjects[i].setData("hasBug", false);
                        }

                    }
                    this.bug.destroy();
                    this.isGenerateBug = true;
                }
            }


            if (this.NoOfText == 200){
                this.generateText.delay = 580;
            }
            if (this.NoOfText == 400){
                this.generateText.delay = 550;
            }
            
        }


    }
}

class PauseScreen extends Phaser.Scene {
    constructor() {
        super({key:"PauseScreen"});
    }

    preload(){
        this.load.html("fontawesome", "fontawesome.html");
    }

    create(){
        const GWIDTH = this.scale.width;
        const GHEIGHT = this.scale.height;

        //Firstly, create a transparent screen
        this.veil = this.add.graphics({x: 0, y: 0});
        this.veil.fillStyle('0x000000', 0.3);
        this.veil.fillRect(0, 0, GWIDTH, GHEIGHT);


        this.restartButton = this.add.text(GWIDTH / 2 - 60, GHEIGHT / 2 + 200, "Restart", {font: "40px Dosis", fill: 'white'});
        
        //Set interative for Restart Button
        let selectL = this.add.text(250, GHEIGHT / 2 + 206, '>>', {font:"30px Dosis", fill: 'lightblue' });
        let selectR = this.add.text(470, GHEIGHT / 2 + 206, '<<', {font:"30px Dosis", fill: 'lightblue' });
        selectL.alpha = 0;
        selectR.alpha = 0;

        this.restartButton.setInteractive();
        this.restartButton.on('pointerdown', () => { 
            game.scene.stop("PauseScreen");
            game.scene.start("TypeGame");
        });

        this.restartButton.on('pointerover', () => { 
            selectL.alpha = 1;
            selectR.alpha = 1;
            selectL.setColor('orangered');
            selectR.setColor('orangered');
            this.restartButton.setColor('#FEC619');
        })

        this.restartButton.on('pointerout', () => { 
            selectL.alpha = 0;
            selectR.alpha = 0;
            this.restartButton.setColor('white');
        })

        // a DOM elements is added pretty much like a sprite
        let button = this.add.dom(game.config.width / 2, game.config.height / 2).createFromCache("fontawesome");

        // click listener
        button.addListener("click");
    
        // on click callback function
        button.on("click", function(e) {
            game.scene.resume("TypeGame");
            game.scene.stop("PauseScreen")
        })
        
        this.tweens.add({
            targets: button,
            scaleX: 0.9,
            scaleY: 0.9,
            ease: 'Power1',
            duration: 1000,
            yoyo: true,
            repeat: -1
        });
    }
}

class UploadScoreScreen extends Phaser.Scene {
    constructor() {
        super({key:"UploadScoreScreen"});
    }

    preload(){
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: "/phaser/rexuiplugin.min.js",
            sceneKey: 'rexUI'
        });
        this.load.html('nameform', 'uploadscoreform.html');
    }

    create(){
        const GWIDTH = this.scale.width;
        const GHEIGHT = this.scale.height;
        

        

        //Firstly, create a transparent screen
        this.veil = this.add.graphics({x: 0, y: 0});
        this.veil.fillStyle('0x000000', 0.5);
        this.veil.fillRect(0, 0, GWIDTH, GHEIGHT);

        var uploadingScore = localStorage.getItem(gameOptions.localStorageName);
        console.log(uploadingScore);
        this.congrat_text = this.add.text(220, 300, "NEW HIGH SCORE!!", {font: "40px Dosis", fill: 'white'} );
        this.score = this.add.text(GWIDTH / 2 - 50, 350, uploadingScore, {font: "60px Dosis", fill: "red", fontWeight: "bold"});


        this.backButton = this.add.text(500, 150, 'Go back', {font:"40px Dosis", fill: "black", backgroundColor: "white"});
        this.backButton.setInteractive();
        this.backButton.setX(game.config.width - this.backButton.width - 25); //Make sure that its alw center
        this.backButton.on('pointerdown', () => { 
            game.scene.stop("UploadScoreScreen");
            game.scene.stop("TypeGame")
            game.scene.start("MainMenu");
        });

        var element = this.add.dom(GWIDTH / 2, GHEIGHT + 100).createFromCache('nameform');

        element.setPerspective(800);
    
        element.addListener('click');
    
        element.on('click', function (event) {
    
            if (event.target.name === 'submitButton')
            {
                var inputUsername = this.getChildByName('username');
    
                //  Have they entered anything?
                if (inputUsername.value !== '')
                {
                    //  Turn off the click events
                    this.removeListener('click');
                    
                    //  Tween the login form out
                    this.scene.tweens.add({ targets: element.rotate3d, x: 1, w: 90, duration: 3000, ease: 'Power3' });
    
                    this.scene.tweens.add({ targets: element, scaleX: 2, scaleY: 2, y: 700, duration: 3000, ease: 'Power3',

                        onComplete: function ()
                        {
                            element.setVisible(false);
                            const APIKEY = "602135463f9eb665a16892a6";
                            var jsondata = {"name": inputUsername.value, "score": uploadingScore, "dateOfScore": new Date()};

                            var id;
                            var isThereName = false;
                            for (var i = 0; i < leaderboardData.length; i++){
                                if ((inputUsername.value == leaderboardData[i].name) && (uploadingScore >= leaderboardData[i].score)){
                                    id = leaderboardData[i]["_id"];
                                    isThereName = true;
                                }
                            }
                            
                            if (isThereName){
                                var settings = {
                                    "async": true,
                                    "crossDomain": true,
                                    "url": "https://typestormmania-c0cf.restdb.io/rest/leaderboard/" + id,
                                    "method": "PUT",
                                    "headers": {
                                        "content-type": "application/json",
                                        "x-apikey": APIKEY,
                                        "cache-control": "no-cache"
                                    },
                                    "processData": false,
                                    "data": JSON.stringify(jsondata)
                                    }
        
                            }
                            else{
                                var settings = {
                                    "async": true,
                                    "crossDomain": true,
                                    "url": "https://typestormmania-c0cf.restdb.io/rest/leaderboard",
                                    "method": "POST",
                                    "headers": {
                                        "content-type": "application/json",
                                        "x-apikey": APIKEY,
                                        "cache-control": "no-cache"
                                    },
                                    "processData": false,
                                    "data": JSON.stringify(jsondata)
                                    }
        
                            }
                            
                            
                            $.ajax(settings).done(function (response) {
                                console.log(response);
                                console.log("success!");
                                alert("Post successfully!");
                                game.scene.stop("UploadScoreScreen");
                                game.scene.start("GameOverScreen");

                            });
                        
                        }
                    });

    
                }

            }
    
        });

        this.tweens.add({
            targets: element,
            y: 600,
            duration: 1000,
            ease: 'Power3'
        });

    }

}


class GameOverScreen extends Phaser.Scene {
    constructor() {
        super({key:"GameOverScreen"});
    }

    preload(){

    }

    create(){
        const GWIDTH = this.scale.width;
        const GHEIGHT = this.scale.height;

        this.veil = this.add.graphics({x: 0, y: 0});
        this.veil.fillStyle('0x000000', 0.5);
        this.veil.fillRect(0, 0, GWIDTH, GHEIGHT);

        this.gameOver = this.add.text(200, 300, "GAME OVER", {font: "70px Dosis", fill: 'red', stroke: "white", strokeThickness: 1} );

        this.restartButton = this.add.text(GWIDTH / 2 - 60, GHEIGHT / 2 - 50, "Restart", {font: "40px Dosis", fill: 'white'});
        this.mainMenuButton = this.add.text(GWIDTH / 2 - 85, GHEIGHT / 2 + 17, "Main Menu", {font: "40px Dosis", fill: 'white'});
        this.leaderboardButton = this.add.text(GWIDTH / 2 - 100, GHEIGHT / 2 + 90, "LeaderBoard", {font: "40px Dosis", fill: 'white'});
        
        //Set interative for Restart Button
        let selectL = this.add.text(220, GHEIGHT / 2 - 44, '>>', {font:"30px Dosis", fill: 'lightblue' });
        let selectR = this.add.text(500, GHEIGHT / 2 - 44, '<<', {font:"30px Dosis", fill: 'lightblue' });
        selectL.alpha = 0;
        selectR.alpha = 0;

        this.restartButton.setInteractive();
        this.restartButton.on('pointerdown', () => { 
            game.scene.stop("GameOverScreen");
            game.scene.start("TypeGame");
        });

        this.restartButton.on('pointerover', () => { 
            selectL.alpha = 1;
            selectR.alpha = 1;
            selectL.setColor('orangered');
            selectR.setColor('orangered');
            this.restartButton.setColor('#FEC619');
        })

        this.restartButton.on('pointerout', () => { 
            selectL.alpha = 0;
            selectR.alpha = 0;
            this.restartButton.setColor('white');
        })


        //Set Interactive for MainMenu Button
        let selectL2 = this.add.text(220, GHEIGHT / 2 + 20, '>>', {font:"30px Dosis", fill: 'lightblue' });
        let selectR2 = this.add.text(500, GHEIGHT / 2 + 20, '<<', {font:"30px Dosis", fill: 'lightblue' });
        selectL2.alpha = 0;
        selectR2.alpha = 0;

        this.mainMenuButton.setInteractive();
        this.mainMenuButton.on('pointerdown', () => { 
            game.scene.stop("TypeGame");
            game.scene.stop("GameOverScreen");
            game.scene.start("MainMenu");
        });

        this.mainMenuButton.on('pointerover', () => { 
            selectL2.alpha = 1;
            selectR2.alpha = 1;
            selectL2.setColor('orangered');
            selectR2.setColor('orangered');
            this.mainMenuButton.setColor('#FEC619');
        })

        this.mainMenuButton.on('pointerout', () => { 
            selectL2.alpha = 0;
            selectR2.alpha = 0;
            this.mainMenuButton.setColor('white');
        })

        //Set interactive for LeaderBoard button
        let selectL3 = this.add.text(220, GHEIGHT / 2 + 96, '>>', {font:"30px Dosis", fill: 'lightblue' });
        let selectR3 = this.add.text(500, GHEIGHT / 2 + 96, '<<', {font:"30px Dosis", fill: 'lightblue' });
        selectL3.alpha = 0;
        selectR3.alpha = 0;

        this.leaderboardButton.setInteractive();
        this.leaderboardButton.on('pointerdown', () => { 
            game.scene.stop("TypeGame");
            game.scene.stop("GameOverScreen");
            game.scene.start("LeaderBoard");
        });

        this.leaderboardButton.on('pointerover', () => { 
            selectL3.alpha = 1;
            selectR3.alpha = 1;
            selectL3.setColor('orangered');
            selectR3.setColor('orangered');
            this.leaderboardButton.setColor('#FEC619');
        })

        this.leaderboardButton.on('pointerout', () => { 
            selectL3.alpha = 0;
            selectR3.alpha = 0;
            this.leaderboardButton.setColor('white');
        })

    }

}







