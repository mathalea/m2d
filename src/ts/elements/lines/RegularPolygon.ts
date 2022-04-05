import { Const } from './../measures/Const'
import { Point } from '../points/Point'
import { PointByRotation } from '../points/PointByRotation'
import { Polygon } from './Polygon'
import { OptionsGraphiques } from './Line'
import { Measure } from '../measures/Measure'

export class RegularPolygon extends Polygon {
  nombreDeCotes: Measure
  constructor (A: Point, B: Point, n: number|Measure, { color = 'black', thickness = 1, dashed = false }: OptionsGraphiques = {}) {
    const points = [A, B]
    let nombreDeCotes
    if (typeof n === 'number') {
      nombreDeCotes = new Const(A.parentFigure, n)
    } else {
      nombreDeCotes = n
    }
    for (let i = 1; i < nombreDeCotes.value - 1; i++) {
      points.push(new PointByRotation(points[i - 1], points[i], 180 - (360 / nombreDeCotes.value)))
    }
    super(...points)
    this.color = color
    this.thickness = thickness
    this.dashed = dashed
    this.nombreDeCotes = nombreDeCotes
    nombreDeCotes.addChild(this)
  }

  update (): void {
    if (this.nombreDeCotes.value !== this.points.length) {
      this.points.splice(2)
      for (let i = 1; i < this.nombreDeCotes.value - 1; i++) {
        this.points[i + 1] = new PointByRotation(this.points[i - 1], this.points[i], 180 - (360 / this.nombreDeCotes.value), { temp: true })
      }
    }
    super.update()
  }
}
