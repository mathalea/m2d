import { Point } from '../elements/Point'
import { PointByRotation } from '../elements/PointByRotation'
import { Vector } from '../elements/Vector'

/**
 * Retourne la valeur signée de l'angle AOB en degré.
 * @author Jean-Claude Lhote
 */
export function angleOriented (A: Point, O: Point, B: Point) {
  const A2 = new PointByRotation(A, O, 90, { temp: true })
  const v = new Vector(O, B)
  const u = new Vector(O, A2)
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
  const OA = new Vector(O, A)
  const OB = new Vector(O, B)
  const scalaire = OA.multiply(OB)
  const angleRadian = (Math.acos(scalaire / (OA.norme * OB.norme)))
  return angleRadian * 180 / Math.PI
}
