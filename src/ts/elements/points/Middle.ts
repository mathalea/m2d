/*
 * Created by Angot Rémi and Lhote Jean-Claude on 15/02/2022.
 *
 * MathALEA 2D : Software for animating online dynamic mathematics figures
 * https://coopmaths.fr
 * @Author Angot Rémi and Lhote Jean-Claude (contact@coopmaths.fr)
 * @License: GNU AGPLv3 https://www.gnu.org/licenses/agpl-3.0.html
 */

import { Point } from './Point'
import { Segment } from '../lines/Segment'
/**
 * Point, milieu du segment passé en argument.
 */
export class Middle extends Point {
  line: Segment
  constructor (s: Segment, { style = 'x', size = 0.15, thickness = 3, color = 'black', draggable = false, temp = false }: { style?: '' | 'x' | 'o', size?: number, thickness?: number, color?: string, draggable?: boolean, temp?: boolean } = {}) {
    super(s.parentFigure, (s.A.x + s.B.x) / 2, (s.A.y + s.B.y) / 2, { style, size, thickness, color, draggable, temp })
    s.addChild(this)
    this.line = s
  }

  update (): void {
    try {
      this.moveTo((this.line.A.x + this.line.B.x) / 2, (this.line.A.y + this.line.B.y) / 2)
    } catch (error) {
      console.log('Erreur dans Middle.update()', error)
      this.exist = false
    }
  }
}
