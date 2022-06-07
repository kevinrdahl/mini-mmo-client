import { Application } from "pixi.js";
import Connection from "./Connection";
import MenuScene from "./Game/Scenes/MenuScene";
import Scene from "./Game/Scene";
import KeyManager from "./KeyManager";

export default class MMOGame extends Application {
    static baseWidth = 576
    static baseHeight = 360

    gameWidth = MMOGame.baseWidth
    gameHeight = MMOGame.baseHeight
    connection = new Connection()
    keys = new KeyManager(this)

    private activeScene?:Scene
    private cachedScenes = new Map<string, Scene>()

    constructor() {
        super({
            "antialias":false,
            "autoStart":true
        })

        this.keys.init()
        this.setScene(MenuScene)

        this.ticker.add(() => {
            if (this.activeScene) this.activeScene.update(this.ticker.deltaMS / 1000)
        })
        this.ticker.start()
    }

    onResize(gameWidth:number, gameHeight:number) {
        this.gameWidth = gameWidth
        this.gameHeight = gameHeight

        if (this.activeScene) this.activeScene.resize(gameWidth, gameHeight)
    }

    setScene(type?:new(game:MMOGame)=>Scene, activateParams?:any) {
        if (this.activeScene) {
            for (const [msgType, callback] of this.activeScene.messageCallbacks.entries()) {
                this.connection.unregister(msgType, callback)
            }

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

            for (const [msgType, callback] of this.activeScene.messageCallbacks.entries()) {
                this.connection.register(msgType, callback)
            }

            scene.activate(activateParams)
        }
    }
}