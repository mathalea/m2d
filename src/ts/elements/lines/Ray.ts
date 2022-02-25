import { Point } from '../points/Point'
import { Line } from './Line'
import { SegmentStyle } from './Segment'

export class Ray extends Line {
  constructor (A: Point, B: Point, { color = 'black', thickness = 1, style = '', add = 50, temp = false }: {color?: string, thickness?: number, style?: SegmentStyle, add?: number, temp?: boolean} = {}) {
    super(A, B, { color, thickness, style, add1: 0, add2: add, temp })
  }
}
