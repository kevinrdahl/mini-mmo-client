import Phaser from "phaser";
import config from "../config";
import MMOGame from "../MMOGame"

export default class MenuScene extends Phaser.Scene {
	private statusText?:Phaser.GameObjects.Text
	
	public get mmoGame():MMOGame { return this.game as MMOGame }

	constructor() {
		super("MenuScene")
	}

	preload() {
		this.load.image("logo", "assets/phaser3-logo.png")
	}

	create() {
		const logo = this.add.image(config.scale.width/2, 100, "logo")
		this.statusText = this.add.text(config.scale.width/2, 250, "Connecting...", {
			fontFamily: "Courier New",
			fontSize: "64px",
			align: "center"
		}).setOrigin(0.5)

		const game = this.mmoGame
		game.connection.connect("ws://localhost:9000", async () => {
			this.statusText?.setText("Connected!")

			let response = await game.connection.request("accountCreate", {
				username: "aaa",
				password: "aaa"
			})

			response = await game.connection.request("accountLogin", {
				username: "aaa",
				password: "aaa",
				worldId: 1
			})

			let characterId = -1

			if (response.characters.length > 0) {
				characterId = response.characters[0].id
			} else {
				response = await game.connection.request("characterCreate", {})
				characterId = response.character.id
			}

			await game.connection.request("characterLogin", {
				characterId:characterId
			})
		})

		game.connection.register("setRoom", (msg) => {
			if (msg.room) this.scene.start("PlayScene", msg)
		})

		/*this.tweens.add({
			targets: logo,
			y: 350,
			duration: 1500,
			ease: "Sine.inOut",
			yoyo: true,
			repeat: -1
		});*/
	}

	update(time: number, delta: number): void {
		//console.log("MENU")
	}
}
