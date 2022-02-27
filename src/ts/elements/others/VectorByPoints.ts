/*
 * Created by Angot Rémi and Lhote Jean-Claude on 15/02/2022.
 *
 * MathALEA 2D : Software for animating online dynamic mathematics figures
 * https://coopmaths.fr
 * @Author Angot Rémi and Lhote Jean-Claude (contact@coopmaths.fr)
 * @License: GNU AGPLv3 https://www.gnu.org/licenses/agpl-3.0.html
 */

import { Figure } from '../../Figure'
import { Element2D } from '../Element2D'
import { Point } from '../points/Point'
import { Vector } from './Vector'

export class VectorByPoints extends Element2D {
  origin: Point // ToFix ? arg1 ou Point(0,0)
  end: Point // ToFix ? arg2 ou Point(arg1,arg2)
  parentFigure: Figure
    x: number
    y: number
    constructor (arg1: Point, arg2: Point) {
      super()
      if (arg1 instanceof Point && arg2 instanceof Point) {
        this.parentFigure = arg1.parentFigure
        this.origin = arg1
        this.end = arg2
        this.x = arg2.x - arg1.x
        this.y = arg2.y - arg1.y
        // Si les points servant à définir le vecteur sont temporaires, alors il est inutile de dépendre d'eux.
        if (!arg1.temp) arg1.addDependency(this)
        if (!arg2.temp) arg2.addDependency(this)
      } else {
        throw new Error('Les paramètres doivent être 2 points.')
      }
    }

    get norme () {
      return Math.sqrt(this.x ** 2 + this.y ** 2)
    }

    multiply (v: Vector) {
      return (this.x * v.x) + (this.y * v.y)
    }

    update () {
      this.x = this.end.x - this.origin.x
      this.y = this.end.y - this.origin.y
      this.notifyAllDependencies()
    }
}
