import { Figure } from '../Figure'
import { Element2D } from './Element2D'
import { Point, PointStyle } from './Point'
import { Segment } from './Segment'

export class Polygon extends Element2D {
    points: Point[]
    parentFigure: Figure
    constructor (parentFigure: Figure, points: Point[], { color = 'black', stylePoints = '' } : {color?: string, stylePoints?: PointStyle } = {}) {
      super()
      this.parentFigure = parentFigure
      this.points = points
      this.fill = 'none'

      const groupSvg = document.createElementNS('http://www.w3.org/2000/svg', 'g')
      for (let i = 0; i < this.points.length - 1; i++) {
        const s = new Segment(this.points[i], this.points[i + 1], { color: this.color, thickness: this.thickness })
        groupSvg.appendChild(s.g)
      }
      const s = new Segment(this.points[0], this.points[this.points.length - 1], { color: this.color, thickness: this.thickness })
      groupSvg.appendChild(s.g)
      this.g = groupSvg
      this.parentFigure.svg.appendChild(this.g)

      // Aplique un style aux sommets (par défaut, on supprime les croix)
      for (const point of this.points) {
        point.style = stylePoints
      }
      this.color = color
    }
}
