import { orthogonalProjectionCoord } from '../calculus/transformation'
import { Point, PointOptions } from './Point'
import { PointOnLine } from './PointOnLine'
import { Segment } from './Segment'

export class PointOnSegment extends PointOnLine {
  constructor (L: Segment, { length, style = 'x', size = 0.15, thickness = 3, color = 'Gray', dragable = true, temp = false }: {length?: number} & PointOptions = {}) {
    super(L, { length, style, size, thickness, color, dragable, temp })
    this.length = length
    this.style = style
    this.size = size
    this.thickness = thickness
    this.color = color
    this.dragable = dragable
    this.temp = temp
  }

  notifyPointerMove (x: number, y: number) {
    if (this.dragable) {
      const P = new Point(this.line.parentFigure, x, y, { temp: true })
      const [xM, yM] = orthogonalProjectionCoord(P, this.line)
      const [A, B] = this.line.ends
      if (xM < Math.min(A.x, B.x) || xM > Math.max(A.x, B.x) || yM < Math.min(A.y, B.y) || yM > Math.max(A.y, B.y)) return
      this.moveTo(xM, yM)
    }
  }
}
