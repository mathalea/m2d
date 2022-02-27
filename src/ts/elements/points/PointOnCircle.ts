/*
 * Created by Angot Rémi and Lhote Jean-Claude on 15/02/2022.
 *
 * MathALEA 2D : Software for animating online dynamic mathematics figures
 * https://coopmaths.fr
 * @Author Angot Rémi and Lhote Jean-Claude (contact@coopmaths.fr)
 * @License: GNU AGPLv3 https://www.gnu.org/licenses/agpl-3.0.html
 */

import { distance, randint } from '../../calculus/random'
import { rotationCoord } from '../../calculus/transformation'
import { angleOriented } from '../../calculus/trigonometry'
import { Circle } from '../lines/Circle'
import { Point, PointOptions } from './Point'
import { PointByHomothetie } from './PointByHomothetie'

export class PointOnCircle extends Point {
  circle: Circle
  angle: number
  constructor (C: Circle, { label, angle = randint(-180, 180), style = 'x', size = 0.15, thickness = 3, color = 'Gray', draggable = true, temp = false }: PointOptions & {angle?: number} = {}) {
    const [x, y] = rotationCoord(C.M, C.center, angle)
    super(C.parentFigure, x, y, { draggable, style, color, size, thickness, temp })
    this.circle = C
    this.angle = angle
    if (label !== undefined) this.label = label
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
  }

  /**
   * Gère le déplacement du point sur le cercle
   * @param x abscisse du pointeur dans notre repère
   * @param y ordonnée du pointeur
   */
  notifyPointerMove (x: number, y: number) {
    if (this.draggable) {
      this.moveTo(x, y)
    }
  }
}
