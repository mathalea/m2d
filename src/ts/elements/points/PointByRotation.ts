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
import { Const } from '../measures/Const'
/**
 * Crée l'image (Point) de A par la rotation de centre 'center' et d'angle 'angle'.
 * angle peut être un nombre (constante) ou une instance d'une classe dérivée de Measure.
 */
export class PointByRotation extends Point {
    center: Point
    angle: Measure // Angle en degré
    previous: Point
    constructor (A: Point, center: Point, angle: number | Measure, { label, style = 'x', size = 0.15, thickness = 3, color = 'black', draggable = false, temp = false }: PointOptions = {}) {
      if (typeof angle === 'number') angle = new Const(A.parentFigure, angle)
      const angleMeasure = angle.value
      const x = (center.x + (A.x - center.x) * Math.cos((angleMeasure * Math.PI) / 180) - (A.y - center.y) * Math.sin((angleMeasure * Math.PI) / 180))
      const y = (center.y + (A.x - center.x) * Math.sin((angleMeasure * Math.PI) / 180) + (A.y - center.y) * Math.cos((angleMeasure * Math.PI) / 180))
      super(A.parentFigure, x, y, { style, size, thickness, color, draggable, temp })
      this.center = center
      this.angle = angle
      angle.addChild(this)
      this.previous = A
      if (label !== undefined) this.label = label
      A.addChild(this)
      center.addChild(this)
      if (typeof angle !== 'number') {
        this.exist = A.exist && angle.exist && center.exist
      } else this.exist = A.exist && center.exist
    }

    save () {
      super.save()
      this.parentFigure.save[this.id].className = 'PointByRotation'
      this.parentFigure.save[this.id].arguments = [this.previous.id, this.center.id, this.angle.id]
    }

    update (): void {
      try {
        const angleMeasure = this.angle.value
        const x = (this.center.x + (this.previous.x - this.center.x) * Math.cos((angleMeasure * Math.PI) / 180) - (this.previous.y - this.center.y) * Math.sin((angleMeasure * Math.PI) / 180))
        const y = (this.center.y + (this.previous.x - this.center.x) * Math.sin((angleMeasure * Math.PI) / 180) + (this.previous.y - this.center.y) * Math.cos((angleMeasure * Math.PI) / 180))
        this.moveTo(x, y)
      } catch (error) {
        console.log('Erreur dans PointByRotation.update()', error)
        this.exist = false
      }
    }
}
