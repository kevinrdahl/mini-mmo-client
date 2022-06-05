import { PlainObject } from "../Utils/Interfaces"
import Unit from "./Unit"

export default class PlayScene extends Phaser.Scene {
    testSprite?: Phaser.GameObjects.Sprite

    roomData?:PlainObject
    units = new Map<number, Unit>()
    ownUnit?:Unit

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

    private _generated = false
    generateAnimations() {
        if (this._generated) return
        this._generated = true

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

        if (this.roomData) {
            for (const unitDesc of this.roomData.room.units) {
                const unit = Unit.fromDescription(unitDesc)
                this.addUnit(unit)
            }
    
            if (this.roomData.unitId) {
                const unit = this.units.get(this.roomData.unitId)
                if (unit) this.ownUnit = unit
            }
        }
    }

    init(data:PlainObject) {
        this.roomData = data
    }

    addUnit(unit:Unit) {
        this.units.set(unit.id, unit)
        
        unit.sprite = this.add.sprite(100, 100, "Human").setScale(3, 3)
        unit.sprite.anims.play("Human/idle/right")
        unit.sprite.setPosition(unit.position.x, unit.position.y)
    }

    removeUnit(unit:Unit) {
        this.units.delete(unit.id)
        if (unit.sprite) {
            unit.sprite.destroy()
        }
        if (unit === this.ownUnit) this.ownUnit = undefined
    }

    update(time:number, delta:number) {
        
    }
}