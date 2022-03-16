/*
 * Created by Angot Rémi and Lhote Jean-Claude on 15/02/2022.
 *
 * MathALEA 2D : Software for animating online dynamic mathematics figures
 * https://coopmaths.fr
 * @Author Angot Rémi and Lhote Jean-Claude (contact@coopmaths.fr)
 * @License: GNU AGPLv3 https://www.gnu.org/licenses/agpl-3.0.html
 */

import { randint } from '../../calculus/random'
import { Circle } from '../lines/Circle'
import { Angle } from '../measures/Angle'
import { Coords } from '../others/Coords'
import { Point, PointOptions } from './Point'
import { PointByHomothetie } from './PointByHomothetie'

export class PointOnCircle extends Point {
  circle: Circle
  angle: number
  constructor (C: Circle, { label, angle = randint(-180, 180), style = 'x', size = 0.15, thickness = 3, color = 'Gray', draggable = true, temp = false }: PointOptions & {angle?: number} = {}) {
    const coords = Coords.rotationCoord(C.M, C.center, angle)
    super(C.parentFigure, coords.x, coords.y, { draggable, style, color, size, thickness, temp })
    this.circle = C
    this.angle = angle
    if (label !== undefined) this.label = label
    C.addChild(this)
  }

  moveTo (x: number, y: number) {
    try {
      const O = this.circle.center
      const P = new Point(this.circle.parentFigure, x, y, { temp: true })
      const M = new PointByHomothetie(P, O, this.circle.radius / Point.distance(O, P), { temp: true })
      this.angle = this.circle.pointOnCircle ? Angle.angleOriented(this.circle.pointOnCircle, this.circle.center, M) : Angle.angleOriented(this.circle.M, this.circle.center, M)
      super.moveTo(M.x, M.y)
    } catch (error) {
      console.log('Erreur dans PointOnCircle.moveTo()', error)
      this.exist = false
    }
  }

  update (): void {
    try {
      const C = this.circle
      const coords = C.pointOnCircle ? Coords.rotationCoord(C.pointOnCircle, C.center, this.angle) : Coords.rotationCoord(C.M, C.center, this.angle)
      this.moveTo(coords.x, coords.y)
    } catch (error) {
      console.log('Erreur dans PointOnCircle.update()', error)
      this.exist = false
    }
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
