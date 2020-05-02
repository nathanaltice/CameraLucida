// Nathan Altice
// Created: 5/1/20
// Updated: 5/2/20
// Camera Lucida
// Phaser 3 project demonstrating camera features, paths, path followers

// game config
let config = {
    type: Phaser.AUTO,
    width: 700,
    height: 400,
    physics: {
        default: "arcade",
        arcade: {
            //debug: true
        }
    },
    scene: [ TripleCam, SnapTo ]
}

let game = new Phaser.Game(config);

// some globals
const centerX = game.config.width / 2;
const centerY = game.config.height / 2;
let cursors = null;