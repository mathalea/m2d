/*
 * Created by Angot Rémi and Lhote Jean-Claude on 15/02/2022.
 *
 * MathALEA 2D : Software for animating online dynamic mathematics figures
 * https://coopmaths.fr
 * @Author Angot Rémi and Lhote Jean-Claude (contact@coopmaths.fr)
 * @License: GNU AGPLv3 https://www.gnu.org/licenses/agpl-3.0.html
 */

import { Element2D } from '../Element2D'
import { Angle } from '../measures/Angle'
import { Const } from '../measures/Const'
import { Measure } from '../measures/Measure'
import { Coords } from '../others/Coords'
import { Point } from '../points/Point'
import { OptionsGraphiques } from './Line'

export class Arc extends Element2D {
  center: Point
  point: Point
  point2: Coords
  angle: Measure
  horiz: Coords
  private _label: string
  constructor (O: Point, A: Point, angle: number | Measure, { color = 'black', thickness = 1, dashed = false, fill = 'none' }: OptionsGraphiques = {}) {
    super(O.parentFigure)
    this.center = O
    this.point = A
    if (typeof angle === 'number') this.angle = new Const(O.parentFigure, angle)
    else {
      this.angle = angle
      angle.addChild(this)
    }
    this.parentFigure.set.add(this)
    const B = Coords.rotationCoord(A, O, this.angle.value)
    this.point2 = B
    this._label = (O.label ?? '') + (A.label ?? '') + ' ' + this.angle.value.toString() + '°'
    this.horiz = { x: this.center.x + 1, y: this.center.y }
    const radius = this.parentFigure.xToSx(Point.distance(O, A))
    const [large, sweep] = getLargeSweep(this.angle.value)
    this.g = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    this.g.setAttribute('d', `M${this.parentFigure.xToSx(A.x)} ${this.parentFigure.yToSy(A.y)} A ${radius} ${radius} 0 ${large} ${sweep} ${this.parentFigure.xToSx(B.x)} ${this.parentFigure.yToSy(B.y)}`)
    // Ajout des segments ?
    // this.g.setAttribute('d', this.g.getAttribute('d') + `L ${this.parentFigure.xToSx(O.x)} ${this.parentFigure.yToSy(O.y)} Z`)
    this.color = color
    this.fill = fill
    this.thickness = thickness
    this.dashed = dashed
    this.parentFigure.svg.appendChild(this.g)
    A.addChild(this)
    O.addChild(this)
  }

  update (): void {
    try {
      const [large, sweep] = getLargeSweep(this.angle.value)
      this.point2 = Coords.rotationCoord(this.point, this.center, this.angle.value)
      const d = this.parentFigure.xToSx(Point.distance(this.center, this.point))
      this.g.setAttribute('d', `M${this.parentFigure.xToSx(this.point.x)} ${this.parentFigure.yToSy(this.point.y)} A ${d} ${d} 0 ${large} ${sweep} ${this.parentFigure.xToSx(this.point2.x)} ${this.parentFigure.yToSy(this.point2.y)}`)
    } catch (error) {
      console.log('Erreur dans Arc.update()', error)
      this.exist = false
    }
    // Ajout des segments ?
    // this.g.setAttribute('d', this.g.getAttribute('d') + `L ${this.parentFigure.xToSx(this.center.x)} ${this.parentFigure.yToSy(this.center.y)} Z`)
  }

  // ToFix !!! Pas le même qu'en SVG
  get latex (): string {
    if (!this.isVisible || !this.exist) return ''
    try {
      const radius = Point.distance(this.center, this.point)
      const azimut = Angle.angleOriented(this.horiz, this.center, this.point)
      const anglefin = azimut + this.angle.value
      let latex = `\n\n\t% Arc ${this._label}`
      latex += `\n\t\\draw${this.tikzOptions} (${this.point.x},${this.point.y}) arc (${azimut}:${anglefin}:${radius}) ;`
      return latex
    } catch (error) {
      return ''
    }
  }
}

function getLargeSweep (angle: number) {
  try {
    let large: 0 | 1
    let sweep: 0 | 1
    if (angle > 180) {
      angle = angle - 360
      large = 1
      sweep = 0
    } else if (angle < -180) {
      angle = 360 + angle
      large = 1
      sweep = 1
    } else {
      large = 0
      sweep = (angle > 0) ? 0 : 1
    }
    return [large, sweep]
  } catch (error) {
    return [NaN, NaN]
  }
}
