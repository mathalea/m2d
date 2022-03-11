/*
 * Created by Angot Rémi and Lhote Jean-Claude on 15/02/2022.
 *
 * MathALEA 2D : Software for animating online dynamic mathematics figures
 * https://coopmaths.fr
 * @Author Angot Rémi and Lhote Jean-Claude (contact@coopmaths.fr)
 * @License: GNU AGPLv3 https://www.gnu.org/licenses/agpl-3.0.html
 */

import { intersectionCCCoord } from '../../calculus/intersection'
import { Element2D } from '../Element2D'
import { Circle } from '../lines/Circle'
import { Point, PointOptions } from './Point'

export class PointIntersectionCC extends Point {
  C1: Circle
  C2: Circle
  n: 1 | 2
  constructor (C1: Circle, C2: Circle, n: 1 | 2 = 1, { label, style = 'x', size = 0.15, thickness = 3, color = 'black', draggable = false, temp = false }: PointOptions = {}) {
    let [x, y] = intersectionCCCoord(C1, C2, n)
    let exist = true
    if (x === undefined || y === undefined) {
      [x, y] = [C1.parentFigure.xMax + 10, C1.parentFigure.yMax + 10]
      exist = false
    }
    super(C1.parentFigure, x, y, { style, size, thickness, color, draggable, temp, exist })
    this.C1 = C1
    this.C2 = C2
    this.n = n
    if (label !== undefined) this.label = label
    C1.addChild(this)
    C2.addChild(this)
  }

  update (): void {
    const [x, y] = intersectionCCCoord(this.C1, this.C2, this.n)
    if (x !== undefined && y !== undefined) {
      this.moveTo(x, y)
      if (!this.isVisible) {
        this.show()
        this.exist = true
        for (const e of this.childs) {
          if (e instanceof Element2D) e.show()
        }
      }
    } else {
      this.hide()
      this.exist = false
    }
  }
}
