// game config
let config = {
    type: Phaser.AUTO,
    width: 600,
    height: 400,
    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
    },
    scene: [ Simple ]
}

let game = new Phaser.Game(config);

// some globals
const centerX = game.config.width / 2;
const centerY = game.config.height / 2;
let cursors = null;