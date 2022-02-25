import { Point, PointOptions } from './Point'
/**
 * Crée le barycentre d'un Array de Point.
 */
export class Barycenter extends Point {
    points: Point[]
    constructor (points: Point[], { label, style = 'x', size = 0.15, thickness = 3, color = 'black', draggable = false, temp = false }: PointOptions = {}) {
      let Cx: number
      let Cy: number
      super(points[0].parentFigure, 0, 0, { style, size, thickness, color, draggable, temp })
      this.parentFigure = points[0].parentFigure
      this.points = points
      Cx = 0
      Cx = 0
      for (const point of points) {
        point.addDependency(this)
        Cx += point.x
        Cy += point.y
      }
      Cx /= points.length
      Cy /= points.length
      this.x = Cx
      this.y = Cy
      this.update()
    }

    update () {
      let Cx: number
      let Cy: number
      Cx = 0
      Cy = 0
      for (const point of this.points) {
        Cx += point.x
        Cy += point.y
      }
      Cx /= this.points.length
      Cy /= this.points.length
      this.x = Cx
      this.y = Cy
      super.moveTo(Cx, Cy)
    }
}
