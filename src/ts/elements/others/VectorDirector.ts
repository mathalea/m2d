import { Line } from '../lines/Line'
import { Vector } from './Vector'

export class VectorDirector extends Vector {
    line: Line
    constructor(L: Line) {
        const [x, y] = [L.directeur.x, L.directeur.y]
        super(L.parentFigure, x, y)
        this.line = L
        L.addDependency(this)
    }

    update(): void {
        [this.x, this.y] = [this.line.directeur.x, this.line.directeur.y]
        this.notifyAllDependencies()
    }
}
