import MMOGame from "./MMOGame"

export default class KeyManager {
    keyStates = new Map<string, boolean>()
    game:MMOGame

    constructor(game:MMOGame) {
        this.game = game
    }

    init() {
        window.onkeydown = (e) => {
            //TODO: if a text input element has focus, send it the value of the key
            this.keyStates.set(e.code, true)
        }

        window.onkeyup = (e) => {
            this.keyStates.set(e.code, false)
        }
    }

    isKeyDown(code:string):boolean {
        let value = this.keyStates.get(code)
        if (value !== undefined) return value
        return false
    }
}