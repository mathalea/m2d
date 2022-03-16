/*
 * Created by Angot Rémi and Lhote Jean-Claude on 15/02/2022.
 *
 * MathALEA 2D : Software for animating online dynamic mathematics figures
 * https://coopmaths.fr
 * @Author Angot Rémi and Lhote Jean-Claude (contact@coopmaths.fr)
 * @License: GNU AGPLv3 https://www.gnu.org/licenses/agpl-3.0.html
 */

import { distance } from '../../calculus/random'
import { orthogonalProjectionCoord } from '../../calculus/transformation'
import { PointOptions } from './Point'
import { PointOnLine } from './PointOnLine'
import { Segment } from '../lines/Segment'
import { Measure } from '../measures/Measure'

export class PointOnSegment extends PointOnLine {
  constructor (L: Segment, { label, length, style = 'x', size = 0.15, thickness = 3, color = 'Gray', draggable = true, temp = false }: { length?: number | Measure } & PointOptions = {}) {
    const Llength = distance(L.A, L.B)
    if (!(length instanceof Measure)) {
      length = length === undefined ? length = Llength / 2 : length < 0 ? 0 : Math.min(length, Llength)
    } else {
      if (length.value > Llength) length.value = Llength
      if (length.value < 0) length.value = 0
    }
    super(L, { length, style, size, thickness, color, draggable, temp })
    this.size = size
    this.style = style
    this.thickness = thickness
    this.length = length
    this.color = color
    this.draggable = draggable
    this.temp = temp
    if (label !== undefined) this.label = label
    this.k = (length instanceof Measure ? length.value : length) / Llength
    this.update()
  }

  moveTo (x: number, y: number) {
    try {
      const L = this.line
      const P = { x, y }
      const M = orthogonalProjectionCoord(P, L)
      const [A, B] = [this.line.A, this.line.B]
      if (M.x < Math.min(A.x, B.x) || M.x > Math.max(A.x, B.x) || M.y < Math.min(A.y, B.y) || M.y > Math.max(A.y, B.y)) return
      this.k = (L.B.x - L.A.x) === 0 ? (L.B.y - L.A.y) === 0 ? this.k : (M.y - L.A.y) / (L.B.y - L.A.y) : (M.x - L.A.x) / (L.B.x - L.A.x)
      if (this.length instanceof Measure) this.length.value = this.k * distance(L.A, L.B)
      else this.length = this.k * distance(L.A, L.B)
      super.moveTo(M.x, M.y)
    } catch (error) {
      console.log('Erreur dans PointOnSegment.moveTo()', error)
      this.exist = false
    }
  }
}
