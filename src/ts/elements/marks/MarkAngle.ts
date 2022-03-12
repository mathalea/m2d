import { PointByRotation } from './../points/PointByRotation'
import { CalculDynamic } from './../measures/CalculDynamic'
import { PointBySimilitude } from './../points/PointBySimilitude'
import { Element2D } from '../Element2D'
import { Arc } from '../lines/Arc'
import { ArcBy3Points } from '../lines/ArcBy3PointsAndRadius'
import { Polyline } from '../lines/Polyline'
import { Segment } from '../lines/Segment'
import { Angle } from '../measures/Angle'
import { Measure } from '../measures/Measure'
import { Point } from '../points/Point'
import { PointOnLineAtD } from '../points/PointOnLineAtD'
const racine2Sur2 = 0.707106
export class MarkAngle extends Element2D {
    angle: Measure
    arc: Arc
    square: Polyline
    angleBisector: Measure
    A: Point
    O: Point
    B: Point
    constructor (A: Point, O: Point, B: Point, { size = 1, color = 'black', thickness = 1, dashed = false }: {size?: number, color?: string, thickness?: number, dashed?: boolean} = {}) {
      super(A.parentFigure)
      const angle = new Angle(A, O, B)
      const arc = new ArcBy3Points(A, O, B, { radius: 1 })
      if (Math.abs(angle.value - 90) < 0.1) arc.hide(false)
      this.arc = arc
      this.angle = angle
      this.A = A
      this.O = O
      this.B = B
      this.angle.addChild(this)
      this.A.addChild(this)
      this.O.addChild(this)
      this.B.addChild(this)
      this.angleBisector = new CalculDynamic((a: Measure[]) => a[0].value / 2, [angle])
      const sOA = new Segment(O, A, { temp: true })
      const A2 = new PointOnLineAtD(sOA, size * racine2Sur2, { temp: true })
      const B2 = new PointByRotation(A2, O, angle, { temp: true })
      const O2 = new PointBySimilitude(A2, O, 1 / racine2Sur2, this.angleBisector, { temp: true })
      const square = new Polyline(A2, O2, B2)
      if (Math.abs(angle.value - 90) < 0.4) square.show(false)
      this.square = square
      this.group.push(square, arc)
      this.thickness = thickness
      this.color = color
      this.dashed = dashed
      this.update()
      this.exist = A.exist && O.exist && B.exist
    }

    update () {
      if (Math.abs(Math.abs(this.angle.value) - 90) < 0.4) {
        this.arc.hide(false)
        this.square.show(false)
      } else {
        this.arc.show(false)
        this.square.hide(false)
      }
    }
}
