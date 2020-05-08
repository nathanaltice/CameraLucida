class SmoothedController extends Phaser.Scene {
    constructor() {
        super("smoothedControllerScene");
    }

    create() {
        // add background
        this.add.image(0, 0, 'gradientBG').setOrigin(0);

        // randomize trees
        for(let i = 0; i < 10; i++) {
            this.add.image(0, 0, 'tree01').setRandomPosition(0, 0, 3000, 3000);
            this.add.image(0, 0, 'tree02').setRandomPosition(0, 0, 3000, 3000);
        }

        // set up input
        cursors = this.input.keyboard.createCursorKeys();
        this.swap = this.input.keyboard.addKey('S');

        // create camera control configuration object to pass to Camera Controller (see below)
        // https://photonstorm.github.io/phaser3-docs/Phaser.Types.Cameras.Controls.html#.SmoothedKeyControlConfig__anchor
        let controlConfig = {
            camera: this.cameras.main,      // which camera?
            left: cursors.left,             // define keys...
            right: cursors.right,
            up: cursors.up,
            down: cursors.down,
            zoomIn: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
            zoomOut: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
            zoomSpeed: 0.01,
            acceleration: 0.06,             // physics values (keep these low)
            drag: 0.0005,
            maxSpeed: 0.5
        }
        // create smoothed key camera control
        // i.e., we control the cam w/ the defined keys w/ physics controls
        // note: you *must* call the update method of this controller each frame (see below)
        // https://photonstorm.github.io/phaser3-docs/Phaser.Cameras.Controls.SmoothedKeyControl.html
        this.camControl = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);

        // configure main camera (bg image is 3000x3000)
        this.cameras.main.setBounds(0, 0, 3000, 3000);
        this.cameras.main.setZoom(0.5);

        // DEBUG
        //console.log(this.cameras);

    }

    // be sure to grab Phaser's time/delta parameters for the camera controller
    update(time, delta) {
        // update our camera controller (delta: Δ time in ms since last frame)
        this.camControl.update(delta);

        // Scene change
        if(Phaser.Input.Keyboard.JustDown(this.swap)) {
            this.scene.start("tripleCamScene");
        }
    }
}