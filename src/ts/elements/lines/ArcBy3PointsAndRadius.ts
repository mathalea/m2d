import { Angle } from '../measures/Angle'
import { Point } from '../points/Point'
import { PointOnLineAtD } from '../points/PointOnLineAtD'
import { Arc } from './Arc'
import { Segment } from './Segment'

export class ArcBy3Points extends Arc {
  constructor (A: Point, O: Point, B: Point, { radius = 1, color = 'black', thickness = 1, dashed = false }: {radius?: number, color?: string, thickness?: number, dashed?: boolean} = {}) {
    const sOA = new Segment(O, A, { temp: true })
    const M = new PointOnLineAtD(sOA, radius, { temp: true })
    const dynamicAngle = new Angle(A, O, B)
    super(O, M, dynamicAngle, { color, thickness, dashed })
  }
}
