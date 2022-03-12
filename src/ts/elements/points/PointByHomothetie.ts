/*
 * Created by Angot Rémi and Lhote Jean-Claude on 15/02/2022.
 *
 * MathALEA 2D : Software for animating online dynamic mathematics figures
 * https://coopmaths.fr
 * @Author Angot Rémi and Lhote Jean-Claude (contact@coopmaths.fr)
 * @License: GNU AGPLv3 https://www.gnu.org/licenses/agpl-3.0.html
 */

import { Measure } from '../measures/Measure'
import { Point, PointOptions } from './Point'

export class PointByHomothetie extends Point {
    center: Point
    k: number | Measure // Coefficient de l'homothétie
    previous: Point
    constructor (A: Point, center: Point, k: number | Measure, { label, style = 'x', size = 0.15, thickness = 3, color = 'black', draggable = false, temp = false }: PointOptions = {}) {
      const x = (center.x + (k instanceof Measure ? k.value : k) * (A.x - center.x))
      const y = (center.y + (k instanceof Measure ? k.value : k) * (A.y - center.y))
      super(A.parentFigure, x, y, { style, size, thickness, color, draggable, temp })
      this.center = center
      this.k = k
      this.previous = A
      if (label !== undefined) this.label = label
      A.addChild(this)
      center.addChild(this)
      if (k instanceof Measure) k.addChild(this)
    }

    update (): void {
      const rapport = this.k instanceof Measure ? this.k.value : this.k
      const x = (this.center.x + rapport * (this.previous.x - this.center.x))
      const y = (this.center.y + rapport * (this.previous.y - this.center.y))
      this.moveTo(x, y)
    }
}
