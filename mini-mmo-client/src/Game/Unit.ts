import { Point } from "pixi.js";
import { PlainObject } from "../Utils";
import UnitSprite from "./UnitSprite";

export default class Unit {
    id:number
    position = new Point()
    movement = new Point()
    facing = 0

    sprite?:UnitSprite

    constructor(id:number) {
        this.id = id
    }

    static fromDescription(desc:PlainObject):Unit {
        const unit = new Unit(desc.id)
        unit.position.set(desc.position[0], desc.position[1])
        unit.movement.set(desc.movement[0], desc.movement[1])
        unit.facing = desc.facing

        unit.sprite = new UnitSprite()

        return unit
    }
}