import { Measure } from '../measures/Measure'
import { Point, PointOptions } from './Point'

export class PointByRotation extends Point {
    center: Point
    angle: number | Measure // Angle en degré
    previous: Point
    constructor (A: Point, center: Point, angle: number | Measure, { label, style = 'x', size = 0.15, thickness = 3, color = 'black', draggable = false, temp = false }: PointOptions = {}) {
      const angleMeasure = (typeof angle === 'number') ? angle : angle.value
      const x = (center.x + (A.x - center.x) * Math.cos((angleMeasure * Math.PI) / 180) - (A.y - center.y) * Math.sin((angleMeasure * Math.PI) / 180))
      const y = (center.y + (A.x - center.x) * Math.sin((angleMeasure * Math.PI) / 180) + (A.y - center.y) * Math.cos((angleMeasure * Math.PI) / 180))
      super(A.parentFigure, x, y, { style, size, thickness, color, draggable, temp })
      this.center = center
      this.angle = angle
      this.previous = A
      if (label !== undefined) this.label = label
      A.addDependency(this)
      center.addDependency(this)
      if (angle instanceof Measure) angle.addDependency(this)
    }

    update (): void {
      const angleMeasure = (typeof this.angle === 'number') ? this.angle : this.angle.value
      const x = (this.center.x + (this.previous.x - this.center.x) * Math.cos((angleMeasure * Math.PI) / 180) - (this.previous.y - this.center.y) * Math.sin((angleMeasure * Math.PI) / 180))
      const y = (this.center.y + (this.previous.x - this.center.x) * Math.sin((angleMeasure * Math.PI) / 180) + (this.previous.y - this.center.y) * Math.cos((angleMeasure * Math.PI) / 180))
      this.moveTo(x, y)
    }
}
