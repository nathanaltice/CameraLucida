class TripleCam extends Phaser.Scene {
    constructor() {
        super("tripleCamScene");
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
        // variables
        this.copterVelocity = 300;

        // add background
        this.add.image(0, 0, 'gradientBG').setOrigin(0);

        // add copter
        this.copter = this.physics.add.sprite(0, 0, 'copter').setRandomPosition(0, 0, 3000, 3000);

        // randomize trees
        for(let i = 0; i < 10; i++) {
            this.add.image(0, 0, 'tree01').setRandomPosition(0, 0, 3000, 3000);
            this.add.image(0, 0, 'tree02').setRandomPosition(0, 0, 3000, 3000);
        }

        // configure main camera (bg image is 3000x3000)
        this.cameras.main.setBounds(0, 0, 3000, 3000);
        this.cameras.main.setZoom(0.75);
        this.cameras.main.startFollow(this.copter);
        this.cameras.main.setName("center");

        // add left camera
        this.leftCamera = this.cameras.add(0, 0, 100, game.config.height).setZoom(0.25);
        this.leftCamera.setBounds(0, 0, 3000, 3000);
        this.leftCamera.startFollow(this.copter);
        this.leftCamera.setAlpha(0.75);
        this.leftCamera.setName("left");

        // add right camera
        this.rightCamera = this.cameras.add(game.config.width - 100, 0, 100, game.config.height).setZoom(0.5);
        this.rightCamera.setBounds(0, 0, 3000, 3000);
        this.rightCamera.setScroll(1500, 1000);  
        this.rightCamera.startFollow(this.copter);
        this.rightCamera.setName("right");

        // set up input
        cursors = this.input.keyboard.createCursorKeys();

        // debug info
        console.log(this.cameras);
    }

    update() {
        // player input
        if(cursors.up.isDown) {
            this.copter.body.setVelocityY(-this.copterVelocity);
        } else if (cursors.down.isDown) {
            this.copter.body.setVelocityY(this.copterVelocity);
        } else {
            this.copter.body.setVelocityY(0);
        }
        if(cursors.left.isDown) {
            this.copter.body.setVelocityX(-this.copterVelocity);
        } else if (cursors.right.isDown) {
            this.copter.body.setVelocityX(this.copterVelocity);
        } else {
            this.copter.body.setVelocityX(0);
        }
    }
}