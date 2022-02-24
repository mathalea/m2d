import { Figure } from '../Figure'
import { Element2D } from './Element2D'
import { Point, PointStyle } from './Point'

export class Polygon extends Element2D {
    points: Point[]
    parentFigure: Figure
    private _style: PointStyle
    constructor (...points: Point[]) {
      super()
      this.parentFigure = points[0].parentFigure
      this.points = points
      this.fill = 'none'

      this.g = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
      this.g.setAttribute('points', listeXY(this.points))
      this.g.setAttribute('fill', 'none')
      this.g.setAttribute('stroke', 'black')
      this.parentFigure.svg.appendChild(this.g)

      for (const point of points) {
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
