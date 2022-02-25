import { Point } from '../points/Point'
import { PointOnLine } from '../points/PointOnLine'
import { Segment, SegmentStyle } from './Segment'

/**
 * Le segment [AB] est prolongé de add1 unités du côté de A et de add2 unités du côté de B
 */
export class Line extends Segment {
  constructor (A: Point, B: Point, { color = 'black', thickness = 1, style = '', add1 = 50, add2 = 50, temp = false }: {color?: string, thickness?: number, style?: SegmentStyle, add1?: number, add2?: number, temp?: boolean} = {}) {
    const sAB = new Segment(A, B, { temp: true })
    const m = new PointOnLine(sAB, { length: -add1, temp: true })
    const sBA = new Segment(B, A, { temp: true })
    const n = new PointOnLine(sBA, { length: -add2, temp: true })
    super(m, n, { color, thickness })
  }
}
