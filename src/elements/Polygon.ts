import { Figure } from '../Figure'
import { Element2D } from './Element2D'
import { Point, PointStyle } from './Point'
import { Segment } from './Segment'

export class Polygon extends Element2D {
    color: string
    points: Point[]
    fill: string
    parentFigure: Figure
    constructor (parentFigure: Figure, points: Point[], { color = 'black', stylePoints = '' } : {color?: string, stylePoints?: PointStyle } = {}) {
      super()
      this.parentFigure = parentFigure
      this.points = points
      this.fill = 'none'
      this.color = color

      const groupSvg = document.createElementNS('http://www.w3.org/2000/svg', 'g')
      for (let i = 0; i < this.points.length - 1; i++) {
        const s = new Segment(this.points[i], this.points[i + 1], this.parentFigure, { color: this.color, thickness: this.thickness })
        groupSvg.appendChild(s.g)
      }
      const s = new Segment(this.points[0], this.points[this.points.length - 1], this.parentFigure, { color: this.color, thickness: this.thickness })
      groupSvg.appendChild(s.g)
      this.g = groupSvg
      this.parentFigure.svg.appendChild(this.g)

      // Masque les sommets
      for (const point of this.points) {
        point.style = stylePoints
      }
    }
}
