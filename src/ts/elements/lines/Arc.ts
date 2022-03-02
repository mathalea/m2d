/*
 * Created by Angot Rémi and Lhote Jean-Claude on 15/02/2022.
 *
 * MathALEA 2D : Software for animating online dynamic mathematics figures
 * https://coopmaths.fr
 * @Author Angot Rémi and Lhote Jean-Claude (contact@coopmaths.fr)
 * @License: GNU AGPLv3 https://www.gnu.org/licenses/agpl-3.0.html
 */

import { distance } from '../../calculus/random'
import { rotationCoord } from '../../calculus/transformation'
import { angleOriented } from '../../calculus/trigonometry'
import { Coords, Element2D } from '../Element2D'
import { Angle } from '../measures/Angle'
import { Measure } from '../measures/Measure'
import { Point } from '../points/Point'
import { OptionsGraphiques } from './Line'

export class Arc extends Element2D {
  center: Point
  point: Point
  point2: Coords
  angle: number | Angle
  horiz: Coords
  constructor (O: Point, A: Point, angle: number | Angle, { color = 'black', thickness = 1, dashed = false, fill = 'none' }: OptionsGraphiques = {}) {
    super()
    this.center = O
    this.point = A
    this.angle = angle
    this.parentFigure = O.parentFigure
    this.parentFigure.set.add(this)
    const angleMeasure = (typeof angle === 'number') ? angle : angle.value
    const B = rotationCoord(A, O, angleMeasure)
    this.point2 = B
    this.label = (O.label ?? '') + (A.label ?? '') + ' ' + angleMeasure.toString() + '°'
    this.horiz = { x: this.center.x + 1, y: this.center.y }
    const radius = this.parentFigure.xToSx(distance(O, A))
    const [large, sweep] = getLargeSweep(angleMeasure)
    this.g = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    this.g.setAttribute('d', `M${this.parentFigure.xToSx(A.x)} ${this.parentFigure.yToSy(A.y)} A ${radius} ${radius} 0 ${large} ${sweep} ${this.parentFigure.xToSx(B.x)} ${this.parentFigure.yToSy(B.y)}`)
    // Ajout des segments ?
    // this.g.setAttribute('d', this.g.getAttribute('d') + `L ${this.parentFigure.xToSx(O.x)} ${this.parentFigure.yToSy(O.y)} Z`)
    this.color = color
    this.fill = fill
    this.thickness = thickness
    this.dashed = dashed
    this.parentFigure.svg.appendChild(this.g)
    A.addDependency(this)
    O.addDependency(this)
    if (angle instanceof Measure) angle.addDependency(this)
  }

  update (): void {
    const angleMeasure = (typeof this.angle === 'number') ? this.angle : this.angle.value
    const [large, sweep] = getLargeSweep(angleMeasure)
    this.point2 = rotationCoord(this.point, this.center, angleMeasure)
    const d = this.parentFigure.xToSx(distance(this.center, this.point))
    this.g.setAttribute('d', `M${this.parentFigure.xToSx(this.point.x)} ${this.parentFigure.yToSy(this.point.y)} A ${d} ${d} 0 ${large} ${sweep} ${this.parentFigure.xToSx(this.point2.x)} ${this.parentFigure.yToSy(this.point2.y)}`)
    // Ajout des segments ?
    // this.g.setAttribute('d', this.g.getAttribute('d') + `L ${this.parentFigure.xToSx(this.center.x)} ${this.parentFigure.yToSy(this.center.y)} Z`)
  }

  // ToFix !!! Pas le même qu'en SVG
  get latex (): string {
    const angleMeasure = (typeof this.angle === 'number') ? this.angle : this.angle.value
    const radius = distance(this.center, this.point)
    const azimut = angleOriented(this.horiz, this.center, this.point)
    const anglefin = azimut + angleMeasure
    let latex = `\n\n\t% Arc ${this.label}`
    latex += `\n\t\\draw${this.tikzOptions} (${this.point.x},${this.point.y}) arc (${azimut}:${anglefin}:${radius}) ;`
    return latex
  }
}

function getLargeSweep (angle) {
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
}
