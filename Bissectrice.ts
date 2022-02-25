import { Ray } from './src/ts/elements/lines/Ray'
import { SegmentStyle } from './src/ts/elements/lines/Segment'
import { Angle } from './src/ts/elements/measures/Angle'
import { CalculDynamic } from './src/ts/elements/measures/Calculdynamic'
import { Point } from './src/ts/elements/points/Point'
import { PointByRotation } from './src/ts/elements/points/PointByRotation'

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
