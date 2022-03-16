/*
 * Created by Angot Rémi and Lhote Jean-Claude on 15/02/2022.
 *
 * MathALEA 2D : Software for animating online dynamic mathematics figures
 * https://coopmaths.fr
 * @Author Angot Rémi and Lhote Jean-Claude (contact@coopmaths.fr)
 * @License: GNU AGPLv3 https://www.gnu.org/licenses/agpl-3.0.html
 */

import { Point, PointOptions } from './Point'
import { Segment } from '../lines/Segment'
import { Measure } from '../measures/Measure'
import { Coords } from '../others/Coords'
import { randint } from '../../calculus/random'

export class PointOnLine extends Point {
  line: Segment
  length: number | Measure// valeur signée (mesure algébrique de A à M)
  k: number
  constructor (L: Segment, { label, k, length, style = 'x', size = 0.15, thickness = 3, color = 'Gray', draggable = true, temp = false }: { length?: number | Measure, k?: number} & PointOptions = {}) {
    const Llength = Point.distance(L.A, L.B)
    // Si k n'est pas défini, ce sera length/distance(A,B) qui déterminera la position du point.
    // Si length n'est pas non plus défini, elle sera choisi entre 15% et 85% de la distance(A,B)
    if (!(length instanceof Measure)) {
      length = (length === undefined) ? randint(15, 85) * Llength / 100 : length
    }
    if (k === undefined) {
      k = ((length instanceof Measure ? length.value : length) || 0) / Llength // Evitons la division par zéro avec le milieu d'un segment nul.
    }
    const [Mx, My] = [(1 - k) * L.A.x + k * L.B.x, (1 - k) * L.A.y + k * L.B.y]
    super(L.parentFigure, Mx, My, { style, size, thickness, color, draggable, temp })
    this.x = Mx
    this.y = My
    this.line = L
    this.k = k
    if (length instanceof Measure) {
      length.addChild(this)
    }
    this.length = length
    if (label !== undefined) this.label = label
    this.line.addChild(this)
  }

  update () {
    try {
      const L = this.line
      const Llength = Point.distance(L.A, L.B)
      if (this.length instanceof Measure) {
        this.k = this.length.value / (Llength === 0 ? 1 : Llength)
      } else {
        this.k = this.length / (Llength === 0 ? 1 : Llength)
      }
      this.moveTo((1 - this.k) * L.A.x + this.k * L.B.x, (1 - this.k) * L.A.y + this.k * L.B.y)
    } catch (error) {
      console.log('Erreur dans PointOnLine.update()', error)
      this.exist = false
    }
  }

  moveTo (x: number, y: number) {
    try {
      const L = this.line
      const P = { x, y }
      const M = Coords.orthogonalProjectionCoord(P, L)
      this.k = (L.B.x - L.A.x) === 0 ? (L.B.y - L.A.y) === 0 ? this.k : (M.y - L.A.y) / (L.B.y - L.A.y) : (M.x - L.A.x) / (L.B.x - L.A.x)
      if (this.length instanceof Measure) {
        this.length.value = this.k * Point.distance(L.A, L.B)
      } else {
        this.length = this.k * Point.distance(L.A, L.B)
      }
      super.moveTo(M.x, M.y)
    } catch (error) {
      console.log('Erreur dans PointOnLine.moveTo()', error)
      this.exist = false
    }
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
