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
import { Line } from '../lines/Line'
import { Coords } from '../others/Coords'

export class PointIntersectionLS extends Point {
  L1: Line
  L2: Segment
  constructor (L1: Line, L2: Segment, { label, style = 'x', size = 0.15, thickness = 3, color = 'black', draggable = false, temp = false }: PointOptions = {}) {
    const { x, y } = Coords.intersectionLLCoord(L1, L2)
    super(L1.parentFigure, x, y, { style, size, thickness, color, draggable, temp })
    this.L1 = L1
    this.L2 = L2
    if (label !== undefined) this.label = label
    L1.addChild(this)
    L2.addChild(this)
    this.x = x
    this.y = y
    if (x > Math.min(L2.x1, L2.x2) && x < Math.max(L2.x1, L2.x2) && y > Math.min(L2.y1, L2.y2) && y < Math.max(L2.y1, L2.y2)) this.exist = true
    else this.exist = false
  }

  update (): void {
    try {
      const { x, y } = Coords.intersectionLLCoord(this.L1, this.L2)
      if (x > Math.min(this.L2.x1, this.L2.x2) && x < Math.max(this.L2.x1, this.L2.x2) && y > Math.min(this.L2.y1, this.L2.y2) && y < Math.max(this.L2.y1, this.L2.y2)) {
        this.exist = true
      } else {
        this.exist = false
      }
      if (!isNaN(x) && !isNaN(y)) {
        this.moveTo(x, y)
        if (this.isVisible) this.show()
      } else this.hide()
    } catch (error) {
      console.log('Erreur dans PointIntersectionLL.update()', error)
      this.exist = false
    }
  }
}
