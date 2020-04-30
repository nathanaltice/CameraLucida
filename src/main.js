// game config
let config = {
    type: Phaser.AUTO,
    width: 700,
    height: 400,
    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
    },
    scene: [ TripleCam ]
}

let game = new Phaser.Game(config);

// some globals
const centerX = game.config.width / 2;
const centerY = game.config.height / 2;
let cursors = null;