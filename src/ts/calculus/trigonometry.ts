import { Point } from '../elements/points/Point'
import { rotationCoord } from './transformation'

/**
 * Retourne la valeur signée de l'angle AOB en degré.
 * @author Jean-Claude Lhote
 */
export function angleOriented (A: Point, O: Point, B: Point) {
  const A2 = rotationCoord(A, O, 90)
  const v = { x: B.x - O.x, y: B.y - O.y, norme: 0 }
  const u = { x: A2[0] - O.x, y: A2[1] - O.y, norme: 0 }
  const s = ((v.x * u.x + v.y * u.y) > 0) ? 1 : -1
  return s * angle(A, O, B)
}

/**
 *
 * @param A
 * @param O Origine
 * @param B
 * @returns Angle AOB
 */
export function angle (A: Point, O: Point, B: Point) {
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
