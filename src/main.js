// Nathan Altice
// Created: 5/1/20
// Updated: 5/3/20
// Camera Lucida
// Phaser 3 project demonstrating camera features, paths, path followers, etc.

// JavaShrek tamer
'use strict';

// game config
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: "arcade",
        arcade: {
            //debug: true
        }
    },
    scene: [ TripleCam, SnapTo, FourViews ]
}

let game = new Phaser.Game(config);

// some globals
const centerX = game.config.width / 2;
const centerY = game.config.height / 2;
let cursors = null;