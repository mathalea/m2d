/*
 * Created by Angot Rémi and Lhote Jean-Claude on 15/02/2022.
 *
 * MathALEA 2D : Software for animating online dynamic mathematics figures
 * https://coopmaths.fr
 * @Author Angot Rémi and Lhote Jean-Claude (contact@coopmaths.fr)
 * @License: GNU AGPLv3 https://www.gnu.org/licenses/agpl-3.0.html
 */

import { Figure } from '../../Figure'
import { Element2D } from '../Element2D'

export class Cross extends Element2D {
    x: number
    y: number
    size: number
    segment1: SVGLineElement
  segment2: SVGLineElement
  label: string
  constructor (svgContainer: Figure, x: number, y: number, { color = 'blue', size = 0.15, thickness = 2 }: {color?: string, size?: number, thickness?: number} = {}) {
    super()
    this.parentFigure = svgContainer
    this.x = x
    this.y = y
    this.size = size
    this.segment1 = document.createElementNS('http://www.w3.org/2000/svg', 'line')
    this.segment2 = document.createElementNS('http://www.w3.org/2000/svg', 'line')
    this.g.appendChild(this.segment1)
    this.g.appendChild(this.segment2)
    this.parentFigure.svg.appendChild(this.g)
    this.update()
    this.color = color
    this.thickness = thickness
    this.parentFigure.set.add(this)
  }

  update (): void {
    const x1Svg = this.parentFigure.xToSx(this.x - this.size)
    const x2Svg = this.parentFigure.xToSx(this.x + this.size)
    const y1Svg = this.parentFigure.yToSy(this.y + this.size)
    const y2Svg = this.parentFigure.yToSy(this.y - this.size)

    const x12Svg = this.parentFigure.xToSx(this.x - this.size)
    const x22Svg = this.parentFigure.xToSx(this.x + this.size)
    const y12Svg = this.parentFigure.yToSy(this.y - this.size)
    const y22Svg = this.parentFigure.yToSy(this.y + this.size)

    this.segment1.setAttribute('x1', `${x1Svg}`)
    this.segment1.setAttribute('y1', `${y1Svg}`)
    this.segment1.setAttribute('x2', `${x2Svg}`)
    this.segment1.setAttribute('y2', `${y2Svg}`)
    this.segment2.setAttribute('x1', `${x12Svg}`)
    this.segment2.setAttribute('y1', `${y12Svg}`)
    this.segment2.setAttribute('x2', `${x22Svg}`)
    this.segment2.setAttribute('y2', `${y22Svg}`)
  }

  get latex () {
    const arrayOptions : string[] = []
    if (this.color !== 'black') arrayOptions.push(`color = ${this.color}`)
    if (this.thickness !== 1) arrayOptions.push(`line width = ${this.thickness}`)
    if (this.fill !== 'none') arrayOptions.push(`fill = ${this.fill}`)
    let txtOptions = ''
    if (arrayOptions) txtOptions = `[${arrayOptions.join(', ')}]`
    let tex = `\n\t % Point ${this.label ?? ''}`
    tex += `\n \t \\draw${txtOptions} (${this.x - this.size}, ${this.y + this.size}) -- (${this.x + this.size}, ${this.y - this.size});`
    tex += `\n \t \\draw${txtOptions} (${this.x - this.size}, ${this.y - this.size}) -- (${this.x + this.size}, ${this.y + this.size});`
    return tex
  }
}
