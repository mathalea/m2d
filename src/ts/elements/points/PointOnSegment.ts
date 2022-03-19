/*
 * Created by Angot Rémi and Lhote Jean-Claude on 15/02/2022.
 *
 * MathALEA 2D : Software for animating online dynamic mathematics figures
 * https://coopmaths.fr
 * @Author Angot Rémi and Lhote Jean-Claude (contact@coopmaths.fr)
 * @License: GNU AGPLv3 https://www.gnu.org/licenses/agpl-3.0.html
 */

import { Point, PointOptions } from './Point'
import { PointOnLine } from './PointOnLine'
import { Segment } from '../lines/Segment'
import { Measure } from '../measures/Measure'
import { Coords } from '../others/Coords'
import { Const } from '../measures/Const'
/**
 * Crée un point sur le segment L.
 * Si length est précisé et si la longeur du segment est supérieure à length, alors le point est situé à cette distance length de L.A
 */
export class PointOnSegment extends PointOnLine {
  constructor (L: Segment, { label, length, style = 'x', size = 0.15, thickness = 3, color = 'Gray', draggable = true, temp = false }: { length?: number | Measure } & PointOptions = {}) {
    super(L, { length, style, size, thickness, color, draggable, temp })
    const Llength = Point.distance(L.A, L.B)
    if (!(length instanceof Measure)) {
      this.length = new Const(L.parentFigure, length === undefined ? length = Llength / 2 : length < 0 ? 0 : Math.min(length, Llength))
    } else {
      this.length = length
      if (this.length.value > Llength) this.length.value = Llength
      if (this.length.value < 0) this.length.value = 0
    }
    this.size = size
    this.style = style
    this.thickness = thickness
    this.color = color
    this.draggable = draggable
    this.temp = temp
    if (label !== undefined) this.label = label
    this.k.value = (length instanceof Measure ? length.value : length) / Llength
    this.update()
  }

  moveTo (x: number, y: number) {
    try {
      const L = this.line
      const P = { x, y }
      const M = Coords.orthogonalProjectionCoord(P, L)
      const [A, B] = [this.line.A, this.line.B]
      if (M.x < Math.min(A.x, B.x) || M.x > Math.max(A.x, B.x) || M.y < Math.min(A.y, B.y) || M.y > Math.max(A.y, B.y)) return
      this.k.value = (L.B.x - L.A.x) === 0 ? (L.B.y - L.A.y) === 0 ? this.k.value : (M.y - L.A.y) / (L.B.y - L.A.y) : (M.x - L.A.x) / (L.B.x - L.A.x)
      this.length.value = this.k.value * Point.distance(L.A, L.B)
      super.moveTo(M.x, M.y)
    } catch (error) {
      console.log('Erreur dans PointOnSegment.moveTo()', error)
      this.exist = false
    }
  }
}
