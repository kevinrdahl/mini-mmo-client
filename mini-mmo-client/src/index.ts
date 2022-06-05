import MMOGame from "./MMOGame";

const game = new MMOGame()
document.body.appendChild(game.view)
document.body.onresize = onDocumentResize
onDocumentResize()

function onDocumentResize() {
    const width = window.innerWidth
    const height = window.innerHeight

    const globalScale = Math.max(1, Math.floor(Math.min(width / MMOGame.baseWidth, height / MMOGame.baseHeight)))

    const gameWidth = Math.floor(width / globalScale)
    const gameHeight = Math.floor(height / globalScale)
    
    game.stage.scale.set(globalScale)
    game.renderer.resize(gameWidth * globalScale, gameHeight * globalScale)
    game.onResize(gameWidth, gameHeight)

    //const remainingWidth = width - game.renderer.width
    //const remainingHeight = height - game.renderer.height
}