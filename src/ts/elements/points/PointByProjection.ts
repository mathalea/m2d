/*
 * Created by Angot Rémi and Lhote Jean-Claude on 15/02/2022.
 *
 * MathALEA 2D : Software for animating online dynamic mathematics figures
 * https://coopmaths.fr
 * @Author Angot Rémi and Lhote Jean-Claude (contact@coopmaths.fr)
 * @License: GNU AGPLv3 https://www.gnu.org/licenses/agpl-3.0.html
 */

import { Line } from '../lines/Line'
import { Coords } from '../others/Coords'
import { Point, PointOptions } from './Point'

export class PointByProjection extends Point {
    previous: Point // Antécédent
    line: Line // Droite sur laquelle s'effectue la projection
    constructor (A: Point, L: Line, { label, style = 'x', size = 0.15, thickness = 3, color = 'black', draggable = false, temp = false }: PointOptions = {}) {
      const coords = Coords.orthogonalProjectionCoord(A, L)
      super(A.parentFigure, coords.x, coords.y, { label, style, size, thickness, color, draggable, temp })
      this.previous = A
      this.line = L
      A.addChild(this)
      L.addChild(this)
    }

    update (): void {
      try {
        const coords = Coords.orthogonalProjectionCoord(this.previous, this.line)
        this.moveTo(coords.x, coords.y)
      } catch (error) {
        console.log('Erreur dans PointByProjection.update()', error)
        this.exist = false
      }
    }
}
