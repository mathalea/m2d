import { Point, PointOptions } from './Point'

export class PointByRotation extends Point {
    center: Point
    angle: number // Angle en degré
    previous: Point
    constructor (A: Point, center: Point, angle: number, { label, style = 'x', size = 0.15, thickness = 3, color = 'black', draggable = false, temp = false }: PointOptions = {}) {
      const x = (center.x + (A.x - center.x) * Math.cos((angle * Math.PI) / 180) - (A.y - center.y) * Math.sin((angle * Math.PI) / 180))
      const y = (center.y + (A.x - center.x) * Math.sin((angle * Math.PI) / 180) + (A.y - center.y) * Math.cos((angle * Math.PI) / 180))
      super(A.parentFigure, x, y, { style, size, thickness, color, draggable, temp })
      this.center = center
      this.angle = angle
      this.previous = A
      if (label !== undefined) this.label = label
      A.addDependency(this)
      center.addDependency(this)
    }

    update (): void {
      const x = (this.center.x + (this.previous.x - this.center.x) * Math.cos((this.angle * Math.PI) / 180) - (this.previous.y - this.center.y) * Math.sin((this.angle * Math.PI) / 180))
      const y = (this.center.y + (this.previous.x - this.center.x) * Math.sin((this.angle * Math.PI) / 180) + (this.previous.y - this.center.y) * Math.cos((this.angle * Math.PI) / 180))
      this.moveTo(x, y)
    }
}
