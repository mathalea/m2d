import { Point } from './Point'
import { Segment } from './Segment'

export class Line extends Segment {
  constructor (A: Point, B: Point, { color = 'black', thickness = 1, style = '' }: OptionsGraphiques = {}) {
    super(A, B, { color, thickness })
    const m = this.parentFigure.pointOnSegment(A, B, -50)
    const n = this.parentFigure.pointOnSegment(B, A, -50)
    const s = new Segment(m, n)
    // this.g = s.g
    // this.parentFigure.svg.appendChild(this.g)
  }
}
