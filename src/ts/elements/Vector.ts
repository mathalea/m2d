import { Figure } from '../Figure'
import { Element2D } from './Element2D'
import { Point } from './Point'

export class Vector extends Element2D {
  private _x: number
  private _y: number
  origin: Point // ToFix ? arg1 ou Point(0,0)
  end: Point // ToFix ? arg2 ou Point(arg1,arg2)
  parentFigure: Figure

  constructor (svgContainer: Figure, arg1: number | Point, arg2: number | Point) {
    super()
    if (typeof arg1 === 'number' && typeof arg2 === 'number') {
      this.origin = new Point(svgContainer, 0, 0, { style: '' })
      this.end = new Point(svgContainer, arg1, arg2, { style: '' })
      this._x = arg1
      this._y = arg2
      this.parentFigure = svgContainer
    } else if (arg1 instanceof Point && arg2 instanceof Point) {
      this.origin = arg1
      this.end = arg2
      this._x = arg2.x - arg1.x
      this._y = arg2.y - arg1.y
      arg1.addDependency(this)
      arg2.addDependency(this)
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
    this._x = this.end.x - this.origin.x
    this._y = this.end.y - this.origin.y
    this.notifyAllDependencies()
  }

  get x () {
    return this._x
  }

  set x (n: number) {
    this._x = n
    this.update()
  }

  get y () {
    return this._y
  }

  set y (n: number) {
    this._y = n
    this.update()
  }
}
