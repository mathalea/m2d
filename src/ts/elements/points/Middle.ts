import { Point } from './Point'
import { Segment } from '../lines/Segment'

export class Middle extends Point {
    line: Segment
    constructor (s:Segment, { style = 'x', size = 0.15, thickness = 3, color = 'black', draggable = false, temp = false }: {style?: '' | 'x' | 'o', size?: number, thickness?: number, color?: string, draggable?: boolean, temp?: boolean} = {}) {
      super(s.parentFigure, (s.ends[0].x + s.ends[1].x) / 2, (s.ends[0].y + s.ends[1].y) / 2, { style, size, thickness, color, draggable, temp })
      s.addDependency(this)
      this.line = s
    }

    update (): void {
      this.moveTo((this.line.ends[0].x + this.line.ends[1].x) / 2, (this.line.ends[0].y + this.line.ends[1].y) / 2)
    }
}
