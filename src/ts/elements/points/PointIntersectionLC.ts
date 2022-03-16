/*
 * Created by Angot Rémi and Lhote Jean-Claude on 15/02/2022.
 *
 * MathALEA 2D : Software for animating online dynamic mathematics figures
 * https://coopmaths.fr
 * @Author Angot Rémi and Lhote Jean-Claude (contact@coopmaths.fr)
 * @License: GNU AGPLv3 https://www.gnu.org/licenses/agpl-3.0.html
 */

import { Circle } from '../lines/Circle'
import { Point, PointOptions } from './Point'
import { Line } from '../lines/Line'
import { Coords } from '../others/Coords'

export class PointIntersectionLC extends Point {
  L: Line
  C: Circle
  n: 1 | 2
  constructor (L: Line, C: Circle, n: 1 | 2 = 1, { label, style = 'x', size = 0.15, thickness = 3, color = 'black', draggable = false, temp = false }: PointOptions = {}) {
    const coords = Coords.intersectionLCCoord(L, C, n)
    super(L.parentFigure, coords.x, coords.y, { style, size, thickness, color, draggable, temp })
    this.L = L
    this.C = C
    this.n = n
    if (label !== undefined) this.label = label
    L.addChild(this)
    C.addChild(this)
  }

  update (): void {
    try {
      const coords = Coords.intersectionLCCoord(this.L, this.C, this.n)
      if (!isNaN(coords.x) && !isNaN(coords.y)) {
        this.moveTo(coords.x, coords.y)
        if (!this.isVisible) this.show()
      } else this.hide()
    } catch (error) {
      console.log('Erreur dans PointIntersectionLC.update()', error)
      this.exist = false
    }
  }
}
