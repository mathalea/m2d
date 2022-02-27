import { Line, OptionsGraphiques } from './Line'
import { Point } from '../points/Point'
import { PointByTranslationVector } from '../points/PointByTranslationVector'
import { Vector } from '../others/Vector'

export class LineByPointVector extends Line {
  A: Point
  B: Point
  vector: Vector
  constructor (A: Point, v: Vector, { color = 'black', thickness = 1, temp = false }: OptionsGraphiques = {}) {
    const B = new PointByTranslationVector(A, v, { temp: true, draggable: false })
    super(A, B, { lineType: 'Line', color, thickness, temp })
    this.A = A
    this.B = B
    this.vector = v
  }
}
