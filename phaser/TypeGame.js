class TypeGame extends Phaser.Scene {
    constructor() {
        super({key:"TypeGame"});
    }

    create(){
        const displayText = this.add.text(0,0,"Start Typing! ", {font: "50px Impact"});

        this.backButton = this.add.text(600, 25, 'Go back', { fontSize: 30, fill: 'white', backgroundColor:"green" });
        this.backButton.setInteractive();
        this.backButton.setX(game.config.width - this.backButton.width - 25); //Make sure that its alw center
        this.backButton.on('pointerdown', () => { this.scene.start("MainMenu") });

        this.gameOver = false;
        this.data = programmingData;
        
        

        

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

        //This keep tracks of which key is pressed.
        this.input.keyboard.on('keydown', function (event) { 
            console.log(event.key); //event.key -> "d" event.code -> KeyD
            if (event.key == "c"){
                this.scene.start("TypeGame");
            }
        }, this);
        
        this.text1 = this.add.text(0, 0, '', {font: 40, fill: 'red'});

        
    }

    update(delta){
        var languageSelected = this.data["Python"];
        console.log(languageSelected);
        var randomWord = languageSelected[Math.floor(Math.random() * languageSelected.length)];
        console.log(randomWord)
        this.text1.setText(randomWord);

    }


}