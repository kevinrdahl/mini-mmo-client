import { Container } from "pixi.js";
import { MessageCallback } from "../Connection";
import MMOGame from "../MMOGame";
import { PlainObject } from "../Utils";

export default abstract class Scene extends Container {
    abstract cacheable:boolean
    
    game:MMOGame
    /**
     * Callbacks to be registered and unregistered with the Connection, by MMOGame.
     * Set callbacks here to be called only when the scene is active.
     * (Callbacks are registered before activate is called.)
     */
    messageCallbacks = new Map<string, MessageCallback>()

    constructor(game:MMOGame) {
        super()
        this.game = game
    }

    abstract init():void

    abstract activate(params?:any):void

    abstract deactivate():void

    abstract resize(width:number, height:number):void

    abstract update(delta:number):void
}