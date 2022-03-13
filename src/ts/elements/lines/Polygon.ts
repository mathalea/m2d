/*
 * Created by Angot Rémi and Lhote Jean-Claude on 15/02/2022.
 *
 * MathALEA 2D : Software for animating online dynamic mathematics figures
 * https://coopmaths.fr
 * @Author Angot Rémi and Lhote Jean-Claude (contact@coopmaths.fr)
 * @License: GNU AGPLv3 https://www.gnu.org/licenses/agpl-3.0.html
 */

import { Barycenter } from '../points/Barycenter'
import { Element2D } from '../Element2D'
import { Point, PointStyle } from '../points/Point'
import { PointOnLineAtD } from '../points/PointOnLineAtD'
import { Segment } from './Segment'
import { TextByPoint } from '../texts/TextByPoint'

export class Polygon extends Element2D {
  points: Point[]
  labelsPoints: Point[]
  barycenter: Point
  labels: TextByPoint[]
  label: string
  // ToFix il manque une méthode color mais comment savoir que l'on clique sur un polygone (il faut créer des segments virtuels ?)
    private _style: PointStyle
    constructor (...points: Point[]) {
      super(points[0].parentFigure)
      this.points = points
      this._style = ''
      this.fill = 'none'
      this.opacity = 1
      this.labels = []
      this.labelsPoints = []

      this.g = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
      this.g.setAttribute('points', listeXY(this.points))
      this.g.setAttribute('fill', 'none')
      this.g.setAttribute('stroke', 'black')
      this.parentFigure.svg.appendChild(this.g)
      this.parentFigure.set.add(this)

      this.barycenter = new Barycenter(this.points, { temp: true })
      this.label = this.points.reduce((name, currentLabel) => name + currentLabel.label, '')
      for (const point of points) {
        this.labelsPoints.push(new PointOnLineAtD(new Segment(point, this.barycenter, { temp: true }), -0.5, { temp: true, style: '' }))
        const name = point.label ?? ''
        // Le label du point est effacé pour être rattaché à un nouveau point qui dépend du barycentre
        if (point.labelElement) {
          point.labelElement.g.remove()
          point.parentFigure.set.delete(point.labelElement)
        }
        if (name) point.labelElement = (new TextByPoint(this.labelsPoints[this.labelsPoints.length - 1], name))
        point.addChild(this)
      }

      // On supprime les marques des points
      this.style = ''
    }

    update (): void {
      try {
        this.g.setAttribute('points', listeXY(this.points))
      } catch (error) {
        console.log('Erreur dans Polygone.update', error)
        this.exist = false
      }
    }

    get style () {
      return this._style
    }

    // Tous les sommets auront le même style de sommet
    set style (style: PointStyle) {
      try {
        for (const point of this.points) {
          point.style = style
        }
        this._style = style
      } catch (error) {
        console.log('Erreur dans Polygone.style', error)
      }
    }

    get latex (): string {
      try {
        if (!this.isVisible || !this.exist) return ''
        let latex = `\n\n\t% Polygone ${this.label}`
        latex += `\n\t\\draw${this.tikzOptions} ${listeXYLatex(this.points)};`
        return latex
      } catch (error) {
        console.log('Erreur dans Polygone.latex()', error)
        return ''
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
    console.log('Erreur dans Polygone.listeXY', error)
    return ''
  }
}

function listeXYLatex (points: Point[]) {
  try {
    let liste = ''
    for (const point of points) {
      liste += `(${point.x}, ${point.y})--`
    }
    liste += 'cycle'
    return liste
  } catch (error) {
    console.log('Erreur dans Polygon.listeXYLatex', error)
  }
}
