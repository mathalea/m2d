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

export class Vector extends Element2D {
  private _x: number
  private _y: number
  parentFigure: Figure

  constructor (svgContainer: Figure, arg1: number | Point, arg2: number | Point) {
    super()
    if (typeof arg1 === 'number' && typeof arg2 === 'number') {
      this._x = arg1
      this._y = arg2
      this.parentFigure = svgContainer
    } else if (arg1 instanceof Point && arg2 instanceof Point) {
      this._x = arg2.x - arg1.x
      this._y = arg2.y - arg1.y
    } else {
      throw new Error('Les paramètres doivent être 2 points ou 2 nombres.')
    }
  }

  get norme () {
    return Math.sqrt(this.x ** 2 + this.y ** 2)
  }

  multiply (v: Vector) {
    return (this.x * v.x) + (this.y * v.y)
  }

  update () {
    this.notifyAllDependencies()
  }

  get x () {
    return this._x
  }

  set x (n: number) {
    this._x = n
    // this.update()
  }

  get y () {
    return this._y
  }

  set y (n: number) {
    this._y = n
    // this.update()
  }
}
