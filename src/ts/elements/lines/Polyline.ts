import { Element2D } from '../Element2D'
import { Point } from '../points/Point'

export class Polyline extends Element2D {
    points: Point[]
    constructor (...points: Point[]) {
      super()
      this.points = points
      this.parentFigure = points[0].parentFigure
      this.g = document.createElementNS('http://www.w3.org/2000/svg', 'polyline')
      this.g.setAttribute('points', `${listeXY(this.points)}`)
      this.g.setAttribute('fill', 'none')
      this.g.setAttribute('stroke', 'black')
      this.parentFigure.svg.appendChild(this.g)
      this.parentFigure.set.add(this)
      for (const point of points) {
        point.addDependency(this)
      }
    }

    update (): void {
      this.g.setAttribute('points', `${listeXY(this.points)}`)
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
