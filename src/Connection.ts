export default class Connection {
    socket?:WebSocket

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
}