import { PointByReflectionOverLine } from './../points/PointByReflectionOverLine'
import { Line } from './Line'
import { PointByHomothetie } from './../points/PointByHomothetie'
import { PointByTranslationVector } from './../points/PointByTranslationVector'
import { Vector } from './../others/Vector'
import { PointByTranslation } from './../points/PointByTranslation'
import { PointBySimilitude } from './../points/PointBySimilitude'
import { Polygon } from './Polygon'
import { PointByRotation } from './../points/PointByRotation'
/*
 * Created by Angot Rémi and Lhote Jean-Claude on 15/02/2022.
 *
 * MathALEA 2D : Software for animating online dynamic mathematics figures
 * https://coopmaths.fr
 * @Author Angot Rémi and Lhote Jean-Claude (contact@coopmaths.fr)
 * @License: GNU AGPLv3 https://www.gnu.org/licenses/agpl-3.0.html
 */

import { Element2D } from '../Element2D'
import { Measure } from '../measures/Measure'
import { Point } from '../points/Point'
/**
 * Crée une ligne brisée ouverte à partir d'un array d'instances de Point.
 */
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

    rotation (center:Point, angle:number|Measure) {
      try {
        const points: Point[] = []
        for (let i = 0; i < this.points.length; i++) {
          points[i] = new PointByRotation(this.points[i], center, angle, { temp: true })
        }
        return new Polygon(...points)
      } catch (error) {
        console.log('Erreur dans PolyLine.rotation()', error)
        return new Polygon(...this.points)
      }
    }

    similitude (center:Point, k: number|Measure, angle:number|Measure) {
      try {
        const points: Point[] = []
        for (let i = 0; i < this.points.length; i++) {
          points[i] = new PointBySimilitude(this.points[i], center, k, angle, { temp: true })
        }
        return new Polygon(...points)
      } catch (error) {
        console.log('Erreur dans PolyLine.similitude()', error)
        return new Polygon(...this.points)
      }
    }

    translationXY (xt:number|Measure, yt:number|Measure) {
      try {
        const points: Point[] = []
        for (let i = 0; i < this.points.length; i++) {
          points[i] = new PointByTranslation(this.points[i], xt, yt, { temp: true })
        }
        return new Polygon(...points)
      } catch (error) {
        console.log('Erreur dans Polyline.translationXY()', error)
        return new Polygon(...this.points)
      }
    }

    translationV (v:Vector) {
      try {
        const points: Point[] = []
        for (let i = 0; i < this.points.length; i++) {
          points[i] = new PointByTranslationVector(this.points[i], v, { temp: true })
        }
        return new Polygon(...points)
      } catch (error) {
        console.log('Erreur dans Polyline.translationV()', error)
        return new Polygon(...this.points)
      }
    }

    homothetie (center:Point, k: number|Measure) {
      try {
        const points: Point[] = []
        for (let i = 0; i < this.points.length; i++) {
          points[i] = new PointByHomothetie(this.points[i], center, k, { temp: true })
        }
        return new Polygon(...points)
      } catch (error) {
        console.log('Erreur dans Polyline.homothetie()', error)
        return new Polygon(...this.points)
      }
    }

    reflectionOverLine (L: Line) {
      try {
        const points: Point[] = []
        for (let i = 0; i < this.points.length; i++) {
          points[i] = new PointByReflectionOverLine(this.points[i], L, { temp: true })
        }
        return new Polygon(...points)
      } catch (error) {
        console.log('Erreur dans Polyline.reflectionOverLine()', error)
        return new Polygon(...this.points)
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
