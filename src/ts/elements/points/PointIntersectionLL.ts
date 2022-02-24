import { intersectionLLCoord } from '../../calculus/intersection'
import { Point, PointOptions } from './Point'
import { Segment } from '../lines/Segment'

export class PointIntersectionLL extends Point {
  L1: Segment
  L2: Segment
  n: 1 | 2
  constructor (L1: Segment, L2: Segment, { label, style = 'x', size = 0.15, thickness = 3, color = 'black', draggable = false, temp = false }: PointOptions = {}) {
    const [x, y] = intersectionLLCoord(L1, L2)
    super(L1.parentFigure, x, y, { style, size, thickness, color, draggable, temp })
    this.L1 = L1
    this.L2 = L2
    if (label !== undefined) this.label = label
    L1.addDependency(this)
    L2.addDependency(this)
    this.x = x
    this.y = y
  }

  update (): void {
    const [x, y] = intersectionLLCoord(this.L1, this.L2)
    if (x !== undefined) {
      this.moveTo(x, y)
      if (!this.isVisible) this.show()
    } else this.hide()
  }
}
