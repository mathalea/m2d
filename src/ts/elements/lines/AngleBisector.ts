/*
 * Created by Angot Rémi and Lhote Jean-Claude on 15/02/2022.
 *
 * MathALEA 2D : Software for animating online dynamic mathematics figures
 * https://coopmaths.fr
 * @Author Angot Rémi and Lhote Jean-Claude (contact@coopmaths.fr)
 * @License: GNU AGPLv3 https://www.gnu.org/licenses/agpl-3.0.html
 */

import { Ray } from './Ray'
import { SegmentStyle } from './Line'
import { Angle } from '../measures/Angle'
import { CalculDynamic } from '../measures/CalculDynamic'
import { Point } from '../points/Point'
import { PointByRotation } from '../points/PointByRotation'

export class AngleBisector extends Ray {
  side1: Point
  side2: Point
  origin: Point
  AOB: Angle
  constructor (A: Point, O: Point, B: Point, { color = 'black', thickness = 1, style = '', dashed, temp = false }: { color?: string, thickness?: number, style?: SegmentStyle, temp?: boolean, dashed?: boolean } = {}) {
    const AOB = new Angle(A, O, B)
    const halfAngle = new CalculDynamic((a: Angle[]) => a[0].value / 2, [AOB])
    const M = new PointByRotation(A, O, halfAngle, { temp: true })
    super(O, M, { color, thickness, dashed, style, temp })
    B.addChild(M)
    this.side1 = A
    this.side2 = B
    this.origin = O
    this.AOB = AOB
  }
}
