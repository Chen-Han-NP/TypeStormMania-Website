class TypeGame extends Phaser.Scene {
    constructor() {
        super({key:"TypeGame"});
    }

    preload(){
        this.load.image('ground', '/assets/ground.png');
    }

    create(){
        //const displayText = this.add.text(-100,-100,"Start Typing! ", {font: "50px Impact"});

        this.backButton = this.add.text(600, 30, 'Go back', { fontSize: 30, fill: 'white', backgroundColor:"green" });
        this.backButton.setInteractive();
        this.backButton.setX(game.config.width - this.backButton.width - 25); //Make sure that its alw center
        this.backButton.on('pointerdown', () => { this.scene.start("MainMenu") });

        this.gameOver = false;
        this.data = programmingData;
        


        
/*
        var tween = this.tweens.add(
            {
                targets: displayText,
                x: game.config.width / 2 - displayText.width / 2,
                y: game.config.height * 0.3,
                duration: 1500,
                ease: "Elastic",
                easeParams: [1.5, 0.5],
                delay: 1000,
                onComplete: function(src, tgt){
                    tgt[0].x = -100;
                    tgt[0].y = -100;
                    tgt[0].setColor("Red");
                }
            }, this);
*/



        //This keep tracks of which key is pressed.
        this.input.keyboard.on('keydown', function (event) { 
            console.log(event.key); //event.key -> "d" event.code -> KeyD
            if (event.key == "c"){
                //this.scene.start("TypeGame");
                console.log(this.generateRandomDelay(1000, 1500));
            }
        }, this);



        this.textGroup = this.physics.add.group();

        this.currentTextCount = this.textGroup;
        console.log(this.currentTextCount);
        this.maxTextCount = 12;

        
        this.ground = this.physics.add.sprite(game.config.width/2, game.config.height - 30, 'ground');
        this.ground.setImmovable(true);

        
        this.NoOfText = 1;

        

        this.score = 0;
        //Get the top score stored in the local storage, if first time player, set it to 0 first.
        this.topScore = localStorage.getItem(gameOptions.localStorageName) == null ? 0 : localStorage.getItem(gameOptions.localStorageName);
        this.scoreText = this.add.text(game.config.width / 5 * 2, 30, '', {font: "20px Arial Black", fill: 'white'});
        this.updateScore(this.score);

        
        
        this.time.addEvent({
            delay: this.generateRandomDelay(500, 1200),
            callbackScope: this,
            callback: function() {

                var languageSelected = this.data["Python"];
        
                var randomWord = languageSelected[Math.floor(Math.random() * languageSelected.length)];
                while (this.checkDuplicateWord(randomWord)){
                    randomWord = languageSelected[Math.floor(Math.random() * languageSelected.length)];
                }
                var textGroupObjects = this.textGroup.getChildren();
                if (textGroupObjects.length < this.maxTextCount){
                    this.textGroup.add(this.add.text(this.generateRandomX(), 50, randomWord,  {font: "18px Arial Black", fill: 'white'}));
                    this.applyVelocity(0, 100);
                    
                }
            },
            loop: true
        });
        
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
        var textGroupObjects = this.textGroup.getChildren();
        for (var i = 0; i < textGroupObjects.length; i ++){
            if (word == textGroupObjects[i].text){
                return true;
            }
        }
        return false;
    }


    generateRandomX(){
        return Math.floor(Math.random() * (game.config.width - 100));
    }

    generateRandomDelay(minValue, maxValue){
        return Math.floor(Math.random() * (maxValue - minValue +1)) + minValue;
    }


    applyVelocity(x, y){
        var textGroupObjects = this.textGroup.getChildren();
        for (var i = 0; i < textGroupObjects.length; i++){
            this.physics.world.enable(textGroupObjects[i]);
            textGroupObjects[i].body.setVelocity(x, y);
            textGroupObjects[i].body.setBounce(1, 1);
        }
    }

    checkGameOver(){
        var textGroupObjects = this.textGroup.getChildren();
        for (var i = 0; i < textGroupObjects.length; i++){
            if (textGroupObjects[i].y >= this.ground.getBounds().top){
                return true;
            }
        }
        return false;
    }

    update(delta){
        //Check if any text has collided with the ground
        if (this.checkGameOver()){
            this.gameOver = true;
            console.log("Game Over!");
            localStorage.setItem(gameOptions.localStorageName, Math.max(this.score, this.topScore));
            this.scene.start('TypeGame');
        }

        else{
            this.gameOver = false;

        }

    }


}