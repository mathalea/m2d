import { Point } from './Point'
import { Segment } from './Segment'

export class Middle extends Point {
    s: Segment
    constructor (s:Segment, { style = 'x', size = 0.15, thickness = 3, color = 'black', dragable = false, temp = false }: {style?: '' | 'x' | 'o', size?: number, thickness?: number, color?: string, dragable?: boolean, temp?: boolean} = {}) {
      super(s.parentFigure, (s.ends[0].x + s.ends[1].x) / 2, (s.ends[0].y + s.ends[1].y) / 2, { style, size, thickness, color, dragable, temp })
      s.addDependency(this)
      this.s = s
    }

    update (): void {
      this.moveTo((this.s.ends[0].x + this.s.ends[1].x) / 2, (this.s.ends[0].y + this.s.ends[1].y) / 2)
    }
}
