# ID_TypeStormMania_Website
Github URL: https://chen-han-np.github.io/ID_TypeStormMania_Website/

# TypeStorm Mania
This website holds a typing game that challenge users how fast they can type. The words being thrown at users are words from the programming languages python, javascript and c#. The game help users practise their typing speed and train themselves to push their typing speed limit further. There is a leaderboard section that shows the top 20 people who have the 20 highest scores in the database, and challenge others to try to beat their high scores.

# How to play
TypeStorm Mania is a typing game. If you press a letter on your keyboard, it finds a word that starts with the same letter that is closes to the ground. When you press the first letter of the word, you have to complete the word before you can move on to the next word. After a certain amount of words typed, an enemy bug will appear at random and block your vision and covers a word. Each enemy bug will have a random health bar and that health bar will decrease by 1 for every word you destroy!

# Score system
- Destroy a letter (+1 point)
- Destroy a regular word (+5 points)
- Destroy a word blocked by a bug (+15 points)

# Design Process
This website uses mostly cool colours. On every page in the game, it uses a cool colour of blue and its many different shades. The background colour is kept the same for every javascript page to stick to a blue toned colour theme. In the game page, there are many referneces to coding. The background was picked carefully with the theme of code, and the ground of the game is screenshots of actual code found in our javascript game code. At the game over screen, the ground code becomes lines of error. The interactive buttons on the main, pause and game over screen page are interactive and upon hover change colour for a nice effect of seeing clearly the option your mouse is hovering over. The html background with the gif is selected to have cool colours with a bit of contrast of the moving waves of red dots and lines.

# Features implemented
- The typing game
    - Random speeds for each word
    - Overall speed increase after every milestone of words cleared
    - Pause screen (Restart or Continue game)
    - Game over screen
- Saving best score for individual local storages
- Submitting best scores of an individual to a database
- Leaderboard loads information from a database

# Technologies used
- Phaser 3 (Game framework)
- Rex UI
- Lottie (GIF)
- Font Awesome

# Credits
## Website articles
- Explosion codes - [Link](https://phaser.io/examples/v3/view/game-objects/particle-emitter/explode-test)
- Overall Github Phaser 3 examples - [Link](https://github.com/photonstorm/phaser3-examples/blob/master/public)
- Font Awesome ICON in Pause Screen - [Link](https://www.emanueleferonato.com/2021/01/01/add-font-awesome-icons-to-your-html5-games-powered-by-phaser-thanks-to-its-dom-support/)
- Upload score screen - [Link](https://github.com/photonstorm/phaser3-examples/blob/master/public/assets/text/loginform.html)
- Phaser 3 rounded rectangle - [Link](https://phaser.io/examples/v3/view/game-objects/graphics/fill-rounded-rectangle)


## Images used
- Main menu background [image](https://www.freepik.com/vectors/technology) Technology vector created by starline - www.freepik.com
- Leaderboard background [image](https://www.freepik.com/vectors/background) Background vector created by kjpargeter - www.freepik.com
- Game background [image](https://dribbble.com/shots/10465923-Stream-of-binary-code-design-vector)
- Lottie GIF [gif](https://lottiefiles.com/21482-square-grid-background-loop)