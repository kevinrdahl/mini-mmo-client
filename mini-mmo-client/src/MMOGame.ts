import { Application } from "pixi.js";
import MenuScene from "./Game/MenuScene";
import Scene from "./Game/Scene";

export default class MMOGame extends Application {
    static baseWidth = 576
    static baseHeight = 360

    gameWidth = MMOGame.baseWidth
    gameHeight = MMOGame.baseHeight
    activeScene?:Scene
    cachedScenes = new Map<string, Scene>()

    constructor() {
        super({
            "antialias":false,
            "autoStart":true
        })

        this.setScene(MenuScene)
    }

    onResize(gameWidth:number, gameHeight:number) {
        this.gameWidth = gameWidth
        this.gameHeight = gameHeight

        if (this.activeScene) this.activeScene.resize()
    }

    setScene(type?:new(game:MMOGame)=>Scene, activateParams?:any) {
        if (this.activeScene) {
            this.stage.removeChild(this.activeScene)
            this.activeScene.deactivate()
            this.activeScene = undefined
        }

        if (type) {
            let scene:Scene
            if (this.cachedScenes.has(type.name)) {
                scene = this.cachedScenes.get(type.name)!
            } else {
                scene = new type(this)
                scene.init()
                if (scene.cacheable) this.cachedScenes.set(type.name, scene)
            }

            this.activeScene = scene
            this.stage.addChild(scene)
            scene.activate(activateParams)
        }
    }
}