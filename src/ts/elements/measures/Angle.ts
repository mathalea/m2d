import { Figure } from '../../Figure'
import { Vector } from '../others/Vector'
import { Point } from '../points/Point'
import { PointByRotation } from '../points/PointByRotation'
import { Measure } from './Measure'

export class Angle extends Measure {
    A: Point
    O: Point
    B: Point
    parentFigure: Figure
    valueNonOriented: number
    constructor (A: Point, O: Point, B: Point) {
      super(A.parentFigure)
      this.dependencies = []
      this.value = angleOriented(A, O, B)
      this.valueNonOriented = angle(A, O, B)
      A.addDependency(this)
      O.addDependency(this)
      B.addDependency(this)
      this.A = A
      this.O = O
      this.B = B
    }

    update () {
      this.value = angleOriented(this.A, this.O, this.B)
      this.valueNonOriented = angle(this.A, this.O, this.B)
      this.notifyAllDependencies()
    }
}

function angleOriented (A: Point, O: Point, B: Point) {
  const A2 = new PointByRotation(A, O, 90, { temp: true })
  const v = new Vector(O.parentFigure, O, B)
  const u = new Vector(O.parentFigure, O, A2)
  const s = ((v.x * u.x + v.y * u.y) > 0) ? 1 : -1
  return s * angle(A, O, B)
}

function angle (A: Point, O: Point, B: Point) {
  const OA = new Vector(O.parentFigure, O, A)
  const OB = new Vector(O.parentFigure, O, B)
  const scalaire = OA.multiply(OB)
  const angleRadian = (Math.acos(scalaire / (OA.norme * OB.norme)))
  return angleRadian * 180 / Math.PI
}
