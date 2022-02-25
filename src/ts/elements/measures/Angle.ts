import { Figure } from '../../Figure'
import { Vector } from '../others/Vector'
import { Point } from '../points/Point'
import { PointByRotation } from '../points/PointByRotation'
import { Measure } from './Measure'

export class Angle extends Measure {
    origin: Point
    top: Point
  end: Point
    parentFigure: Figure
    valueNonOriented: number
    constructor (origin: Point, top: Point, end: Point|number) {
      super(top.parentFigure)
      this.dependencies = []
      if (typeof end === 'number') {
        this.end = new PointByRotation(origin, top, end, { temp: true })
        this.value = end
        top.addDependency(this)
        origin.addDependency(this)
      } else if (end instanceof Point) {
        this.end = end
        this.value = angleOriented(origin, top, end)
        top.addDependency(this)
        origin.addDependency(this)
        end.addDependency(this)
      } else {
        throw new Error('Le troisième paramètre doit être un point ou un nombre.')
      }
      this.parentFigure = top.parentFigure
      this.top = top
      this.origin = origin
      this.valueNonOriented = angle(this.origin, this.top, this.end)
    }

    update () {
      this.value = angleOriented(this.origin, this.top, this.end)
      this.valueNonOriented = angle(this.origin, this.top, this.end)
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
  if (OA.norme * OB.norme === 0) {
    return 0 // On évite de retouner un angle NaN, zéro, c'est toujours mieux que NaN.
  }
  return (Math.acos(scalaire / (OA.norme * OB.norme))) * 180 / Math.PI
}
