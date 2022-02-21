import { Point } from './Point'

export class PointByHomothetie extends Point {
    center: Point
    k: number // Coefficient de l'homothétie
    previous: Point
    constructor (A: Point, center: Point, k: number, { style = 'x', size = 0.15, thickness = 3, color = 'black', dragable = false, temp = false }: {style?: '' | 'x' | 'o', size?: number, thickness?: number, color?: string, dragable?: boolean, temp?: boolean} = {}) {
      const x = (center.x + k * (A.x - center.x))
      const y = (center.y + k * (A.y - center.y))
      super(A.parentFigure, x, y, { style, size, thickness, color, dragable, temp })
      this.center = center
      this.k = k
      this.previous = A
      A.addDependency(this)
      center.addDependency(this)
    }

    update (): void {
      const x = (this.center.x + this.k * (this.previous.x - this.center.x))
      const y = (this.center.y + this.k * (this.previous.y - this.center.y))
      this.moveTo(x, y)
    }
}
