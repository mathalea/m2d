import { Point } from './Point'

export class PointBySimilitude extends Point {
    center: Point
    angle: number // Angle en degré
    k: number // Coefficient
    previous: Point
    constructor (A: Point, center: Point, k: number, angle: number, { style = 'x', size = 0.15, thickness = 3, color = 'black', dragable = false, temp = false }: {style?: '' | 'x' | 'o', size?: number, thickness?: number, color?: string, dragable?: boolean, temp?: boolean} = {}) {
      const angleRadian = angle * Math.PI / 180
      const x = (center.x + k * (Math.cos(angleRadian) * (A.x - center.x) - Math.sin(angleRadian) * (A.y - center.y)))
      const y = (center.y + k * (Math.cos(angleRadian) * (A.y - center.y) + Math.sin(angleRadian) * (A.x - center.x)))
      super(A.parentFigure, x, y, { style, size, thickness, color, dragable, temp })
      this.center = center
      this.k = k
      this.angle = angle
      this.previous = A
      A.addDependency(this)
      center.addDependency(this)
    }

    update (): void {
      const angleRadian = this.angle * Math.PI / 180
      const x = (this.center.x + this.k * (Math.cos(angleRadian) * (this.previous.x - this.center.x) - Math.sin(angleRadian) * (this.previous.y - this.center.y)))
      const y = (this.center.y + this.k * (Math.cos(angleRadian) * (this.previous.y - this.center.y) + Math.sin(angleRadian) * (this.previous.x - this.center.x)))
      this.moveTo(x, y)
    }
}