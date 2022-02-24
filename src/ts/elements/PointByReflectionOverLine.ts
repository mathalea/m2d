import { Point } from './Point'
import { Segment } from './Segment'

export class PointByReflectionOverLine extends Point {
    line: Segment
    previous: Point
    constructor (A: Point, line: Segment, { style = 'x', size = 0.15, thickness = 3, color = 'black', draggable = false, temp = false }: {style?: '' | 'x' | 'o', size?: number, thickness?: number, color?: string, draggable?: boolean, temp?: boolean} = {}) {
      let x, y
      const [a, b, c] = line.equation
      const k = 1 / (a * a + b * b)
      if (a === 0) {
        x = A.x
        y = -(A.y + (2 * c) / b)
      } else if (b === 0) {
        y = A.y
        x = -(A.x + (2 * c) / a)
      } else {
        x = k * ((b * b - a * a) * A.x - 2 * a * b * A.y - 2 * a * c)
        y = k * ((a * a - b * b) * A.y - 2 * a * b * A.x + (a * a * c) / b - b * c) - c / b
      }
      super(A.parentFigure, x, y, { style, size, thickness, color, draggable, temp })
      this.line = line
      this.previous = A
      A.addDependency(this)
      line.addDependency(this)
    }

    update (): void {
      let x, y
      const [a, b, c] = this.line.equation
      const k = 1 / (a * a + b * b)
      if (a === 0) {
        x = this.previous.x
        y = -(this.previous.y + (2 * c) / b)
      } else if (b === 0) {
        y = this.previous.y
        x = -(this.previous.x + (2 * c) / a)
      } else {
        x = k * ((b * b - a * a) * this.previous.x - 2 * a * b * this.previous.y - 2 * a * c)
        y = k * ((a * a - b * b) * this.previous.y - 2 * a * b * this.previous.x + (a * a * c) / b - b * c) - c / b
      }
      this.moveTo(x, y)
    }
}
