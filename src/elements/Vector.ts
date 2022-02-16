import { Element2D } from './Element2D'
import { Point } from './Point'

export class Vector extends Element2D {
    x: number
    y: number

    constructor (arg1: number | Point, arg2: number | Point) {
      super()
      if (typeof arg1 === 'number' && typeof arg2 === 'number') {
        this.x = arg1
        this.y = arg2
      } else if (arg1 instanceof Point && arg2 instanceof Point) {
        this.x = arg2.x - arg1.x
        this.y = arg2.y - arg1.y
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
}
