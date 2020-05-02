class SnapTo extends Phaser.Scene {
    constructor() {
        super("snapToScene");
    }

    preload() {
        // load assets
        this.load.path = "assets/";
        this.load.image('car', 'car.png');
        this.load.image('boat', 'boat.png');
    }

    create() {
        // variables
        this.copterVelocity = 300;

        // add background
        this.add.image(0, 0, 'gradientBG').setOrigin(0);

        // add transportation
        this.copter = this.physics.add.sprite(200, 200, 'copter');
        this.car = this.physics.add.sprite(200, 400, 'car');
        this.boat = this.physics.add.sprite(200, 600, 'boat');

        // randomize trees
        for(let i = 0; i < 10; i++) {
            this.add.image(0, 0, 'tree01').setRandomPosition(0, 0, 3000, 3000);
            this.add.image(0, 0, 'tree02').setRandomPosition(0, 0, 3000, 3000);
        }

        // configure main camera (bg image is 3000x3000)
        this.cameras.main.setBounds(0, 0, 3000, 3000);
        this.cameras.main.setZoom(0.5);
        this.cameras.main.startFollow(this.copter);
        this.cameras.main.setName("center");

        // setup graphics object (so we can draw paths)
        let graphics = this.add.graphics();
        graphics.lineStyle(2, 0xFFFFFF, 0.75);      // lineWidth, color, alpha

        // add path object(s)
        this.copterPath = this.add.path(100, 100);  // start of path
        this.copterPath.lineTo(900, 400);           // next path point
        this.copterPath.lineTo(100, 400);           // next
        this.copterPath.lineTo(100, 100);           // and back to start
        this.copterPath.draw(graphics);             // draw path

        this.carPath = this.add.path(2200, 1300);     // start of path
        this.carPath.circleTo(200);                 // radius of circle path
        this.carPath.draw(graphics);                // draw path

        // set up input
        cursors = this.input.keyboard.createCursorKeys();

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
            this.copter.setFlipX(true);
        } else if (cursors.right.isDown) {
            this.copter.body.setVelocityX(this.copterVelocity);
            this.copter.resetFlip();
        } else {
            this.copter.body.setVelocityX(0);
        }
    }

    moveCam(target) {

    }
}