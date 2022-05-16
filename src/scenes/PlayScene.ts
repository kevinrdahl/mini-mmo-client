export default class PlayScene extends Phaser.Scene {
    testSprite?: Phaser.GameObjects.Sprite

    constructor() {
        super("PlayScene")
    }

    preload() {
        this.load.spritesheet("Human", "assets/Human.png", {
            frameWidth: 32,
            frameHeight: 32
        })
        this.load.spritesheet("Orc", "assets/Orc.png", {
            frameWidth: 32,
            frameHeight: 32
        })
        this.load.spritesheet("Floor", "assets/Floor.png", {
            frameWidth: 8,
            frameHeight: 8
        })
        this.load.spritesheet("Wall", "assets/Wall.png", {
            frameWidth: 8,
            frameHeight: 8
        })
    }

    generateAnimations() {
        const toGenerate = {
            "walk":{
                dirs:4,
                frames:4,
                row:21
            },
            "jump":{
                dirs:4,
                frames:4,
                row:15
            },
            "idle":{
                dirs:4,
                frames:16,
                row:11
            }
        }

        const frameRate = 6
        for (const sprite of ["Human", "Orc"]) {
            for (const [animation, info] of Object.entries(toGenerate)) {
                if (info.dirs == 1) {
                    this.anims.create({
                        key: `${sprite}/${animation}`,
                        frames: this.anims.generateFrameNumbers(sprite, {start:info.row*16, end: info.row*16+info.frames-1}),
                        frameRate: frameRate,
                        repeat: -1
                    })
                } else {
                    for (let i = 0; i < info.dirs; i++) {
                        const direction = ["right", "left", "upright", "upleft"][i]
                        const row = info.row + i
                        this.anims.create({
                            key: `${sprite}/${animation}/${direction}`,
                            frames: this.anims.generateFrameNumbers(sprite, {start:row*16, end: row*16+info.frames-1}),
                            frameRate: frameRate,
                            repeat: -1
                        })
                    }
                }
            }
        }
    }

    create() {
        this.generateAnimations()
        this.testSprite = this.add.sprite(100, 100, "Human").setScale(3, 3)
        this.testSprite.anims.play("Human/idle/right")
    }

    update(time:number, delta:number) {

    }
}