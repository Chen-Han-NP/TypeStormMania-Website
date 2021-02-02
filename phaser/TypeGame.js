class TypeGame extends Phaser.Scene {
    constructor() {
        super({key:"TypeGame"});
    }

    create(){
        this.text = this.add.text(0,0,"Start Typing! ", {font: "50px Impact"});

        var tween = this.tweens.add(
            {
                targets: this.text,
                x:200,
                y:250,
                duration: 2000,
                ease: "Elastic",
                easeParams: [1.5, 0.5],
                delay: 1000,
                onComplete: function(src, tgt){
                    tgt[0].x = 0;
                    tgt[0].y = 0;
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
        
    }
}