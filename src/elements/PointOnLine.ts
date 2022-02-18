import { intersectionSCCoord } from '../calculus/intersection'
import { distance, randint } from '../calculus/random'
import { orthogonalProjectionCoord } from '../calculus/transformation'
import { Circle } from './Circle'
import { Point, PointOptions } from './Point'
import { Segment } from './Segment'

export class PointOnLine extends Point {
  line : Segment
  length: number
  constructor (L: Segment, { length, style = 'x', size = 0.15, thickness = 3, color = 'Gray', dragable = true, temp = false }: {length?: number} & PointOptions = {}) {
    const Llength = distance(L.ends[0], L.ends[1])
    length = (length === undefined) ? randint(15, 85) * Llength / 100 : length
    const C = new Circle(L.ends[0], length, { temp: true })
    const [Mx, My] = intersectionSCCoord(L, C)
    super(L.parentFigure, Mx, My, { style, size, thickness, color, dragable, temp })
    this.x = Mx
    this.y = My
    this.line = L
    this.line.addDependency({ element: this, type: 'pointOnLine', C: C })
  }

  /**
   * Gère le déplacement du point le long de la droite
   * @param x
   * @param y
   */
  notifyPointerMove (x: number, y: number) {
    if (this.dragable) {
      const P = new Point(this.line.parentFigure, x, y, { temp: true })
      const [xM, yM] = orthogonalProjectionCoord(P, this.line)
      this.moveTo(xM, yM)
    }
  }
}
