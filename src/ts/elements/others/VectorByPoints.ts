import { Figure } from '../../Figure'
import { Element2D } from '../Element2D'
import { Point } from '../points/Point'

export class Vector extends Element2D {
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
        arg1.addDependency(this)
        arg2.addDependency(this)
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
