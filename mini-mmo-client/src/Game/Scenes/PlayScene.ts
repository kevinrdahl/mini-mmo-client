import { PlainObject } from "../../Utils";
import Scene from "../Scene";
import Unit from "../Unit";

export default class RoomScene extends Scene {
    cacheable = false
    roomData?:PlainObject
    ownUnit?:Unit

    units = new Map<number, Unit>()

    init(): void {
        
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
        
    }


    addUnit(unit:Unit) {
        this.units.set(unit.id, unit)
        
        if (unit.sprite) {
            this.addChild(unit.sprite)
            unit.sprite.position.copyFrom(unit.position)
        }
    }
}