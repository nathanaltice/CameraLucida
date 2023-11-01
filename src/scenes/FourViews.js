class FourViews extends Phaser.Scene {
    constructor() {
        super("fourViewsScene")
    }

    preload() {
        // load assets
        this.load.path = "assets/"
        this.load.image('palm', 'tree03.png')
        this.load.image('house', 'house.png')
        this.load.image('castle', 'castle.png')
    }

    create() {
        // variables
        this.copterVelocity = 500
        this.bgSize = 3000

        // add background
        this.add.image(0, 0, 'gradientBG').setOrigin(0)

        // add copter
        this.copter = this.physics.add.sprite(1500, 1500, 'copter')

        // randomize trees within a group
        let treeGroup = this.add.group()
        for(let i = 0; i < 10; i++) {
            let tree = this.add.image(0, 0, 'tree01').setRandomPosition(0, 0, 3000, 3000)
            treeGroup.add(tree)
            tree = this.add.image(0, 0, 'tree02').setRandomPosition(0, 0, 3000, 3000)
            treeGroup.add(tree)
        }
        // house group
        let houseGroup = this.add.group()
        for(let i = 0; i < 10; i++) {
            let house = this.add.image(0, 0, 'house').setRandomPosition(0, 0, 3000, 3000)
            houseGroup.add(house)
        }
        // castle group
        let castleGroup = this.add.group()
        for(let i = 0; i < 10; i++) {
            let castle = this.add.image(0, 0, 'castle').setRandomPosition(0, 0, 3000, 3000)
            castleGroup.add(castle)
        }

        // set camera viewports (bg image is 3000x3000)
        const viewportW = game.config.width/2
        const viewportH = game.config.height/2
        // add( [x] [, y] [, width] [, height] [, makeMain] [, name])
        this.cam1 = this.cameras.main.setViewport(0, 0, viewportW, viewportH).setZoom(0.5)
        this.cam2 = this.cameras.add(centerX, 0, viewportW, viewportH).setZoom(0.5)
        this.cam3 = this.cameras.add(0, centerY, viewportW, viewportH).setZoom(0.5)
        this.cam4 = this.cameras.add(centerX, centerY, viewportW, viewportH).setZoom(0.5)
        // set camera bounds
        this.cam1.setBounds(0, 0, this.bgSize, this.bgSize)
        this.cam2.setBounds(0, 0, this.bgSize, this.bgSize)
        this.cam3.setBounds(0, 0, this.bgSize, this.bgSize)
        this.cam4.setBounds(0, 0, this.bgSize, this.bgSize)
        // assign camera follow target
        this.cam1.startFollow(this.copter)
        this.cam2.startFollow(this.copter)
        this.cam3.startFollow(this.copter)
        this.cam4.startFollow(this.copter)
        // set ignore groups
        this.cam1.ignore(treeGroup)
        this.cam2.ignore(houseGroup)
        this.cam3.ignore(castleGroup)

        // camera effects timer
        const FXTimer = 2500
        this.FXClock = this.time.addEvent({
            delay: FXTimer,
            callback: this.triggerCamFX,
            callbackScope: this,
            loop: true
        })

        // set up input
        cursors = this.input.keyboard.createCursorKeys()
        this.swap = this.input.keyboard.addKey('S')

        // DEBUG
        //console.log(this.cameras)
    }

    update() {
        // player input
        if(cursors.up.isDown) {
            this.copter.body.setVelocityY(-this.copterVelocity)
        } else if (cursors.down.isDown) {
            this.copter.body.setVelocityY(this.copterVelocity)
        } else {
            this.copter.body.setVelocityY(0)
        }
        if(cursors.left.isDown) {
            this.copter.body.setVelocityX(-this.copterVelocity)
            this.copter.setFlipX(true)
        } else if (cursors.right.isDown) {
            this.copter.body.setVelocityX(this.copterVelocity)
            this.copter.resetFlip()
        } else {
            this.copter.body.setVelocityX(0)
        }

        // Scene change
        if(Phaser.Input.Keyboard.JustDown(this.swap)) {
            this.scene.start("fixedControllerScene")
        }
    }

    triggerCamFX() {
        // Camera Methods
        // https://photonstorm.github.io/phaser3-docs/Phaser.Cameras.Scene2D.Camera.html

        // rotateTo(radians [, shortestPath] [, duration] [, ease] [, force] [, callback] [, context])
        let radianRotation = Phaser.Math.FloatBetween(0, 2 * Math.PI)
        this.cam1.rotateTo(radianRotation, false, 1500, "Sine.easeInOut") 
        
        // flash( [duration] [, red] [, green] [, blue] [, force] [, callback] [, context])
        let red = Phaser.Math.RND.integerInRange(0, 255)
        let green = Phaser.Math.RND.integerInRange(0, 255)
        let blue = Phaser.Math.RND.integerInRange(0, 255)
        this.cam2.flash(1000, red, green, blue, false)
        
        // zoomTo(zoom [, duration] [, ease] [, force] [, callback] [, context])
        let randomZoom = Phaser.Math.FloatBetween(0, 3)
        this.cam3.zoomTo(randomZoom, 1000, "Sine.easeInOut", false)
        
        // shake( [duration] [, intensity] [, force] [, callback] [, context])
        let randomIntensity = Phaser.Math.FloatBetween(0, 1)
        this.cam4.shake(1000, randomIntensity, false)              
    }
}