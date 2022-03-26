/*
 * Created by Angot Rémi and Lhote Jean-Claude on 15/02/2022.
 *
 * MathALEA 2D : Software for animating online dynamic mathematics figures
 * https://coopmaths.fr
 * @Author Angot Rémi and Lhote Jean-Claude (contact@coopmaths.fr)
 * @License: GNU AGPLv3 https://www.gnu.org/licenses/agpl-3.0.html
 */

import { Measure } from '../measures/Measure'
import { Vector } from '../others/Vector'
import { Point } from '../points/Point'
import { PointByHomothetie } from '../points/PointByHomothetie'
import { PointByReflectionOverLine } from '../points/PointByReflectionOverLine'
import { PointByRotation } from '../points/PointByRotation'
import { PointBySimilitude } from '../points/PointBySimilitude'
import { PointByTranslation } from '../points/PointByTranslation'
import { PointByTranslationVector } from '../points/PointByTranslationVector'
import { Line, OptionsGraphiques } from './Line'
/**
 * Crée une demi-droite d'origine A passant par B en appelant le constructeur de Line avec le lineType 'Ray'.
 */
export class Ray extends Line {
  constructor (A: Point, B: Point, { color = 'black', thickness = 1, style = '', dashed = false, temp = false }: OptionsGraphiques = {}) {
    super(A, B, { lineType: 'Ray', color, thickness, style, temp, dashed })
  }

  update (): void {
    try {
      ;[this.x1, this.y1, this.x2, this.y2] = getRayCoordsOut(this.A, this.B)

      const x1Svg = this.parentFigure.xToSx(this.x1)
      const x2Svg = this.parentFigure.xToSx(this.x2)
      const y1Svg = this.parentFigure.yToSy(this.y1)
      const y2Svg = this.parentFigure.yToSy(this.y2)
      this.g.setAttribute('x1', `${x1Svg}`)
      this.g.setAttribute('y1', `${y1Svg}`)
      this.g.setAttribute('x2', `${x2Svg}`)
      this.g.setAttribute('y2', `${y2Svg}`)
      this.notifyAllChilds()
    } catch (error) {
      console.log('Erreur dans Ray.update', error)
      this.exist = false
    }
  }

  rotation (center: Point, angle: number|Measure) {
    try {
      const M = new PointByRotation(this.A, center, angle, { temp: true })
      const N = new PointByRotation(this.B, center, angle, { temp: true })
      return new Ray(M, N)
    } catch (error) {
      console.log('Erreur dans ray.rotation', error)
      return new Ray(this.A, this.B)
    }
  }

  homothetie (center: Point, k:number|Measure) {
    try {
      const M = new PointByHomothetie(this.A, center, k, { temp: true })
      const N = new PointByHomothetie(this.B, center, k, { temp: true })
      return new Ray(M, N)
    } catch (error) {
      console.log('Erreur dans Ray.homothetie()', error)
      return new Ray(this.A, this.B)
    }
  }

  translationV (v: Vector): Line {
    try {
      const M = new PointByTranslationVector(this.A, v, { temp: true })
      const N = new PointByTranslationVector(this.B, v, { temp: true })
      return new Ray(M, N)
    } catch (error) {
      console.log('Erreur dans segment.translationV', error)
      return new Ray(this.A, this.B)
    }
  }

  translationXY (xt:number|Measure, yt:number|Measure): Line {
    try {
      const M = new PointByTranslation(this.A, xt, yt, { temp: true })
      const N = new PointByTranslation(this.B, xt, yt, { temp: true })
      return new Ray(M, N)
    } catch (error) {
      console.log('Erreur dans segment.translationXY', error)
      return new Ray(this.A, this.B)
    }
  }

  reflectionOverLine (L: Line) {
    try {
      const M = new PointByReflectionOverLine(this.A, L, { temp: true })
      const N = new PointByReflectionOverLine(this.B, L, { temp: true })
      return new Ray(M, N)
    } catch (error) {
      console.log('Erreur dans Ray.reflectionOverLine()', error)
      return new Ray(this.A, this.B)
    }
  }

  similitude (center: Point, k: number|Measure, angle: number|Measure) {
    try {
      const M = new PointBySimilitude(this.A, center, k, angle, { temp: true })
      const N = new PointBySimilitude(this.B, center, k, angle, { temp: true })
      return new Ray(M, N)
    } catch (error) {
      console.log('Erreur dans Ray.homothetie()', error)
      return new Ray(this.A, this.B)
    }
  }
}

function getRayCoordsOut (A: Point, B: Point) {
  try {
    const parentFigure = A.parentFigure
    let pente = Infinity
    if (B.x !== A.x) {
      pente = (B.y - A.y) / (B.x - A.x)
    }
    if (pente === Infinity) {
      if (A.y > B.y) return [A.x, A.y, A.x, parentFigure.yMin] // Si la droite est verticale on prend l'abscisse de A et le bon bord en ordonnée
      else return [A.x, A.y, A.x, parentFigure.yMax] // Ici on sort par en haut
    }
    if (Math.abs(pente) < 10 ** -4) {
      if (A.x > B.x) return [A.x, A.y, parentFigure.xMin, A.y]
      else return [A.x, A.y, parentFigure.xMax, A.y]
    }
    let xOutLeft: number, yOutLeft: number
    let n = 0
    if (B.x > A.x) {
      while (true) {
        xOutLeft = A.x + n
        yOutLeft = A.y + n * pente
        n++
        if (xOutLeft > parentFigure.xMax + 1 || yOutLeft > parentFigure.yMax + 1 || yOutLeft < parentFigure.yMin - 1) break
      }
      return [A.x, A.y, xOutLeft, yOutLeft]
    } else {
      while (true) {
        xOutLeft = A.x - n
        yOutLeft = A.y - n * pente
        n++
        if (xOutLeft < parentFigure.xMin - 1 || yOutLeft > parentFigure.yMax + 1 || yOutLeft < parentFigure.yMin - 1) break
      }
      return [A.x, A.y, xOutLeft, yOutLeft]
    }
  } catch (error) {
    console.log('Erreur dans Ray.getRayCoordsOut', error)
    return [NaN, NaN, NaN, NaN]
  }
}
