import { Element2D } from '../Element2D'
import { Arc } from '../lines/Arc'
import { ArcBy3Points } from '../lines/ArcBy3PointsAndRadius'
import { Bissectrice } from '../lines/Bissectrice'
import { Polyline } from '../lines/Polyline'
import { Segment } from '../lines/Segment'
import { Angle } from '../measures/Angle'
import { Measure } from '../measures/Measure'
import { Point } from '../points/Point'
import { PointByProjection } from '../points/PointByProjection'
import { PointOnLineAtD } from '../points/PointOnLineAtD'

export class MarkAngle extends Element2D {
    angle: Measure
    arc: Arc
    square: Polyline
    constructor (A: Point, O: Point, B: Point, { size = 1, color = 'black', thickness = 1, dashed = false }: {size?: number, color?: string, thickness?: number, dashed?: boolean} = {}) {
      super()
      const angle = new Angle(A, O, B)
      const arc = new ArcBy3Points(A, O, B)
      if (Math.abs(angle.value - 90) < 0.2) arc.hide()
      this.arc = arc
      this.angle = angle
      this.angle.addDependency(this)
      const sOA = new Segment(O, A, { temp: true })
      const sOB = new Segment(O, B, { temp: true })
      const bissector = new Bissectrice(A, O, B, { temp: true })
      const O2 = new PointOnLineAtD(bissector, size, { temp: true })
      const A2 = new PointByProjection(O2, sOA, { temp: true })
      const B2 = new PointByProjection(O2, sOB, { temp: true })
      const square = new Polyline(A2, O2, B2)
      this.square = square
      this.group.push(square, arc)
      this.thickness = thickness
      this.color = color
      this.dashed = dashed
    }

    update () {
      if (Math.abs(Math.abs(this.angle.value) - 90) < 1) {
        this.arc.hide()
        this.square.show()
      } else {
        this.arc.show()
        this.square.hide()
      }
    }
}
