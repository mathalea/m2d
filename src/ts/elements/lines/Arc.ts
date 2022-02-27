/*
 * Created by Angot Rémi and Lhote Jean-Claude on 15/02/2022.
 *
 * MathALEA 2D : Software for animating online dynamic mathematics figures
 * https://coopmaths.fr
 * @Author Angot Rémi and Lhote Jean-Claude (contact@coopmaths.fr)
 * @License: GNU AGPLv3 https://www.gnu.org/licenses/agpl-3.0.html
 */

import { distance } from '../../calculus/random'
import { angleOriented } from '../../calculus/trigonometry'
import { Element2D } from '../Element2D'
import { Point } from '../points/Point'
import { PointByRotation } from '../points/PointByRotation'
import { OptionsGraphiques } from './Line'

export class Arc extends Element2D {
  center: Point
  point: Point
  point2: Point
  angle: number
  constructor(O: Point, A: Point, angle: number, { color = 'black' }: OptionsGraphiques = {}) {
    super()
    this.center = O
    this.point = A
    this.angle = angle
    this.parentFigure = O.parentFigure
    this.parentFigure.set.add(this)
    const B = new PointByRotation(A, O, angle, { temp: true })
    this.point2 = B
    const radius = distance(O, A)
    const [large, sweep] = getLargeSweep(angle)
    this.g = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    this.g.setAttribute('d', `M${this.parentFigure.xToSx(A.x)} ${this.parentFigure.yToSy(A.y)} A ${this.parentFigure.xToSx(radius)} ${this.parentFigure.xToSx(radius)} 0 ${large} ${sweep} ${this.parentFigure.xToSx(B.x)} ${this.parentFigure.yToSy(B.y)}`)
    this.g.setAttribute('d', this.g.getAttribute('d') + `L ${this.parentFigure.xToSx(O.x)} ${this.parentFigure.yToSy(O.y)} Z`)
    this.color = color
    this.fill = 'none'
    this.parentFigure.svg.appendChild(this.g)
    A.addDependency(this)
    O.addDependency(this)
    // ToDo : Ajouter dépendance à l'angle s'il est dynamique
  }

  update(): void {
    const [large, sweep] = getLargeSweep(this.angle)
    const d = distance(this.center, this.point)
    this.g.setAttribute('d', `M${this.parentFigure.xToSx(this.point.x)} ${this.parentFigure.yToSy(this.point.y)} A ${this.parentFigure.xToSx(d)} ${this.parentFigure.xToSx(d)} 0 ${large} ${sweep} ${this.parentFigure.xToSx(this.point2.x)} ${this.parentFigure.yToSy(this.point2.y)}`)
    this.g.setAttribute('d', this.g.getAttribute('d') + `L ${this.parentFigure.xToSx(this.center.x)} ${this.parentFigure.yToSy(this.center.y)} Z`)
  }

  // ToFix !!! Pas le même qu'en SVG
  get latex(): string {
    const radius = distance(this.center, this.point)
    const azimut = angleOriented(this.point, this.center, this.point2)
    const anglefin = azimut + this.angle
    const arrayOptions: string[] = []
    if (this.color !== 'black') arrayOptions.push(`color = ${this.color}`)
    if (this.thickness !== 1) arrayOptions.push(`line width = ${this.thickness}`)
    if (this.fill !== 'none') arrayOptions.push(`fill = ${this.fill}`)
    let txtOptions = ''
    if (arrayOptions) txtOptions = `[${arrayOptions.join(', ')}]`
    return `\n\t\\draw${txtOptions} (${this.point.x},${this.point.y}) arc (${azimut}:${anglefin}:${radius}) ;`
  }
}

function getLargeSweep(angle) {
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
