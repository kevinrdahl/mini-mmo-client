import { Text } from "pixi.js";
import { GetQueryParam } from "../../Utils";
import PlayScene from "./PlayScene";
import Scene from "../Scene";

export default class MenuScene extends Scene {
    cacheable = true
    statusText:Text = new Text("Connecting...", {fill:0xffffff})

    init():void {
        this.addChild(this.statusText)
        this.messageCallbacks.set("setRoom", (msg) => {
            console.log("MenuScene: go to room", msg.room)
            this.game.setScene(PlayScene, msg)
        })
    }

    activate(params?:any):void {
        if (!this.game.connection.connected) {
            this.game.connection.connect("ws://localhost:9000", () => { this.login() })
        } else {
            this.login()
        }
    }

    deactivate():void {
        
    }

    resize(width:number, height:number):void {
        console.log(`MenuScene: resize (${this.game.gameWidth}x${this.game.gameHeight})`)
    }

    update(delta:number):void {
        
    }

    private async login() {
        const username = ""+GetQueryParam("username", "aaa")
        let response = await this.game.connection.request("accountCreate", {
            username:username,
            password:username
        })

        response = await this.game.connection.request("accountLogin", {
            username:username,
            password:username,
            worldId:1
        })

        let characterId = -1
        if (response.characters.length > 0) {
            characterId = response.characters[0].id
        } else {
            response = await this.game.connection.request("characterCreate", {})
            characterId = response.character.id
        }

        response = await this.game.connection.request("characterLogin", {
            characterId: characterId
        })
    }
}