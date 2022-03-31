import { Point } from '../points/Point'
import { PointByRotation } from '../points/PointByRotation'
import { Polygon } from './Polygon'
import { OptionsGraphiques } from './Line'

export class RegularPolygon extends Polygon {
  constructor (A: Point, B: Point, n: number, { color = 'black', thickness = 1, dashed = false }: OptionsGraphiques = {}) {
    const points = [A, B]
    for (let i = 1; i < n - 1; i++) {
      points.push(new PointByRotation(points[i - 1], points[i], 180 - (360 / n)))
    }
    super(...points)
    this.color = color
    this.thickness = thickness
    this.dashed = dashed
  }
}
