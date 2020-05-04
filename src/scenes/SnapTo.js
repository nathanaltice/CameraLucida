class SnapTo extends Phaser.Scene {
    constructor() {
        super("snapToScene");
    }

    preload() {
        // load assets
        this.load.path = "assets/";
        this.load.image('car', 'car.png');
        this.load.image('boat', 'boat.png');
        this.load.image('globe', 'globe.png');
    }

    create() {
        // variables
        const iconScale = 0.25;
        this.bgSize = 3000;
        this.resetDuration = 2500;

        // add background image
        this.bg = this.add.image(0, 0, 'gradientBG').setOrigin(0);

        // randomize trees within a group
        let treeGroup = this.add.group();
        for(let i = 0; i < 10; i++) {
            let tree = this.add.image(0, 0, 'tree01').setRandomPosition(0, 0, 3000, 3000);
            treeGroup.add(tree);
            tree = this.add.image(0, 0, 'tree02').setRandomPosition(0, 0, 3000, 3000);
            treeGroup.add(tree);
        }

        // setup graphics object (so we can draw paths)
        let graphics = this.add.graphics();
        graphics.lineStyle(2, 0xFFFFFF, 0.75);      // lineWidth, color, alpha

        // add car path
        this.carPath = this.add.path(100, 100); // start of path
        this.carPath.lineTo(1700, 300);         // next path point
        this.carPath.lineTo(1800, 500);         // next
        this.carPath.lineTo(100, 400);          // next
        this.carPath.lineTo(100, 100);          // and back to start
        this.carPath.draw(graphics);            // draw path
        let s = this.carPath.getStartPoint();   // get start point of path
        // add path follower: follower(path, x, y, texture [, frame])
        this.car = this.add.follower(this.carPath, s.x, s.y, 'car').setScale(0.5);
        // start path follow with config
        // note: you can mix properties from both types of config objects
        // https://photonstorm.github.io/phaser3-docs/Phaser.Types.Tweens.html#.NumberTweenBuilderConfig
        // https://photonstorm.github.io/phaser3-docs/Phaser.Types.GameObjects.PathFollower.html#.PathConfig
        this.car.startFollow({
            from: 0,            // points allow a path are values 0–1
            to: 1,
            delay: 0,
            duration: 10000,
            ease: 'Power0',
            hold: 0,
            repeat: -1,
            yoyo: false,
            rotateToPath: true
        });

        // add boat path
        this.boatPath = this.add.path(2800, 1300);  // start of path
        this.boatPath.circleTo(600);                // radius of circle path
        this.boatPath.draw(graphics);               // draw path
        s = this.boatPath.getStartPoint();          // get start point
        // add path follower
        this.boat = this.add.follower(this.boatPath, s.x, s.y, 'boat').setScale(0.5);
        // start path follow with config
        this.boat.startFollow({
            duration: 15000,
            from: 0,
            to: 1,
            rotateToPath: true,
            startAt: 0,
            repeat: -1
        });

        // add copter path
        this.copterPath = this.add.path(500, 2500);
        // ellipseTo( [xRadius] [, yRadius] [, startAngle] [, endAngle] [, clockwise] [, rotation])
        this.copterPath.ellipseTo(400, 800, 180, 0, false, 0);
        this.copterPath.closePath();
        this.copterPath.draw(graphics);
        s = this.copterPath.getStartPoint();
        this.copter = this.add.follower(this.copterPath, s.x, s.y, 'copter').setScale(0.5);
        // start path follower
        this.copter.startFollow({
            duration: 25000,
            rotateToPath: true,
            repeat: -1
        });

        // add transportation UI icons
        this.icons = this.add.group();
        {   
            // copter
            this.copterIcon = this.add.image(0, 0, 'copter').setOrigin(0, 0.5).setScale(iconScale);
            this.copterIcon.setScrollFactor(0);     // attach to camera
            this.copterIcon.tint = 0x000000;
            this.copterIcon.objKey = this.copter;   // we need this to set a target for the camera
            this.copterIcon.setInteractive({ useHandCursor: true });
            // car
            this.carIcon = this.add.image(0, 0, 'car').setOrigin(0, 0.5).setScale(iconScale);
            this.carIcon.setScrollFactor(0); 
            this.carIcon.tint = 0x000000;
            this.carIcon.objKey = this.car;
            this.carIcon.setInteractive({ useHandCursor: true });
            // boat
            this.boatIcon = this.add.image(0, 0, 'boat').setOrigin(0, 0.5).setScale(iconScale);
            this.boatIcon.setScrollFactor(0);
            this.boatIcon.tint = 0x000000;
            this.boatIcon.objKey = this.boat;
            this.boatIcon.setInteractive({ useHandCursor: true });
            // globe
            this.globeIcon = this.add.image(0, 0, 'globe').setOrigin(0, 0.5).setScale(iconScale);
            this.globeIcon.setScrollFactor(0);
            this.globeIcon.setInteractive({ useHandCursor: true });
            // add objects to group
            this.icons.addMultiple([this.copterIcon, this.carIcon, this.boatIcon, this.globeIcon]);
            // create line
            let line = new Phaser.Geom.Line(5, game.config.height/5, 5, game.config.height);
            // place group on line
            Phaser.Actions.PlaceOnLine(this.icons.getChildren(), line);
        }

        // set up icon input events
        this.copterIcon.on('pointerdown', this.moveCam);
        this.carIcon.on('pointerdown', this.moveCam);
        this.boatIcon.on('pointerdown', this.moveCam);
        this.globeIcon.on('pointerdown', this.resetCam);

        // configure main camera (bg image is 3000x3000)
        this.cameras.main.setBounds(0, 0, 3000, 3000);
        this.cameras.main.setZoom(1);
        this.cameras.main.startFollow(this.copter);
        this.cameras.main.ignore(this.icons);
        // add UI camera (ie it ignores all objects other than UI icons)
        this.UICamera = this.cameras.add(0, 0, game.config.width, game.config.height).setZoom(1);
        this.UICamera.ignore([this.bg, treeGroup, graphics, this.car, this.boat, this.copter]);

        // input
        let swap = this.input.keyboard.addKey('S');
        swap.on('down', () => {
            this.scene.start("fourViewsScene");
        });
        
        // DEBUG ONLY: to "see" the UI camera, uncomment the line below
        //this.UICamera.setBackgroundColor(0xFACADE);
    }

    moveCam() {
        // startFollow(target [, roundPixels] [, lerpX] [, lerpY] [, offsetX] [, offsetY])
        this.scene.cameras.main.startFollow(this.objKey, false, 0.1, 0.1);
        // zoom in: zoomTo(zoom [, duration] [, ease] [, force] [, callback] [, context])
        this.scene.cameras.main.zoomTo(1, this.resetDuration, 'Sine.easeInOut', false);
    }

    resetCam() {
        // stop following game objects
        this.scene.cameras.main.stopFollow();
        // pan to center world: pan(x, y [, duration] [, ease] [, force] [, callback] [, context])
        this.scene.cameras.main.pan(1500, 1500, this.resetDuration, 'Sine.easeInOut');
        // zoom out
        this.scene.cameras.main.zoomTo(0.25, this.resetDuration, 'Sine.easeInOut', false);
    }
}