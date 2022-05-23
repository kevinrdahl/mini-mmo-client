import { PlainObject } from "../Utils/Interfaces";

export default class Unit {
    id:number
    position = new Phaser.Math.Vector2()
    movement = new Phaser.Math.Vector2()
    facing = 0

    sprite?:Phaser.GameObjects.Sprite

    constructor(id:number) {
        this.id = id
    }

    static fromDescription(desc:PlainObject):Unit {
        const unit = new Unit(desc.id)
        unit.position.set(desc.position[0], desc.position[1])
        unit.movement.set(desc.movement[0], desc.movement[1])
        unit.facing = desc.facing

        return unit
    }
}