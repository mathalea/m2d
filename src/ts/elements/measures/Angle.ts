/*
 * Created by Angot Rémi and Lhote Jean-Claude on 15/02/2022.
 *
 * MathALEA 2D : Software for animating online dynamic mathematics figures
 * https://coopmaths.fr
 * @Author Angot Rémi and Lhote Jean-Claude (contact@coopmaths.fr)
 * @License: GNU AGPLv3 https://www.gnu.org/licenses/agpl-3.0.html
 */
import { Point } from '../points/Point'
import { Measure } from './Measure'
import { Calcul } from '../others/Calculs'
import { Coords } from '../others/Coords'
const epsilon = 0.00000001

export class Angle extends Measure {
    A: Point
    O: Point
    B: Point | Coords
    valueNonOriented: number
    constructor (A: Point, O: Point, B: Point|number) {
      super(O.parentFigure)
      this.childs = []
      if (typeof B === 'number') {
        this.B = Coords.rotationCoord(A, O, B)
        this.value = B
        O.addChild(this)
        A.addChild(this)
      } else if (B instanceof Point) {
        this.B = B
        this.value = Angle.angleOriented(A, O, B)
        O.addChild(this)
        A.addChild(this)
        B.addChild(this)
      } else {
        throw new Error('Le troisième paramètre doit être un point ou un nombre.')
      }
      this.O = O
      this.A = A
      this.valueNonOriented = Angle.angle(this.A, this.O, this.B)
    }

    update () {
      try {
        this.value = Angle.angleOriented(this.A, this.O, this.B)
        this.valueNonOriented = Angle.angle(this.A, this.O, this.B)
      } catch (error) {
        console.log('Erreur dans Angle.update()', error)
        this.exist = false
      }
      this.notifyAllChilds()
    }

    static angleOriented (A: Point|Coords, O: Point|Coords, B: Point|Coords) {
      const v = { x: B.x - O.x, y: B.y - O.y }
      const u = { x: A.x - O.x, y: A.y - O.y }
      const s = ((u.x * v.y - v.x * u.y) >= 0) ? 1 : -1 // composante z du produit vectoriel OA^OB
      return s * Angle.angle(A, O, B)
    }

    static angle (A: Point|Coords, O: Point|Coords, B: Point|Coords) {
      const OA = { x: A.x - O.x, y: A.y - O.y, norme: 0 }
      OA.norme = Math.sqrt(OA.x ** 2 + OA.y ** 2)
      const OB = { x: B.x - O.x, y: B.y - O.y, norme: 0 }
      OB.norme = Math.sqrt(OB.x ** 2 + OB.y ** 2)
      const scalaire = OA.x * OB.x + OA.y * OB.y
      if (OA.norme * OB.norme < epsilon) {
        return 0 // On évite de retouner un angle NaN, zéro, c'est toujours mieux que NaN.
      }
      return (Math.acos(Calcul.arrondi(scalaire / (OA.norme * OB.norme)))) * 180 / Math.PI
    }
}
