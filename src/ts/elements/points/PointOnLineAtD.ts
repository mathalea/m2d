/*
 * Created by Angot Rémi and Lhote Jean-Claude on 15/02/2022.
 *
 * MathALEA 2D : Software for animating online dynamic mathematics figures
 * https://coopmaths.fr
 * @Author Angot Rémi and Lhote Jean-Claude (contact@coopmaths.fr)
 * @License: GNU AGPLv3 https://www.gnu.org/licenses/agpl-3.0.html
 */

import { Point, PointOptions } from './Point'
import { PointByHomothetie } from './PointByHomothetie'
import { Measure } from '../measures/Measure'
import { Line } from '../lines/Line'
import { Coords } from '../others/Coords'
import { Const } from '../measures/Const'
/**
 * Place un point sur une droite L (Line) à une distance d fixe du point L.A
 * d peut être un nombre (constante) ou une instance de classe dérivée de Measure.
 */
export class PointOnLineAtD extends Point {
  line: Line
  length: Measure // valeur signée (mesure algébrique de A à M)
  d: Measure

  constructor (L: Line, d: number | Measure, { label, style = 'x', size = 0.15, thickness = 3, color = 'Gray', draggable = false, temp = false }: { length?: number, k?: number } & PointOptions = {}) {
    const length = Point.distance(L.A, L.B)
    super(L.parentFigure, 0, 0, { style, size, thickness, color, draggable, temp })
    this.line = L
    this.line.addChild(this)
    if (typeof d === 'number') this.d = new Const(L.parentFigure, d)
    else {
      this.d = d
      d.addChild(this)
    }
    const M = new PointByHomothetie(L.B, L.A, this.d.value / (length === 0 ? 1 : length), { temp: true })
    this.x = M.x
    this.y = M.y
    this.moveTo(M.x, M.y)
    this.length = new Const(L.parentFigure, length)
    if (label !== undefined) this.label = label
    this.exist = this.d.exist && L.exist
  }

  update () {
    try {
      const L = this.line
      const dist = this.d.value
      const Llength = Point.distance(L.A, L.B)
      const coords = Coords.homothetieCoord(L.B, L.A, dist / (Llength === 0 ? 1 : Llength))
      this.moveTo(coords.x, coords.y)
    } catch (error) {
      console.log('Erreur dans PointOnLineAtD.update()', error)
      this.exist = false
    }
  }
}
