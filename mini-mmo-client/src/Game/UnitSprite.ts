import { Container, Graphics } from "pixi.js";

export default class UnitSprite extends Container {
    box:Graphics = new Graphics()

    constructor() {
        super()
        this.box.beginFill(0xff0000)
        this.box.drawRect(0, 0, 16, 16)
        this.box.endFill()
        this.addChild(this.box)
        this.box.position.set(-8, -8)
    }
}