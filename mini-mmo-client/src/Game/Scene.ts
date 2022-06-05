import { Container } from "pixi.js";
import MMOGame from "../MMOGame";

export default abstract class Scene extends Container {
    game:MMOGame
    abstract cacheable:boolean

    constructor(game:MMOGame) {
        super()
        this.game = game
    }

    abstract init():void

    abstract activate(params?:any):void

    abstract deactivate():void

    abstract resize():void

    abstract update(delta:number):void
}