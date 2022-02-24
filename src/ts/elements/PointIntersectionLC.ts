import { intersectionLCCoord } from '../calculus/intersection'
import { Circle } from './Circle'
import { Point, PointOptions } from './Point'
import { Segment } from './Segment'

export class PointIntersectionLC extends Point {
  L: Segment
  C: Circle
  n: 1 | 2
  constructor (L: Segment, C: Circle, n: 1 | 2 = 1, { label, style = 'x', size = 0.15, thickness = 3, color = 'black', draggable = false, temp = false }: PointOptions = {}) {
    const [x, y] = intersectionLCCoord(L, C, n)
    super(L.parentFigure, x, y, { style, size, thickness, color, draggable, temp })
    this.L = L
    this.C = C
    this.n = n
    if (label !== undefined) this.label = label
    L.addDependency(this)
    C.addDependency(this)
  }

  update (): void {
    const [x, y] = intersectionLCCoord(this.L, this.C, this.n)
    if (x !== undefined) {
      this.moveTo(x, y)
      if (!this.isVisible) this.show()
    } else this.hide()
  }
}
