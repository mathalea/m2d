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
/**
 * Crée un vecteur à partir de deux coordonnées (nombre ou instance de classe dérivée de Measure) ou de deux intances de Point.
 * Si des points sont donnés, ils ne servent qu'à déterminer les composantes constantes du vecteur qui devient indépendant de ces points.
 * Pour un vecteur dépendant des points fournis, il faut se tourner vers la classe VectorByPoints
 */
export class Vector extends Element2D {
  private _x: Measure
  private _y: Measure

  constructor (figure: Figure, arg1: number | Point | Measure, arg2: number | Point| Measure) {
    let correct = true
    let x, y
    try {
      if (typeof arg1 === 'number') {
        x = new Const(figure, arg1)
        if (typeof arg2 === 'number') y = new Const(figure, arg2)
        else if (arg2 instanceof Measure) {
          y = arg2
        } else correct = false
      } else if (arg1 instanceof Measure) {
        x = arg1
        if (typeof arg2 === 'number') {
          y = new Const(figure, arg2)
        } else if (arg2 instanceof Measure) {
          y = arg2
        } else correct = false
      } else if (arg1 instanceof Point && arg2 instanceof Point) {
        x = new Const(figure, arg2.x - arg1.x)
        y = new Const(figure, arg2.y - arg1.y)
      } else {
        correct = false
      }
    } catch (error) {
      console.log(error)
      correct = false
    }
    super(figure)
    this._x = x || new Const(figure, 0)
    this._y = y || new Const(figure, 0)
    if (arg1 instanceof Measure) arg1.addChild(this)
    if (arg2 instanceof Measure) arg2.addChild(this)
    if (!correct) {
      this.exist = false
    }
    this.parentFigure.set.add(this)
  }

  save () {
    this.parentFigure.save[this.id] = { className: 'Vector', arguments: [this._x.id, this._y.id] }
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
