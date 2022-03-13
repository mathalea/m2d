/*
 * Created by Angot Rémi and Lhote Jean-Claude on 15/02/2022.
 *
 * MathALEA 2D : Software for animating online dynamic mathematics figures
 * https://coopmaths.fr
 * @Author Angot Rémi and Lhote Jean-Claude (contact@coopmaths.fr)
 * @License: GNU AGPLv3 https://www.gnu.org/licenses/agpl-3.0.html
 */

import { Coords } from '../elements/Element2D'
import { Point } from '../elements/points/Point'
import { rotationCoord } from './transformation'

/**
 * Retourne la valeur signée de l'angle AOB en degré.
 * @author Jean-Claude Lhote
 */
export function angleOriented (A: Point | Coords, O: Point | Coords, B: Point | Coords) {
  try {
    const A2 = rotationCoord(A, O, 90)
    const v = { x: B.x - O.x, y: B.y - O.y, norme: 0 }
    const u = { x: A2.x - O.x, y: A2.y - O.y, norme: 0 }
    const s = ((v.x * u.x + v.y * u.y) > 0) ? 1 : -1
    return s * angle(A, O, B)
  } catch (error) {
    return NaN
  }
}

/**
 *
 * @param A
 * @param O Origine
 * @param B
 * @returns Angle AOB
 */
export function angle (A: Point | Coords, O: Point | Coords, B: Point | Coords) {
  try {
    const OA = { x: A.x - O.x, y: A.y - O.y, norme: 0 }
    OA.norme = Math.sqrt(OA.x ** 2 + OA.y ** 2)
    const OB = { x: B.x - O.x, y: B.y - O.y, norme: 0 }
    OB.norme = Math.sqrt(OB.x ** 2 + OB.y ** 2)
    const scalaire = OA.x * OB.x + OA.y * OB.y
    if (OA.norme * OB.norme === 0) {
      return 0 // On évite de retouner un angle NaN, zéro, c'est toujours mieux que NaN.
    }
    return (Math.acos(scalaire / (OA.norme * OB.norme))) * 180 / Math.PI
  } catch (error) {
    return NaN
  }
}
