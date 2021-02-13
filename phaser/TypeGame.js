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
                this.scene.start("TypeGame");
            }
        }, this);


        this.ground = this.physics.add.sprite(game.config.width/2, game.config.height - 30, 'ground');
        this.ground.setImmovable(true);

        
        this.NoOfText = 1;

        this.generateNewText(0, 50, "hello world");

        this.score = 0;
        //Get the top score stored in the local storage, if first time player, set it to 0 first.
        this.topScore = localStorage.getItem(gameOptions.localStorageName) == null ? 0 : localStorage.getItem(gameOptions.localStorageName);
        this.scoreText = this.add.text(game.config.width / 5 * 2, 30, '', {font: "20px Arial Black", fill: 'white'});
        this.updateScore(this.score);

        

        
    }

    updateScore(inc){
        this.score += inc;
        this.scoreText.text = "Score: " + this.score + "      Best: " + this.topScore;
    }

    generateNewText(x, y, name){

        this.newText = this.add.text(x, y, name, {font: "18px Arial Black", fill: 'white'});
        this.physics.world.enable(this.newText);
        this.newText.body.setVelocity(100, 200);
        this.newText.body.setBounce(1, 1);
        this.newText.body.setCollideWorldBounds(true);
    
    }
    

    update(delta){
        var languageSelected = this.data["Python"];
        for (var i = 0; i< this.NoOfText; i++){
            var randomWord = languageSelected[Math.floor(Math.random() * languageSelected.length)];
            //this.text1.setText(randomWord);
            
        }

        if (this.gameOver){
            game.destroy();
        }

    }


}