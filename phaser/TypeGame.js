class TypeGame extends Phaser.Scene {
    constructor() {
        super({key:"TypeGame"});
    }

    preload(){
        this.load.image('ground', '/assets/ground.png');
        this.load.image("sky1", "/assets/sky/starry sky.png");

    }

    create(){
        const GWIDTH = this.scale.width;
        const GHEIGHT = this.scale.height;
        var graphics;
        var pauseGraphics;

        this.add.image(GWIDTH * 0.5, GHEIGHT * 0.5, "sky1");
        graphics = this.add.graphics();

        graphics.fillStyle(0x7B7B7B, 1);

            //  12px radius on the corners
        graphics.fillRoundedRect(600, 30, 130, 30, 12);

        this.backButton = this.add.text(600, 30, ' << Go back ', {font:"30px Staatliches"});
        this.backButton.setInteractive();
        this.backButton.setX(game.config.width - this.backButton.width - 25); //Make sure that its alw center
        this.backButton.on('pointerdown', () => { 
            this.scene.start("MainMenu") 
        });

        pauseGraphics = this.add.graphics();

        pauseGraphics.fillStyle(0x7B7B7B, 1);

            //  12px radius on the corners
        pauseGraphics.fillRoundedRect(192, 32, 80, 30, 12);

        this.isPause = false;
        this.pauseButton = this.add.text(200, 32, "Pause", {font:"30px Staatliches"});
        this.pauseButton.setInteractive();
        this.pauseButton.on('pointerdown', () => {
            game.scene.pause("TypeGame");
            game.scene.start("PauseScreen")
            
        });

        this.gameOver = false;
        this.data = programmingData;
        

        this.textGroup = this.physics.add.group();
        this.textGroupObjects = this.textGroup.getChildren();

        this.currentTextCount = this.textGroup;
        console.log(this.currentTextCount);
        this.maxTextCount = 12;

        
        this.ground = this.physics.add.sprite(game.config.width/2, game.config.height - 30, 'ground');
        this.ground.setImmovable(true);

        
        this.NoOfText = 0;
        this.isGenerateBug = false;

        

        this.score = 0;
        //Get the top score stored in the local storage, if first time player, set it to 0 first.
        this.topScore = localStorage.getItem(gameOptions.localStorageName) == null ? 0 : localStorage.getItem(gameOptions.localStorageName);
        this.scoreText = this.add.text(320, 35, '', {font: "20px Arial Black", fill: 'white'});
        this.updateScore(this.score);

        

        this.generateText = this.time.addEvent({
            delay: 600,
            callbackScope: this,
            callback: function() {

                var languageSelected = this.data["Python"];
        
                var randomWord = languageSelected[Math.floor(Math.random() * languageSelected.length)];
                while (this.checkDuplicateWord(randomWord)){
                    randomWord = languageSelected[Math.floor(Math.random() * languageSelected.length)];
                }

                if (this.textGroupObjects.length < this.maxTextCount){
                    this.textGroup.add(this.add.text(this.generateRandomX(), 50, randomWord,  {font: "20px Arial Black", fill: 'white', backgroundColor: "black"}));
                    if (this.NoOfText < 20){
                        this.applyVelocity(0, 45);

                    }
                    else if ((this.NoOfText >= 20) && (this.NoOfText < 60)){
                        this.applyVelocity(0, 50);
                        this.maxTextCount = 13;
                    }
                    else if ((this.NoOfText >= 60) && (this.NoOfText < 100)){
                        this.applyVelocity(0, 55);
                        this.maxTextCount = 14;
                    }
                    else if ((this.NoOfText >= 100) && (this.NoOfText < 140)){
                        this.applyVelocity(0, 60);
                        this.maxTextCount = 15;
                    }
                    else if ((this.NoOfText >= 140) && (this.NoOfText < 180)){
                        this.applyVelocity(0, 65);
                        this.maxTextCount = 16;
                    }
                    else if ((this.NoOfText >= 180) && (this.NoOfText < 220)){
                        this.applyVelocity(0, 70);
                        this.maxTextCount = 17;
                        
                    }
                    else {
                        this.applyVelocity(0, 80);
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
                        var newText = this.textGroupObjects[i].text.substring(1);
                        this.textGroupObjects[i].setText(newText);
                        this.textPos = i;
                        this.textGroupObjects[i].setColor('#ebb134');
                        this.updateScore(1);
                        
                        break;
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
        this.scoreText.text = "Score: " + this.score + "      Best: " + this.topScore;
    }

    generateNewText(x, y, name){

        let newText = this.add.text(x, y, name, {font: "18px Arial Black", fill: 'white'});
        this.physics.world.enable(newText);
        newText.body.setVelocity(100, 200);
        newText.body.setBounce(1, 1);
        newText.body.setCollideWorldBounds(true);
        return newText;
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
            this.physics.world.enable(this.textGroupObjects[i]);
            this.textGroupObjects[i].body.setVelocity(x, y);
            this.textGroupObjects[i].body.setBounce(1, 1);
        }
    }


    checkGameOver(){
        for (var i = 0; i < this.textGroupObjects.length; i++){
            if (this.textGroupObjects[i].y >= this.ground.getBounds().top){
                return true;
            }
        }
        return false;
    }

    getAllFirstLetter(){
        var letterList = [];
        for (var i = 0; i < this.textGroupObjects.length; i++){
            console.log(this.textGroupObjects[i].text[0]);
        }
    }

    update(){
        //Check if any text has collided with the ground
        if (this.checkGameOver()){
            this.gameOver = true;
            console.log("Game Over!");
            localStorage.setItem(gameOptions.localStorageName, Math.max(this.score, this.topScore));
            this.scene.start('TypeGame');
        }

        else{
            this.gameOver = false;
            this.textGroupObjects = this.textGroup.getChildren();
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




