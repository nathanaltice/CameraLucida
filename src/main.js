// Nathan Altice
// Created: 5/1/20
// Updated: 5/3/23
// Camera Lucida
// Phaser 3 project demonstrating camera features, paths, path followers, etc.

'use strict'

// game config
let config = {
    type: Phaser.AUTO,
    parent: "game",
    width: 800,
    height: 600,
    physics: {
        default: "arcade",
        arcade: {
            //debug: true
        }
    },
    scene: [ TripleCam, SnapTo, FourViews, FixedController, SmoothedController ]
}

let game = new Phaser.Game(config)

const centerX = game.config.width / 2
const centerY = game.config.height / 2
let cursors = null