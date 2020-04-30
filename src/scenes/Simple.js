class Simple extends Phaser.Scene {
    constructor() {
        super("simpleScene");
    }

    preload() {
        // load assets
        this.load.path = "assets/";
        this.load.image('gradientBG', 'gradientBG.png');
        this.load.image('copter', 'copter.png');
        this.load.image('tree01', 'tree01.png');
        this.load.image('tree02', 'tree02.png');
    }

    create() {
        // add background
        this.add.image(0, 0, 'gradientBG').setOrigin(0);

        // add copter
        this.copter = this.physics.add.sprite(centerX, centerY, 'copter');

        // set up input
        cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        
    }
}