import { Ray } from './Ray'
import { SegmentStyle } from './Segment'
import { Angle } from '../measures/Angle'
import { CalculDynamic } from '../measures/Calculdynamic'
import { Point } from '../points/Point'
import { PointByRotation } from '../points/PointByRotation'

export class Bissectrice extends Ray {
    A: Point
    B: Point
    O: Point
    AOB: Angle
    constructor (A: Point, O: Point, B: Point, { color = 'black', thickness = 1, style = '', add = 50, temp = false }: {color?: string, thickness?: number, style?: SegmentStyle, add?: number, temp?: boolean} = {}) {
      const AOB = new Angle(A, O, B)
      const halfAngle = new CalculDynamic(a => a[0].value / 2, [AOB])
      const M = new PointByRotation(A, O, halfAngle, { temp: true })
      super(O, M, { color, thickness, style, add, temp })
      B.addDependency(M)
    }
}
