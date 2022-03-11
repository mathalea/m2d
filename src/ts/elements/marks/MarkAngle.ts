import { AngleBisector, AngleBisector, AngleBisector } from './../lines/AngleBisector'
import { PointByRotation } from './../points/PointByRotation'
import { CalculDynamic } from './../measures/CalculDynamic'
import { Distance } from './../measures/Distance'
import { PointBySimilitude } from './../points/PointBySimilitude'
import { PointByHomothetie } from './../points/PointByHomothetie'
import { Element2D } from '../Element2D'
import { Arc } from '../lines/Arc'
import { ArcBy3Points } from '../lines/ArcBy3PointsAndRadius'
import { AngleBisector } from '../lines/AngleBisector'
import { Polyline } from '../lines/Polyline'
import { Segment } from '../lines/Segment'
import { Angle } from '../measures/Angle'
import { Measure } from '../measures/Measure'
import { Point } from '../points/Point'
import { PointByProjection } from '../points/PointByProjection'
import { PointOnLineAtD } from '../points/PointOnLineAtD'
import { distance } from '../../calculus/random'
const racine2Sur2 = 0.707106
export class MarkAngle extends Element2D {
    angle: Measure
    arc: Arc
    square: Polyline
    angleBisector: Measure
    constructor (A: Point, O: Point, B: Point, { size = 1, color = 'black', thickness = 1, dashed = false }: {size?: number, color?: string, thickness?: number, dashed?: boolean} = {}) {
      super(A.parentFigure)
      const angle = new Angle(A, O, B)
      const arc = new ArcBy3Points(A, O, B, { radius: 1 })
      if (Math.abs(angle.value - 90) < 0.1) arc.hide()
      this.arc = arc
      this.angle = angle
      this.angle.addChild(this)
      this.angleBisector = new CalculDynamic((a: Measure[]) => a[0].value / 2, [angle])
      const sOA = new Segment(O, A, { temp: true })
      const A2 = new PointOnLineAtD(sOA, size * racine2Sur2, { temp: true })
      const B2 = new PointByRotation(A2, O, angle, { temp: true })
      const O2 = new PointBySimilitude(A2, O, 1 / racine2Sur2, this.angleBisector, { temp: true })
      const square = new Polyline(A2, O2, B2)
      if (Math.abs(angle.value - 90) < 0.4) square.show()
      this.square = square
      this.group.push(square, arc)
      this.thickness = thickness
      this.color = color
      this.dashed = dashed
      this.update()
    }

    update () {
      console.log(this.angle.value)
      if (Math.abs(Math.abs(this.angle.value) - 90) < 0.4) {
        this.arc.hide()
        this.square.show()
      } else {
        this.arc.show()
        this.square.hide()
      }
    }
}
