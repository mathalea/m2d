/*
 * Created by Angot Rémi and Lhote Jean-Claude on 15/02/2022.
 *
 * MathALEA 2D : Software for animating online dynamic mathematics figures
 * https://coopmaths.fr
 * @Author Angot Rémi and Lhote Jean-Claude (contact@coopmaths.fr)
 * @License: GNU AGPLv3 https://www.gnu.org/licenses/agpl-3.0.html
 */

import { Point } from '../points/Point'
import { PointByRotation } from '../points/PointByRotation'
import { PointOnLineAtD } from '../points/PointOnLineAtD'
import { Line, OptionsGraphiques } from './Line'

export class Segment extends Line {
  constructor (A: Point, B: Point, { color = 'black', thickness = 1, style = '', temp = false, dashed = false }: OptionsGraphiques = {}) {
    super(A, B, { lineType: 'Segment', color, thickness, style, temp, dashed })
    this.parentFigure = A.parentFigure
    if (!temp) this.parentFigure.set.add(this)
    if (A.label && B.label) this.label = `[${A.label}${B.label}]`
    if (!temp) this.parentFigure.svg.appendChild(this.g)

    // Les styles ne doivent être appliqués qu'une fois le groupe créé
    this.color = color
    this.thickness = thickness
    this.style = style
    this.dashed = dashed

    // Si une des extrémités se déplace alors on recalcule les coordonnées de line
    A.addDependency(this)
    B.addDependency(this)
  }

  update () {
    [this.x1, this.y1, this.x2, this.y2] = [this.A.x, this.A.y, this.B.x, this.B.y]
    const x1Svg = this.parentFigure.xToSx(this.x1)
    const x2Svg = this.parentFigure.xToSx(this.x2)
    const y1Svg = this.parentFigure.yToSy(this.y1)
    const y2Svg = this.parentFigure.yToSy(this.y2)
    this.g.setAttribute('x1', `${x1Svg}`)
    this.g.setAttribute('y1', `${y1Svg}`)
    this.g.setAttribute('x2', `${x2Svg}`)
    this.g.setAttribute('y2', `${y2Svg}`)
    this.notifyAllDependencies()
  }

  addDependency (dependency) {
    this.dependencies.push(dependency)
  }

  get latex () {
    const arrayOptions: string[] = []
    if (this.color !== 'black') arrayOptions.push(`color = ${this.color}`)
    if (this.thickness !== 1) arrayOptions.push(`line width = ${this.thickness}`)
    if (this.fill !== 'none') arrayOptions.push(`fill = ${this.fill}`)
    if (this.dashed) arrayOptions.push('dashed')
    let txtOptions = ''
    if (arrayOptions) txtOptions = `[${arrayOptions.join(', ')}]`
    let latex = `\n\t% ${this.label ?? 'Droite'}`
    latex += `\n \t \\draw${txtOptions} (${this.x1}, ${this.y1}) -- (${this.x2}, ${this.y2});`
    return latex
  }

  get style () {
    return this._style
  }

  set style (style: string) {
    this._style = style
    const h = 0.2
    const addBorder1 = () => {
      this.A.style = ''
      const L = new Line(this.A, this.B, { lineType: 'Segment', temp: true })
      const M = new PointOnLineAtD(L, h, { style: '' })
      const A1 = new PointByRotation(M, this.A, 90, { temp: true, style: '' })
      const A2 = new PointByRotation(M, this.A, -90, { style: '' })
      const s = new Segment(A1, A2, { color: this.color, thickness: this.thickness })
      this.group.push(s)
    }
    const addBorder2 = () => {
      this.B.style = ''
      const L = new Line(this.B, this.A, { lineType: 'Segment', temp: true })
      const M = new PointOnLineAtD(L, h, { temp: true, style: '' })
      const B1 = new PointByRotation(M, this.B, 90, { temp: true, style: '' })
      const B2 = new PointByRotation(M, this.B, -90, { temp: true, style: '' })
      const s = new Segment(B1, B2, { color: this.color, thickness: this.thickness })
      this.group.push(s)
    }
    if (style === '|-') addBorder1()
    if (style === '-|') addBorder2()
    if (style === '|-|') {
      addBorder1()
      addBorder2()
    }
  }
}
