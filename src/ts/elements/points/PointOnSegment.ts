import { distance } from '../../calculus/random'
import { orthogonalProjectionCoord } from '../../calculus/transformation'
import { Point, PointOptions } from './Point'
import { PointOnLine } from './PointOnLine'
import { Segment } from '../lines/Segment'

export class PointOnSegment extends PointOnLine {
  constructor (L: Segment, { label, length, style = 'x', size = 0.15, thickness = 3, color = 'Gray', draggable = true, temp = false }: { length?: number } & PointOptions = {}) {
    const Llength = distance(L.A, L.B)
    length = length === undefined ? length = Llength / 2 : length < 0 ? 0 : Math.min(length, Llength)
    super(L, { length, style, size, thickness, color, draggable, temp })
    this._size = size
    this.style = style
    this.thickness = thickness
    this.length = length
    this.color = color
    this.draggable = draggable
    this.temp = temp
    if (label !== undefined) this.label = label
    this.k = this.length / Llength
  }

  notifyPointerMove (x: number, y: number) {
    if (this.draggable) {
      const P = new Point(this.line.parentFigure, x, y, { temp: true })
      const [xM, yM] = orthogonalProjectionCoord(P, this.line)
      const [A, B] = [this.line.A, this.line.B]
      if (xM < Math.min(A.x, B.x) || xM > Math.max(A.x, B.x) || yM < Math.min(A.y, B.y) || yM > Math.max(A.y, B.y)) return
      this.moveTo(xM, yM)
    }
  }
}
