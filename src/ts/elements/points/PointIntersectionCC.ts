import { intersectionCCCoord } from '../../calculus/intersection'
import { Circle } from '../lines/Circle'
import { Point, PointOptions } from './Point'

export class PointIntersectionCC extends Point {
  C1: Circle
  C2: Circle
  n: 1 | 2
  constructor (C1: Circle, C2: Circle, n: 1 | 2 = 1, { label, style = 'x', size = 0.15, thickness = 3, color = 'black', draggable = false, temp = false }: PointOptions = {}) {
    const [x, y] = intersectionCCCoord(C1, C2, n)
    super(C1.parentFigure, x, y, { style, size, thickness, color, draggable, temp })
    this.C1 = C1
    this.C2 = C2
    this.n = n
    if (label !== undefined) this.label = label
    C1.addDependency(this)
    C2.addDependency(this)
  }

  update (): void {
    const [x, y] = intersectionCCCoord(this.C1, this.C2, this.n)
    if (x !== undefined) {
      this.moveTo(x, y)
      if (!this.isVisible) this.show()
    } else this.hide()
  }
}
