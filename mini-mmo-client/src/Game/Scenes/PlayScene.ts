import { Point } from "@pixi/math";
import { PlainObject } from "../../Utils";
import Scene from "../Scene";
import Unit from "../Unit";

export default class RoomScene extends Scene {
    cacheable = false
    roomData?:PlainObject
    ownUnit?:Unit

    units = new Map<number, Unit>()
    movementInput:Point = new Point

    init(): void {
        this.messageCallbacks.set("addUnit", (msg) => {
            const unit = Unit.fromDescription(msg.unit)
            this.addUnit(unit)
        })

        this.messageCallbacks.set("removeUnit", (msg) => {
            this.removeUnit(parseInt(msg.unitId))
        })

        this.messageCallbacks.set("update", (msg) => {
            if (msg.units) {
                for (const [strId, update] of Object.entries<any>(msg.units)) {
                    const unitId = parseInt(strId)
                    const unit = this.units.get(unitId)
                    if (unit) {
                        if (update.movement) unit.movement.set(update.movement[0], update.movement[1])
                        if (update.position) {
                            unit.position.set(update.position[0], update.position[1])
                            if (unit.sprite) unit.sprite.position.copyFrom(unit.position)
                        }
                        if (update.facing !== undefined) unit.facing = update.facing
                    }
                }
            }
        })
    }

    activate(params?: any): void {
        if (params.room) {
            this.roomData = params.room
            for (let unitDesc of params.room.units) {
                const unit = Unit.fromDescription(unitDesc)
                this.addUnit(unit)
                if (unit.id === params.unitId) this.ownUnit = unit
            }
        }
    }

    deactivate(): void {
        
    }

    resize(width: number, height: number): void {
        
    }
    
    update(delta: number): void {
        for (const [id, unit] of this.units) {
            unit.position.set(unit.position.x + unit.movement.x * 100 * delta, unit.position.y + unit.movement.y * 100 * delta)
            if (unit.sprite) {
                unit.sprite.position.copyFrom(unit.position)
            }
        }

        const input = new Point()
        if (this.game.keys.isKeyDown("ArrowLeft")) input.x -= 1
        if (this.game.keys.isKeyDown("ArrowRight")) input.x += 1
        if (this.game.keys.isKeyDown("ArrowUp")) input.y -= 1
        if (this.game.keys.isKeyDown("ArrowDown")) input.y += 1

        if (input.x != 0 && input.y != 0) {
            input.x /= Math.SQRT2
            input.y /= Math.SQRT2
        }

        if (!input.equals(this.movementInput)) {
            this.movementInput = input
            this.game.connection.send({
                type: "move",
                movement: [input.x, input.y]
            })
        }
    }

    addUnit(unit:Unit) {
        this.units.set(unit.id, unit)
        
        if (unit.sprite) {
            this.addChild(unit.sprite)
            unit.sprite.position.copyFrom(unit.position)
        }
    }

    removeUnit(unitId:number) {
        const unit = this.units.get(unitId)
        if (unit) {
            this.units.delete(unitId)

            if (unit.sprite && unit.sprite.parent == this) {
                this.removeChild(unit.sprite)
            }
        }
    }
}