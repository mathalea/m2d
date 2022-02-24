import { Point } from './Point'

export class PointByTranslation extends Point {
    xt: number
    yt: number
    previous: Point
    constructor (A: Point, xt: number, yt: number, { style = 'x', size = 0.15, thickness = 3, color = 'black', draggable = false, temp = false }: {style?: '' | 'x' | 'o', size?: number, thickness?: number, color?: string, draggable?: boolean, temp?: boolean} = {}) {
      super(A.parentFigure, A.x + xt, A.y + yt, { style, size, thickness, color, draggable, temp })
      this.xt = xt
      this.yt = yt
      this.previous = A
      A.addDependency(this)
    }

    update (): void {
      this.moveTo(this.previous.x + this.xt, this.previous.y + this.yt)
    }
}
