import { orthogonalProjectionCoord } from '../../calculus/transformation'
import { Line } from '../lines/Line'
import { Point, PointOptions } from './Point'

export class PointByProjection extends Point {
    previous: Point // Antécédent
    line: Line // Droite sur laquelle s'effectue la projection
    constructor (A: Point, L: Line, { label, style = 'x', size = 0.15, thickness = 3, color = 'black', draggable = false, temp = false }: PointOptions = {}) {
      const [x, y] = orthogonalProjectionCoord(A, L)
      super(A.parentFigure, x, y, { label, style, size, thickness, color, draggable, temp })
      this.previous = A
      this.line = L
      A.addDependency(this)
      L.addDependency(this)
    }

    update (): void {
      const [x, y] = orthogonalProjectionCoord(this.previous, this.line)
      this.moveTo(x, y)
    }
}
