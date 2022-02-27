import { Point } from './Point'
import { Segment } from '../lines/Segment'

export class Middle extends Point {
  line: Segment
  constructor (s: Segment, { style = 'x', size = 0.15, thickness = 3, color = 'black', draggable = false, temp = false }: { style?: '' | 'x' | 'o', size?: number, thickness?: number, color?: string, draggable?: boolean, temp?: boolean } = {}) {
    super(s.parentFigure, (s.A.x + s.B.x) / 2, (s.A.y + s.B.y) / 2, { style, size, thickness, color, draggable, temp })
    s.addDependency(this)
    this.line = s
  }

  update (): void {
    this.moveTo((this.line.A.x + this.line.B.x) / 2, (this.line.A.y + this.line.B.y) / 2)
  }
}
