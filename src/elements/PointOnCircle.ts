import { intersectionLCCoord } from '../calculus/intersection'
import { randint } from '../calculus/random'
import { Circle } from './Circle'
import { Point, PointOptions } from './Point'
import { Segment } from './Segment'

export class PointOnCircle extends Point {
  circle : Circle
  constructor (C: Circle, { angle = randint(-180, 180), style = 'x', size = 0.15, thickness = 3, color = 'Gray', dragable = true, temp = false }: PointOptions & {angle?: number} = {}) {
    const angleRadian = angle * Math.PI / 180
    const x = C.center.x + C.radius * Math.cos(angleRadian)
    const y = C.center.y + C.radius * Math.sin(angleRadian)
    super(C.parentFigure, x, y)
    this.circle.addDependency({ element: this, type: 'pointOnCircle' })
  }

  /**
   * Gère le déplacement du point sur le cercle
   * @param x abscisse du pointeur dans notre repère
   * @param y ordonnée du pointeur
   */
  notifyPointerMove (x: number, y: number) {
    if (this.dragable) {
      const O = this.circle.center
      const P = new Point(this.circle.parentFigure, x, y, { temp: true })
      const L = new Segment(O, P, { temp: true })
      const [xM, yM] = intersectionLCCoord(L, this.circle, (P.y > O.y) ? 1 : 2)
      this.moveTo(xM, yM)
    }
  }
}
