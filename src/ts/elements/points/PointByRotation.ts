import { CalculDynamic } from './../measures/CalculDynamic'
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

export class PointByRotation extends Point {
    center: Point
    angle: number | Measure | CalculDynamic // Angle en degré
    previous: Point
    constructor (A: Point, center: Point, angle: number | Measure, { label, style = 'x', size = 0.15, thickness = 3, color = 'black', draggable = false, temp = false }: PointOptions = {}) {
      const angleMeasure = (typeof angle === 'number') ? angle : angle.value
      const x = (center.x + (A.x - center.x) * Math.cos((angleMeasure * Math.PI) / 180) - (A.y - center.y) * Math.sin((angleMeasure * Math.PI) / 180))
      const y = (center.y + (A.x - center.x) * Math.sin((angleMeasure * Math.PI) / 180) + (A.y - center.y) * Math.cos((angleMeasure * Math.PI) / 180))
      super(A.parentFigure, x, y, { style, size, thickness, color, draggable, temp })
      this.center = center
      this.angle = angle
      this.previous = A
      if (label !== undefined) this.label = label
      A.addChild(this)
      center.addChild(this)
      if (typeof angle !== 'number') {
        angle.addChild(this)
        this.exist = A.exist && angle.exist && center.exist
      } else this.exist = A.exist && center.exist
    }

    update (): void {
      try {
        const angleMeasure = (typeof this.angle === 'number') ? this.angle : this.angle.value
        const x = (this.center.x + (this.previous.x - this.center.x) * Math.cos((angleMeasure * Math.PI) / 180) - (this.previous.y - this.center.y) * Math.sin((angleMeasure * Math.PI) / 180))
        const y = (this.center.y + (this.previous.x - this.center.x) * Math.sin((angleMeasure * Math.PI) / 180) + (this.previous.y - this.center.y) * Math.cos((angleMeasure * Math.PI) / 180))
        this.moveTo(x, y)
      } catch (error) {
        console.log('Erreur dans PointByRotation.update()', error)
        this.exist = false
      }
    }
}
