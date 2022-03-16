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
import { Const } from '../measures/Const'
import { Measure } from '../measures/Measure'
import { Point } from '../points/Point'

export class Vector extends Element2D {
  private _x: Measure
  private _y: Measure

  constructor (figure: Figure, arg1: number | Point | Measure, arg2: number | Point| Measure) {
    super(figure)
    let correct = true
    this._x = new Const(figure, 0)
    this._y = new Const(figure, 0)
    try {
      if (typeof arg1 === 'number') {
        this._x.value = arg1
        if (typeof arg2 === 'number') this._y.value = arg2
        else if (arg2 instanceof Measure) {
          this._y = arg2
          arg2.addChild(this)
        } else correct = false
      } else if (arg1 instanceof Measure) {
        this._x = arg1
        arg1.addChild(this)
        if (typeof arg2 === 'number') {
          this._y.value = arg2
        } else if (arg2 instanceof Measure) {
          this._y = arg2
          arg2.addChild(this)
        } else correct = false
      } else if (arg1 instanceof Point && arg2 instanceof Point) {
        this._x = new Const(figure, arg2.x - arg1.x)
        this._y = new Const(figure, arg2.y - arg1.y)
      } else {
        correct = false
      }
    } catch (error) {
      console.log(error)
      correct = false
    }
    if (!correct) {
      this.exist = false
    }
  }

  get norme () {
    return Math.sqrt(this.x ** 2 + this.y ** 2)
  }

  multiply (v: Vector) {
    return (this.x * v.x) + (this.y * v.y)
  }

  update () {
    this.notifyAllChilds()
  }

  get x () {
    return this._x.value
  }

  set x (n: number) {
    this._x.value = n
  }

  get y () {
    return this._y.value
  }

  set y (n: number) {
    this._y.value = n
  }
}
