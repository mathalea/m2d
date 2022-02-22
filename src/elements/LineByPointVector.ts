import { Line } from './Line'
import { Point } from './Point'
import { PointByTranslationVector } from './PointByTranslationVector'
import { Vector } from './Vector'

export class LineByPointVector extends Line {
  A: Point
  B: Point
  vector : Vector
  constructor (A: Point, v: Vector, { color = 'black', thickness = 1 }: {color?: string, thickness?: number, add1?: number, add2?: number} = {}) {
    const B = new PointByTranslationVector(A, v, { temp: true, dragable: false })
    super(A, B, { color, thickness })
    this.A = A
    this.B = B
    this.vector = v
  }
}
