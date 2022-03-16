/*
 * Created by Angot Rémi and Lhote Jean-Claude on 15/02/2022.
 *
 * MathALEA 2D : Software for animating online dynamic mathematics figures
 * https://coopmaths.fr
 * @Author Angot Rémi and Lhote Jean-Claude (contact@coopmaths.fr)
 * @License: GNU AGPLv3 https://www.gnu.org/licenses/agpl-3.0.html
 */

import { Const } from '../measures/Const'
import { Measure } from '../measures/Measure'
import { Point, PointOptions } from './Point'

export class PointBySimilitude extends Point {
    center: Point
    angle: Measure// Angle en degré
    k: Measure // Coefficient
    previous: Point
    constructor (A: Point, center: Point, k: number |Measure, angle: number | Measure, { label, style = 'x', size = 0.15, thickness = 3, color = 'black', draggable = false, temp = false }: PointOptions = {}) {
      super(A.parentFigure, 0, 0, { style, size, thickness, color, draggable, temp })
      if (typeof angle === 'number') this.angle = new Const(center.parentFigure, angle)
      else {
        this.angle = angle
        angle.addChild(this)
      }
      if (typeof k === 'number') this.k = new Const(center.parentFigure, k)
      else {
        this.k = k
        k.addChild(this)
      }
      const angleRadian = this.angle.value * Math.PI / 180
      this.x = (center.x + this.k.value * (Math.cos(angleRadian) * (A.x - center.x) - Math.sin(angleRadian) * (A.y - center.y)))
      this.y = (center.y + this.k.value * (Math.cos(angleRadian) * (A.y - center.y) + Math.sin(angleRadian) * (A.x - center.x)))
      this.center = center
      this.previous = A
      if (label !== undefined) this.label = label
      A.addChild(this)
      center.addChild(this)
      if (typeof angle !== 'number') {
        if (typeof k !== 'number') {
          this.exist = A.exist && center.exist && angle.exist && k.exist
        } else this.exist = A.exist && center.exist && angle.exist
      } else this.exist = A.exist && center.exist
    }

    update (): void {
      try {
        const angleRadian = this.angle.value * Math.PI / 180
        const rapport = this.k.value
        const x = (this.center.x + rapport * (Math.cos(angleRadian) * (this.previous.x - this.center.x) - Math.sin(angleRadian) * (this.previous.y - this.center.y)))
        const y = (this.center.y + rapport * (Math.cos(angleRadian) * (this.previous.y - this.center.y) + Math.sin(angleRadian) * (this.previous.x - this.center.x)))
        this.moveTo(x, y)
      } catch (error) {
        console.log('Erreur dans PointBySimilitude.update()', error)
        this.exist = false
      }
    }
}
