class TripleCam extends Phaser.Scene {
    constructor() {
        super("tripleCamScene")
    }

    preload() {
        // load assets
        this.load.path = "assets/"
        this.load.image('gradientBG', 'gradientBG.png')
        this.load.image('copter', 'copter.png')
        this.load.image('tree01', 'tree01.png')
        this.load.image('tree02', 'tree02.png')
    }

    create() {
        // variables
        this.copterVelocity = 500

        // add background
        this.add.image(0, 0, 'gradientBG').setOrigin(0)

        // add copter
        this.copter = this.physics.add.sprite(0, 0, 'copter').setRandomPosition(200, 200, 2800, 2800)

        // randomize trees
        for(let i = 0; i < 10; i++) {
            this.add.image(0, 0, 'tree01').setRandomPosition(0, 0, 3000, 3000)
            this.add.image(0, 0, 'tree02').setRandomPosition(0, 0, 3000, 3000)
        }

        // configure main camera (bg image is 3000x3000)
        this.cameras.main.setBounds(0, 0, 3000, 3000)
        this.cameras.main.setZoom(0.75)
        // have camera follow copter
        // startFollow(target [, roundPixels] [, lerpX] [, lerpY] [, offsetX] [, offsetY])
        this.cameras.main.startFollow(this.copter, true, 0.1, 0.1)
        // set camera dead zone
        this.cameras.main.setDeadzone(200, 200)
        this.cameras.main.setName("center")

        // add left camera
        this.leftCamera = this.cameras.add(0, 0, 150, game.config.height).setZoom(0.25)
        this.leftCamera.setBounds(0, 0, 3000, 3000)
        this.leftCamera.startFollow(this.copter)
        this.leftCamera.setAlpha(0.75)
        this.leftCamera.setName("left")

        // add right camera
        this.rightCamera = this.cameras.add(game.config.width - 150, 0, 150, game.config.height).setZoom(0.5)
        this.rightCamera.setBounds(0, 0, 3000, 3000)
        this.rightCamera.setScroll(1500, 1000)  
        this.rightCamera.startFollow(this.copter)
        this.rightCamera.setName("right")

        // set up input
        cursors = this.input.keyboard.createCursorKeys()
        this.swap = this.input.keyboard.addKey('S')

        // DEBUG
        //console.log(this.cameras)
    }

    update() {
        // player input
        let copterDirection = new Phaser.Math.Vector2()
        if(cursors.up.isDown) {
            copterDirection.y = - 1
        } else if (cursors.down.isDown) {
            copterDirection.y = 1
        }
        if(cursors.left.isDown) {
            copterDirection.x = -1
            this.copter.setFlipX(true)
        } else if (cursors.right.isDown) {
            copterDirection.x = 1
            this.copter.resetFlip()
        } 
        copterDirection.normalize()
        this.copter.setVelocity(this.copterVelocity * copterDirection.x, this.copterVelocity * copterDirection.y)

        // Scene change
        if(Phaser.Input.Keyboard.JustDown(this.swap)) {
            this.scene.start("snapToScene")
        }
    }
}