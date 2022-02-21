import { distance, randint } from '../calculus/random'
import { rotationCoord } from '../calculus/transformation'
import { angleOriented } from '../calculus/trigonometry'
import { Circle } from './Circle'
import { Point, PointOptions } from './Point'
import { PointByHomothetie } from './PointByHomothetie'

export class PointOnCircle extends Point {
  circle: Circle
  angle: number
  constructor (C: Circle, { angle = randint(-180, 180), style = 'x', size = 0.15, thickness = 3, color = 'Gray', dragable = true, temp = false }: PointOptions & {angle?: number} = {}) {
    const [x, y] = rotationCoord(C.M, C.center, angle)
    super(C.parentFigure, x, y, { dragable, style, color, size, thickness, temp })
    this.circle = C
    this.angle = angle
    C.addDependency(this)
  }

  moveTo (x: number, y: number) {
    const O = this.circle.center
    const P = new Point(this.circle.parentFigure, x, y, { temp: true })
    const M = new PointByHomothetie(P, O, this.circle.radius / distance(O, P), { temp: true })
    this.angle = this.circle.pointOnCircle ? angleOriented(this.circle.pointOnCircle, this.circle.center, M) : angleOriented(this.circle.M, this.circle.center, M)
    super.moveTo(M.x, M.y)
  }

  update (): void {
    const C = this.circle
    const [x, y] = C.pointOnCircle ? rotationCoord(C.pointOnCircle, C.center, this.angle) : rotationCoord(C.M, C.center, this.angle)
    this.moveTo(x, y)
    console.log(this.angle)
  }

  /**
   * Gère le déplacement du point sur le cercle
   * @param x abscisse du pointeur dans notre repère
   * @param y ordonnée du pointeur
   */
  notifyPointerMove (x: number, y: number) {
    if (this.dragable) {
      this.moveTo(x, y)
    }
  }
}
