import Scene from "./Scene";

export default class MenuScene extends Scene {
    cacheable = true

    init():void {

    }

    activate(params?:any):void {
        
    }

    deactivate():void {
        
    }

    resize():void {
        console.log(`MenuScene: resize (${this.game.gameWidth}x${this.game.gameHeight})`)
    }

    update(delta:number):void {
        
    }
}