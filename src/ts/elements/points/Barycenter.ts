/*
 * Created by Angot Rémi and Lhote Jean-Claude on 15/02/2022.
 *
 * MathALEA 2D : Software for animating online dynamic mathematics figures
 * https://coopmaths.fr
 * @Author Angot Rémi and Lhote Jean-Claude (contact@coopmaths.fr)
 * @License: GNU AGPLv3 https://www.gnu.org/licenses/agpl-3.0.html
 */

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
      this.points = points
      Cx = 0
      Cy = 0
      for (const point of points) {
        point.addChild(this)
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
