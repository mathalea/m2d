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
import { Const } from '../measures/Const'
/**
 * Crée un point sur la droite L.
 * si length est précisé, alors le point est créé à la distance length de L.A (premier point de passage de L)
 * si k est précisé, alors le point est construit comme barycentre de L.A(k) et L.B(1-k).
 * Exemple: si k=0.5, alors le point est créé au milieu de L.A et L.B
 */
export class PointOnLine extends Point {
  line: Segment
  length: Measure// valeur signée (mesure algébrique de A à M)
  k: Measure
  constructor (L: Segment, { label, k, length, style = 'x', size = 0.15, thickness = 3, color = 'Gray', draggable = true, temp = false }: { length?: number | Measure, k?: number} & PointOptions = {}) {
    super(L.parentFigure, 0, 0, { style, size, thickness, color, draggable, temp })
    const Llength = Point.distance(L.A, L.B)
    // Si k n'est pas défini, ce sera length/distance(A,B) qui déterminera la position du point.
    // Si length n'est pas non plus défini, elle sera choisi entre 15% et 85% de la distance(A,B)
    if (!(length instanceof Measure)) {
      this.length = new Const(L.parentFigure, length || randint(15, 85) * Llength / 100)
    } else {
      this.length = length
      length.addChild(this)
    }
    if (k === undefined) {
      k = this.length.value / Llength // Evitons la division par zéro avec le milieu d'un segment nul.
    }
    const [Mx, My] = [(1 - k) * L.A.x + k * L.B.x, (1 - k) * L.A.y + k * L.B.y]

    this.x = Mx
    this.y = My
    this.line = L
    this.k = new Const(L.parentFigure, k)
    this.moveTo(Mx, My)

    if (label !== undefined) this.label = label
    this.line.addChild(this)
  }

  update () {
    try {
      const L = this.line
      const Llength = Point.distance(L.A, L.B)
      this.k.value = this.length.value / (Llength === 0 ? 1 : Llength)
      this.moveTo((1 - this.k.value) * L.A.x + this.k.value * L.B.x, (1 - this.k.value) * L.A.y + this.k.value * L.B.y)
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
      this.k.value = (L.B.x - L.A.x) === 0 ? (L.B.y - L.A.y) === 0 ? this.k.value : (M.y - L.A.y) / (L.B.y - L.A.y) : (M.x - L.A.x) / (L.B.x - L.A.x)
      this.length.value = this.k.value * Point.distance(L.A, L.B)
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
