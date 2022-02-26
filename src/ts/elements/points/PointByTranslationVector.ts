import { Point, PointOptions } from './Point'
import { Vector } from '../others/Vector'
import { VectorByPoints } from '../others/VectorByPoints'

export class PointByTranslationVector extends Point {
    previous: Point
    vector: Vector | VectorByPoints
    constructor (A: Point, v: Vector | VectorByPoints, { label, style = 'x', size = 0.15, thickness = 3, color = 'black', draggable = false, temp = false }: PointOptions = {}) {
      super(A.parentFigure, A.x + v.x, A.y + v.y, { style, size, thickness, color, draggable, temp })
      this.previous = A
      this.vector = v
      if (label !== undefined) this.label = label
      A.addDependency(this)
      v.addDependency(this)
    }

    update (): void {
      this.moveTo(this.previous.x + this.vector.x, this.previous.y + this.vector.y)
    }
}
