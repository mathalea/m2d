import { intersectionCCCoord } from '../calculus/intersection'
import { Circle } from './Circle'
import { Point, PointOptions } from './Point'

export class PointIntersectionCC extends Point {
  C1: Circle
  C2: Circle
  constructor (C1: Circle, C2: Circle, n: 1 | 2 = 1, { style = 'x', size = 0.15, thickness = 3, color = 'Gray', dragable = false, temp = false }: PointOptions = {}) {
    const [x, y] = intersectionCCCoord(C1, C2, n)
    super(C1.parentFigure, x, y, { style, thickness, color, dragable, temp })
    C1.addDependency({ element: this, type: 'intersectionCC', C: C1, C2: C2, n })
    C2.addDependency({ element: this, type: 'intersectionCC', C: C1, C2: C2, n })
  }
}
