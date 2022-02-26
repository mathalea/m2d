import { Point } from '../points/Point'
import { getCoordsOut, Line } from './Line'
import { SegmentStyle } from './Segment'

export class Ray extends Line {
  constructor(A: Point, B: Point, { color = 'black', thickness = 1, style = '', temp = false }: { color?: string, thickness?: number, style?: SegmentStyle, temp?: boolean } = {}) {
    super(A, B, 'Ray', { color, thickness, style, temp })
  }
  update(): void {
    if (this.A.isOnFigure) {
      let dummy1, dummy2
        ;[this.x1, this.y1] = [this.A.x, this.A.y]
        ;[dummy1, dummy2, this.x2, this.y2] = getCoordsOut(this.A, this.B)
    } else if (this.B.isOnFigure) {
      ;[this.x1, this.y1, this.x2, this.y2] = getCoordsOut(this.B, this.A)
    } else {
      ;[this.x1, this.y1, this.x2, this.y2] = [this.A.x, this.A.y, this.B.x, this.B.y]
    }
    const x1Svg = this.parentFigure.xToSx(this.x1)
    const x2Svg = this.parentFigure.xToSx(this.x2)
    const y1Svg = this.parentFigure.yToSy(this.y1)
    const y2Svg = this.parentFigure.yToSy(this.y2)
    this.g.setAttribute('x1', `${x1Svg}`)
    this.g.setAttribute('y1', `${y1Svg}`)
    this.g.setAttribute('x2', `${x2Svg}`)
    this.g.setAttribute('y2', `${y2Svg}`)
    this.notifyAllDependencies()
  }
}
