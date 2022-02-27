/*
 * Created by Angot Rémi and Lhote Jean-Claude on 15/02/2022.
 *
 * MathALEA 2D : Software for animating online dynamic mathematics figures
 * https://coopmaths.fr
 * @Author Angot Rémi and Lhote Jean-Claude (contact@coopmaths.fr)
 * @License: GNU AGPLv3 https://www.gnu.org/licenses/agpl-3.0.html
 */

import { rotationCoord } from '../../calculus/transformation'
import { Figure } from '../../Figure'
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
  const A2 = rotationCoord(A, O, 90)
  const v = { x: B.x - O.x, y: B.y - O.y, norme: 0 }
  const u = { x: A2[0] - O.x, y: A2[1] - O.y, norme: 0 }
  const s = ((v.x * u.x + v.y * u.y) > 0) ? 1 : -1
  return s * angle(A, O, B)
}

function angle (A: Point, O: Point, B: Point) {
  const OA = { x: A.x - O.x, y: A.y - O.y, norme: 0 }
  OA.norme = Math.sqrt(OA.x ** 2 + OA.y ** 2)
  const OB = { x: B.x - O.x, y: B.y - O.y, norme: 0 }
  OB.norme = Math.sqrt(OB.x ** 2 + OB.y ** 2)
  const scalaire = OA.x * OB.x + OA.y * OB.y
  if (OA.norme * OB.norme === 0) {
    return 0 // On évite de retouner un angle NaN, zéro, c'est toujours mieux que NaN.
  }
  return (Math.acos(scalaire / (OA.norme * OB.norme))) * 180 / Math.PI
}
