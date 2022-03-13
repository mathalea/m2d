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

export class PointBySimilitude extends Point {
    center: Point
    angle: number | Measure// Angle en degré
    k: number |Measure // Coefficient
    previous: Point
    constructor (A: Point, center: Point, k: number |Measure, angle: number | Measure, { label, style = 'x', size = 0.15, thickness = 3, color = 'black', draggable = false, temp = false }: PointOptions = {}) {
      const angleRadian = typeof angle === 'number' ? angle * Math.PI / 180 : angle.value * Math.PI / 180

      const x = (center.x + (k instanceof Measure ? k.value : k) * (Math.cos(angleRadian) * (A.x - center.x) - Math.sin(angleRadian) * (A.y - center.y)))
      const y = (center.y + (k instanceof Measure ? k.value : k) * (Math.cos(angleRadian) * (A.y - center.y) + Math.sin(angleRadian) * (A.x - center.x)))
      super(A.parentFigure, x, y, { style, size, thickness, color, draggable, temp })
      this.center = center
      this.k = k
      this.angle = angle
      this.previous = A
      if (label !== undefined) this.label = label
      A.addChild(this)
      center.addChild(this)
      if (angle instanceof Measure) {
        angle.addChild(this)
        if (k instanceof Measure) {
          k.addChild(this)
          this.exist = A.exist && center.exist && angle.exist && k.exist
        } else this.exist = A.exist && center.exist && angle.exist
      } else this.exist = A.exist && center.exist
    }

    update (): void {
      try {
        const angleRadian = typeof this.angle === 'number' ? this.angle * Math.PI / 180 : this.angle.value * Math.PI / 180
        const rapport = (this.k instanceof Measure ? this.k.value : this.k)
        const x = (this.center.x + rapport * (Math.cos(angleRadian) * (this.previous.x - this.center.x) - Math.sin(angleRadian) * (this.previous.y - this.center.y)))
        const y = (this.center.y + rapport * (Math.cos(angleRadian) * (this.previous.y - this.center.y) + Math.sin(angleRadian) * (this.previous.x - this.center.x)))
        this.moveTo(x, y)
      } catch (error) {
        console.log('Erreur dans PointBySimilitude.update()', error)
        this.exist = false
      }
    }
}
