import { Ray } from './Ray'
import { SegmentStyle } from './Line'
import { Angle } from '../measures/Angle'
import { CalculDynamic } from '../measures/Calculdynamic'
import { Point } from '../points/Point'
import { PointByRotation } from '../points/PointByRotation'

export class Bissectrice extends Ray {
  A: Point
  B: Point
  O: Point
  AOB: Angle
  constructor(A: Point, O: Point, B: Point, { color = 'black', thickness = 1, style = '', temp = false }: { color?: string, thickness?: number, style?: SegmentStyle, temp?: boolean } = {}) {
    const AOB = new Angle(A, O, B)
    const halfAngle = new CalculDynamic(a => a[0].value / 2, [AOB])
    const M = new PointByRotation(A, O, halfAngle, { temp: true })
    super(O, M, { color, thickness, style, temp })
    B.addDependency(M)
  }
}
