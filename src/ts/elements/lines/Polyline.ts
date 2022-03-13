/*
 * Created by Angot Rémi and Lhote Jean-Claude on 15/02/2022.
 *
 * MathALEA 2D : Software for animating online dynamic mathematics figures
 * https://coopmaths.fr
 * @Author Angot Rémi and Lhote Jean-Claude (contact@coopmaths.fr)
 * @License: GNU AGPLv3 https://www.gnu.org/licenses/agpl-3.0.html
 */

import { Element2D } from '../Element2D'
import { Point } from '../points/Point'

export class Polyline extends Element2D {
    points: Point[]
    constructor (...points: Point[]) {
      super(points[0].parentFigure)
      this.points = points
      this.g = document.createElementNS('http://www.w3.org/2000/svg', 'polyline')
      this.g.setAttribute('points', `${listeXY(this.points)}`)
      this.g.setAttribute('fill', 'none')
      this.g.setAttribute('stroke', 'black')
      this.parentFigure.svg.appendChild(this.g)
      this.parentFigure.set.add(this)
      for (const point of points) {
        point.addChild(this)
      }
    }

    update (): void {
      try {
        this.g.setAttribute('points', `${listeXY(this.points)}`)
      } catch (error) {
        console.log('Erreur dans Polyline.update', error)
        this.exist = false
      }
    }
}

function listeXY (points: Point[]) {
  try {
    const parentFigure = points[0].parentFigure
    let liste = ''
    for (const point of points) {
      liste += `${parentFigure.xToSx(point.x)}, ${parentFigure.yToSy(point.y)} `
    }
    return liste
  } catch (error) {
    console.log('Erreur dans Polyline.listeXY', error)
    return []
  }
}
