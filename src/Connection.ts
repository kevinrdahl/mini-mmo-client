import { PlainObject } from "./Utils/Interfaces"

type Callback = (response:PlainObject) => void

export default class Connection {
    socket?:WebSocket
    private nextRequestId = 1
    private callbacks:Map<number, Callback> = new Map()

    get connected():boolean {
        return this.socket?.readyState === WebSocket.OPEN
    }

    connect(url:string, callback?:()=>void) {
        this.disconnect()
        this.socket = new WebSocket(url)
        this.socket.addEventListener("open", () => {
            console.log("WebSocket connected")
            if (callback) callback()
        })
        this.socket.addEventListener("message", (event) => {
            console.log(`RECV ${event.data}`)
            try {
                const json = JSON.parse(event.data)
                if (typeof json === "object" && !Array.isArray(json)) {
                    if (json.id) {
                        const callback = this.callbacks.get(json.id)
                        if (callback) {
                            this.callbacks.delete(json.id)
                            callback(json)
                        }
                    }
                }
            } catch (e) {
                console.error(e)
            }
        })
        this.socket.addEventListener("close", () => {
            console.log("WebSocket closed")
        })
    }

    send(msg:string|object) {
        if (!this.socket || this.socket.readyState != WebSocket.OPEN) return
        if (typeof msg !== "string") msg = JSON.stringify(msg)
        console.log(`SEND ${msg}`)
        this.socket.send(msg)
    }

    disconnect() {
        if (this.socket) {
            if (this.socket.readyState == WebSocket.OPEN) this.socket.close()
            this.socket = undefined
        }
    }

    async request(type:string, params:PlainObject):Promise<PlainObject> {
        params.type = type
        params.id = this.nextRequestId++

        return new Promise((resolve, reject) => {
            this.callbacks.set(params.id, (response) => {
                resolve(response)
            })
            try {
                this.send(params)
            } catch (e) {
                reject(e)
            }
        })
    }
}