import { Figure } from '../Figure'
import { Barycenter } from './Barycenter'
import { Element2D } from './Element2D'
import { Point, PointStyle } from './Point'
import { PointOnLineAtD } from './PointOnLineAtD'
import { Segment } from './Segment'
import { TextByPoint } from './TextByPoint'

export class Polygon extends Element2D {
  points: Point[]
  labelsPoints: Point[]
  barycenter: Point
  labels: TextByPoint[]
    parentFigure: Figure
    private _style: PointStyle
    constructor (...points: Point[]) {
      super()
      this.parentFigure = points[0].parentFigure
      this.points = points
      this.fill = 'none'
      this.labels = []
      this.labelsPoints = []

      this.g = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
      this.g.setAttribute('points', listeXY(this.points))
      this.g.setAttribute('fill', 'none')
      this.g.setAttribute('stroke', 'black')
      this.parentFigure.svg.appendChild(this.g)
      this.barycenter = new Barycenter(this.points, { temp: true })
      for (const point of points) {
        this.labelsPoints.push(new PointOnLineAtD(new Segment(point, this.barycenter, { temp: true }), -0.5, { temp: true, style: '' }))
        const name = point.label
        point.label = ''
        this.labels.push(new TextByPoint(this.labelsPoints[this.labelsPoints.length - 1], name, { dx: -0.2, dy: -0.2 }))
        point.addDependency(this)
      }

      // On supprime les marques des points
      this.style = ''
    }

    update (): void {
      this.g.setAttribute('points', listeXY(this.points))
    }

    get style () {
      return this._style
    }

    // Tous les sommets auront le même style de sommet
    set style (style: PointStyle) {
      for (const point of this.points) {
        point.style = style
      }
      this._style = style
    }
}

function listeXY (points: Point[]) {
  const parentFigure = points[0].parentFigure
  let liste = ''
  for (const point of points) {
    liste += `${parentFigure.xToSx(point.x)}, ${parentFigure.yToSy(point.y)} `
  }
  return liste
}
