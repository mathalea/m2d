/*
 * Created by Angot Rémi and Lhote Jean-Claude on 15/02/2022.
 *
 * MathALEA 2D : Software for animating online dynamic mathematics figures
 * https://coopmaths.fr
 * @Author Angot Rémi and Lhote Jean-Claude (contact@coopmaths.fr)
 * @License: GNU AGPLv3 https://www.gnu.org/licenses/agpl-3.0.html
 */

import { distance } from '../../calculus/random'
import { Point, PointOptions } from './Point'
import { PointByHomothetie } from './PointByHomothetie'
import { homothetieCoord } from '../../calculus/transformation'
import { Measure } from '../measures/Measure'
import { Line } from '../lines/Line'
/**
 * Place un point sur un Line (Segment) à une distance D fixe du point Line.A
 */
export class PointOnLineAtD extends Point {
  line: Line
  length: number // valeur signée (mesure algébrique de A à M)
  d: number | Measure

  constructor (L: Line, d: number |Measure, { label, style = 'x', size = 0.15, thickness = 3, color = 'Gray', draggable = false, temp = false }: { length?: number, k?: number } & PointOptions = {}) {
    const length = distance(L.A, L.B)
    const M = new PointByHomothetie(L.B, L.A, (d instanceof Measure ? d.value : d) / (length === 0 ? 1 : length), { temp: true })
    super(L.parentFigure, M.x, M.y, { style, size, thickness, color, draggable, temp })
    this.x = M.x
    this.y = M.y
    this.line = L
    this.d = d
    this.length = length
    if (label !== undefined) this.label = label
    this.line.addChild(this)
    if (d instanceof Measure) {
      d.addChild(this)
      this.exist = d.exist && L.exist
    } else this.exist = L.exist
  }

  update () {
    try {
      const L = this.line
      const dist = this.d instanceof Measure ? this.d.value : this.d
      const Llength = distance(L.A, L.B)
      const { x, y } = homothetieCoord(L.B, L.A, dist / (Llength === 0 ? 1 : Llength))
      this.moveTo(x, y)
    } catch (error) {
      console.log('Erreur dans PointOnLineAtD.update()', error)
      this.exist = false
    }
  }
}
