/*
 * Created by Angot Rémi and Lhote Jean-Claude on 15/02/2022.
 *
 * MathALEA 2D : Software for animating online dynamic mathematics figures
 * https://coopmaths.fr
 * @Author Angot Rémi and Lhote Jean-Claude (contact@coopmaths.fr)
 * @License: GNU AGPLv3 https://www.gnu.org/licenses/agpl-3.0.html
 */

import { Line } from '../lines/Line'
import { Vector } from './Vector'

export class VectorDirector extends Vector {
    line: Line
    constructor (L: Line) {
      const [x, y] = [L.directeur.x, L.directeur.y]
      super(L.parentFigure, x, y)
      this.line = L
      L.addChild(this)
    }

    update (): void {
      [this.x, this.y] = [this.line.directeur.x, this.line.directeur.y]
      this.notifyAllChilds()
    }
}
