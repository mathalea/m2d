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

/**
 * Crée l'image (Point) de A par l'homothétie de centre 'center' et de rapport k.
 * k peut être un nombre (constante) ou une instance d'une classe dérivée de Measure.
 */
export class PointByHomothetie extends Point {
    center: Point
    k: Measure // Coefficient de l'homothétie
    previous: Point
    constructor (A: Point, center: Point, k: number | Measure, { label, style = 'x', size = 0.15, thickness = 3, color = 'black', draggable = false, temp = false }: PointOptions = {}) {
      const x = (center.x + (k instanceof Measure ? k.value : k) * (A.x - center.x))
      const y = (center.y + (k instanceof Measure ? k.value : k) * (A.y - center.y))
      if (typeof k === 'number') k = new Const(A.parentFigure, k)
      super(A.parentFigure, x, y, { style, size, thickness, color, draggable, temp, exist: !isNaN(x) })
      this.center = center
      this.k = k
      this.k.addChild(this)
      this.previous = A
      if (label !== undefined) this.label = label
      A.addChild(this)
      center.addChild(this)
      if (isNaN(this.k.value)) this.exist = false
      else this.exist = true
    }

    save () {
      super.save()
      this.parentFigure.save[this.id].className = 'PointByHomothetie'
      this.parentFigure.save[this.id].arguments = [this.previous.id, this.center.id, this.k.id]
    }

    update (): void {
      try {
        const rapport = this.k.value
        if (!isNaN(rapport)) {
          const x = (this.center.x + rapport * (this.previous.x - this.center.x))
          const y = (this.center.y + rapport * (this.previous.y - this.center.y))
          this.moveTo(x, y)
          this.exist = true
        } else {
          this.exist = false
        }
      } catch (error) {
        console.log('Erreur dans PointByHomothetie.update()', error)
        this.exist = false
      }
    }
}
