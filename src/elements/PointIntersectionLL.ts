import { intersectionLLCoord } from '../calculus/intersection'
import { Point, PointOptions } from './Point'
import { Segment } from './Segment'

export class PointIntersectionLL extends Point {
  L1: Segment
  L2: Segment
  n: 1 | 2
  constructor (L1: Segment, L2: Segment, { style = 'x', size = 0.15, thickness = 3, color = 'black', dragable = false, temp = false }: PointOptions = {}) {
    const [x, y] = intersectionLLCoord(L1, L2)
    super(L1.parentFigure, x, y, { style, size, thickness, color, dragable, temp })
    this.L1 = L1
    this.L2 = L2
    L1.addDependency(this)
    L2.addDependency(this)
    this.x = x
    this.y = y
  }

  update (): void {
    const [x, y] = intersectionLLCoord(this.L1, this.L2)
    console.log(x, y)
    if (x !== undefined) {
      this.moveTo(x, y)
      if (!this.isVisible) this.show()
    } else this.hide()
  }
}
