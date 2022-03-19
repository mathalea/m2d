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
import { Const } from '../measures/Const'
import { Measure } from '../measures/Measure'
import { Coords } from '../others/Coords'
import { Point, PointOptions } from './Point'
import { PointByHomothetie } from './PointByHomothetie'
/**
 * Crée un point sur le cercle C.
 * si un angle est précisé, alors il détermine l'azimut du point sur le cercle.
 */
export class PointOnCircle extends Point {
  circle: Circle
  angle: Measure
  constructor (C: Circle, { label, angle = randint(-180, 180), style = 'x', size = 0.15, thickness = 3, color = 'Gray', draggable = true, temp = false }: PointOptions & {angle?: number|Measure} = {}) {
    super(C.parentFigure, 0, 0, { draggable, style, color, size, thickness, temp })
    if (typeof angle === 'number') this.angle = new Const(C.parentFigure, angle)
    else {
      this.angle = angle
      angle.addChild(this)
    }
    const coords = Coords.rotationCoord(C.M, C.center, this.angle.value)
    this.x = coords.x
    this.y = coords.y
    this.circle = C
    if (label !== undefined) this.label = label
    C.addChild(this)
  }

  moveTo (x: number, y: number) {
    try {
      const O = this.circle.center
      const P = new Point(this.circle.parentFigure, x, y, { temp: true })
      const M = new PointByHomothetie(P, O, this.circle.radius / Point.distance(O, P), { temp: true })
      this.angle.value = this.circle.pointOnCircle ? Angle.angleOriented(this.circle.pointOnCircle, this.circle.center, M) : Angle.angleOriented(this.circle.M, this.circle.center, M)
      super.moveTo(M.x, M.y)
    } catch (error) {
      console.log('Erreur dans PointOnCircle.moveTo()', error)
      this.exist = false
    }
  }

  update (): void {
    try {
      const C = this.circle
      const coords = C.pointOnCircle ? Coords.rotationCoord(C.pointOnCircle, C.center, this.angle.value) : Coords.rotationCoord(C.M, C.center, this.angle.value)
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
