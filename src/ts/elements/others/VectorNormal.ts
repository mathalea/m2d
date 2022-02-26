import { Line } from '../lines/Line'
import { Vector } from './Vector'

export class VectorNormal extends Vector {
    line: Line
    constructor (L: Line) {
      const [x, y] = [L.normal.x, L.normal.y]
      super(L.parentFigure, x, y)
      this.line = L
      L.addDependency(this)
    }

    update (): void {
      [this.x, this.y] = [this.line.normal.x, this.line.normal.y]
    }
}
