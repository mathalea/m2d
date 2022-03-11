/*
 * Created by Angot Rémi and Lhote Jean-Claude on 15/02/2022.
 *
 * MathALEA 2D : Software for animating online dynamic mathematics figures
 * https://coopmaths.fr
 * @Author Angot Rémi and Lhote Jean-Claude (contact@coopmaths.fr)
 * @License: GNU AGPLv3 https://www.gnu.org/licenses/agpl-3.0.html
 */
import { arrondi } from '../../calculus/random'
import { Point } from '../points/Point'
import { PointByRotation } from '../points/PointByRotation'
import { Measure } from './Measure'
const epsilon = 0.00000001

export class Angle extends Measure {
    A: Point
    O: Point
    B: Point
    valueNonOriented: number
    constructor (A: Point, O: Point, B: Point|number) {
      super(O.parentFigure)
      this.dependencies = []
      if (typeof B === 'number') {
        this.B = new PointByRotation(A, O, B, { temp: true })
        this.value = B
        O.addDependency(this)
        A.addDependency(this)
      } else if (B instanceof Point) {
        this.B = B
        this.value = angleOriented(A, O, B)
        O.addDependency(this)
        A.addDependency(this)
        B.addDependency(this)
      } else {
        throw new Error('Le troisième paramètre doit être un point ou un nombre.')
      }
      this.O = O
      this.A = A
      this.valueNonOriented = angle(this.A, this.O, this.B)
    }

    update () {
      this.value = angleOriented(this.A, this.O, this.B)
      this.valueNonOriented = angle(this.A, this.O, this.B)
      this.notifyAllDependencies()
    }
}

function angleOriented (A: Point, O: Point, B: Point) {
  const v = { x: B.x - O.x, y: B.y - O.y }
  const u = { x: A.x - O.x, y: A.y - O.y }
  const s = ((u.x * v.y - v.x * u.y) >= 0) ? 1 : -1 // composante z du produit vectoriel OA^OB
  return s * angle(A, O, B)
}

function angle (A: Point, O: Point, B: Point) {
  const OA = { x: A.x - O.x, y: A.y - O.y, norme: 0 }
  OA.norme = Math.sqrt(OA.x ** 2 + OA.y ** 2)
  const OB = { x: B.x - O.x, y: B.y - O.y, norme: 0 }
  OB.norme = Math.sqrt(OB.x ** 2 + OB.y ** 2)
  const scalaire = OA.x * OB.x + OA.y * OB.y
  if (OA.norme * OB.norme < epsilon) {
    return 0 // On évite de retouner un angle NaN, zéro, c'est toujours mieux que NaN.
  }
  return (Math.acos(arrondi(scalaire / (OA.norme * OB.norme)))) * 180 / Math.PI
}
