import Connection from "./Connection";

export default class MMOGame extends Phaser.Game {
    connection = new Connection()

    constructor(options?:Phaser.Types.Core.GameConfig) {
        super(options)
    }
}