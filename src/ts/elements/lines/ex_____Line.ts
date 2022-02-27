import { homothetieCoord } from '../../calculus/transformation'
import { CalculDynamic } from '../measures/Calculdynamic'
import { Distance } from '../measures/Distance'
import { Point } from '../points/Point'
import { PointOnLine } from '../points/PointOnLine'
import { Segment, SegmentStyle } from './Segment'

/**
 * Le segment [AB] est prolongé de add1 unités du côté de A et de add2 unités du côté de B
 */
export class Line extends Segment {
  A: Point
  B: Point
  AB: Distance
  add1: CalculDynamic
  add2: CalculDynamic
  constructor(A: Point, B: Point, { color = 'black', thickness = 1, style = '', add1 = 50, add2 = 50, temp = false }: { color?: string, thickness?: number, style?: SegmentStyle, add1?: number, add2?: number, temp?: boolean } = {}) {
    const sAB = new Segment(A, B, { temp: true })
    const m = new PointOnLine(sAB, { length: -add1, temp: true })
    const sBA = new Segment(B, A, { temp: true })
    const n = new PointOnLine(sBA, { length: -add2, temp: true })
    super(A, B, { color, thickness })
    this.A = m
    this.B = n
    this.A = A
    this.B = B
    this.AB = new Distance(A, B)
    this.add1 = new CalculDynamic(d => add1 / d[0].value, [this.AB])
    this.add2 = new CalculDynamic(d => add2 / d[0].value, [this.AB])
    this.update()
  }

  update() {
    const [Mx, My] = homothetieCoord(this.B, this.A, -this.add1.value)
    const [Nx, Ny] = homothetieCoord(this.A, this.B, -this.add2.value)
    this.moveEnd(Mx, My, 1)
    this.moveEnd(Nx, Ny, 2)
    super.update()
  }
}
