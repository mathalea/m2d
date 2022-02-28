/*
 * Created by Angot Rémi and Lhote Jean-Claude on 15/02/2022.
 *
 * MathALEA 2D : Software for animating online dynamic mathematics figures
 * https://coopmaths.fr
 * @Author Angot Rémi and Lhote Jean-Claude (contact@coopmaths.fr)
 * @License: GNU AGPLv3 https://www.gnu.org/licenses/agpl-3.0.html
 */

import { distance, randint } from '../../calculus/random'
import { orthogonalProjectionCoord } from '../../calculus/transformation'
import { Point, PointOptions } from './Point'
import { Segment } from '../lines/Segment'

export class PointOnLine extends Point {
  line: Segment
  length: number // valeur signée (mesure algébrique de A à M)
  k: number
  constructor (L: Segment, { label, k, length, style = 'x', size = 0.15, thickness = 3, color = 'Gray', draggable = true, temp = false }: { length?: number, k?: number } & PointOptions = {}) {
    const Llength = distance(L.A, L.B)
    length = (length === undefined) ? randint(15, 85) * Llength / 100 : length
    k = k || Llength === 0 ? 0.5 : length / Llength // Evitons la division par zéro avec le milieu d'un segment nul.
    const [Mx, My] = [(1 - k) * L.A.x + k * L.B.x, (1 - k) * L.A.y + k * L.B.y]
    super(L.parentFigure, Mx, My, { style, size, thickness, color, draggable, temp })
    this.x = Mx
    this.y = My
    this.line = L
    this.k = k
    if (label !== undefined) this.label = label
    this.line.addDependency(this)
  }

  update () {
    const L = this.line
    const k = this.k
    const Llength = distance(L.A, L.B)
    this.length = Llength === 0 ? this.length : k * Llength
    this.moveTo((1 - k) * L.A.x + k * L.B.x, (1 - k) * L.A.y + k * L.B.y)
  }

  moveTo (x: number, y: number) {
    const L = this.line
    const P = new Point(L.parentFigure, x, y, { temp: true })
    const M = orthogonalProjectionCoord(P, L)
    this.k = (L.B.x - L.A.x) === 0 ? (L.B.y - L.A.y) === 0 ? this.k : (M.y - L.A.y) / (L.B.y - L.A.y) : (M.x - L.A.x) / (L.B.x - L.A.x)
    this.length = this.k * distance(L.A, L.B)
    super.moveTo(M.x, M.y)
  }

  /**
   * Gère le déplacement du point le long de la droite
   * @param x
   * @param y
   */
  notifyPointerMove (x: number, y: number) {
    if (this.draggable) {
      this.moveTo(x, y)
    }
  }
}
