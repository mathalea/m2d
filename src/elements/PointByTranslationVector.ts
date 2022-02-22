import { Point } from './Point'
import { Vector } from './Vector'

export class PointByTranslationVector extends Point {
    previous: Point
    vector: Vector
    constructor (A: Point, v: Vector, { style = 'x', size = 0.15, thickness = 3, color = 'black', dragable = false, temp = false }: {style?: '' | 'x' | 'o', size?: number, thickness?: number, color?: string, dragable?: boolean, temp?: boolean} = {}) {
      super(A.parentFigure, A.x + v.x, A.y + v.y, { style, size, thickness, color, dragable, temp })
      this.previous = A
      this.vector = v
      A.addDependency(this)
      v.addDependency(this)
    }

    update (): void {
      this.moveTo(this.previous.x + this.vector.x, this.previous.y + this.vector.y)
    }
}
