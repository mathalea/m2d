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
import { Measure } from '../measures/Measure'
import { Point } from '../points/Point'

export class Vector extends Element2D {
  private _x: number | Measure
  private _y: number | Measure

  constructor (figure: Figure, arg1: number | Point | Measure, arg2: number | Point| Measure) {
    super(figure)
    let correct = true
    this._x = 0
    this._y = 0
    if (typeof arg1 === 'number') {
      this._x = arg1
      if (typeof arg2 === 'number' || arg2 instanceof Measure) {
        this._y = arg2
        if (arg2 instanceof Measure) arg2.addChild(this)
      } else correct = false
    } else if (arg1 instanceof Measure) {
      this._x = arg1
      arg1.addChild(this)
      if (typeof arg2 === 'number' || arg2 instanceof Measure) {
        this._y = arg2
        if (arg2 instanceof Measure) arg2.addChild(this)
      } else correct = false
    } else if (arg1 instanceof Point && arg2 instanceof Point) {
      this._x = arg2.x - arg1.x
      this._y = arg2.y - arg1.y
    } else {
      correct = false
    }
    if (!correct) {
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
    this.notifyAllChilds()
  }

  get x () {
    return this._x instanceof Measure ? this._x.value : this._x
  }

  set x (n: number) {
    if (this._x instanceof Measure) this._x.value = n
    else this._x = n
    this.update()
  }

  get y () {
    return this._y instanceof Measure ? this._y.value : this._y
  }

  set y (n: number) {
    if (this._y instanceof Measure) this._y.value = n
    else this._y = n
    this.update()
  }
}
