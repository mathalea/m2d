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
import { PointByRotation } from '../points/PointByRotation'
import { PointOnLineAtD } from '../points/PointOnLineAtD'
import { Line, OptionsGraphiques } from './Line'
import { Polyline } from './Polyline'

export class Segment extends Line {
  constructor (A: Point, B: Point, { color = 'black', thickness = 1, style = '', temp = false, dashed = false }: OptionsGraphiques = {}) {
    super(A, B, { lineType: 'Segment', color, thickness, style, temp, dashed })
    if (!temp) this.parentFigure.set.add(this)
    if (A.label && B.label) this._label = `[${A.label}${B.label}]`
    if (!temp) this.parentFigure.svg.appendChild(this.g)

    // Les styles ne doivent être appliqués qu'une fois le groupe créé
    this.color = color
    this.thickness = thickness
    this.style = style
    this.dashed = dashed
    // Les dépendances sont gérées dans Line
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
    this.notifyAllChilds()
  }

  addChild (child: Element2D | Measure) {
    this.childs.push(child)
  }

  get latex () {
    if (!this.isVisible) return ''
    let latex = `\n\n\t% ${this._label ?? 'Segment'}`
    latex += `\n \t \\draw${this.tikzOptions} (${this.x1}, ${this.y1}) -- (${this.x2}, ${this.y2});`
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
      this.B.style = ''
      const L = new Line(this.A, this.B, { lineType: 'Segment', temp: true })
      const M = new PointOnLineAtD(L, h, { style: '' })
      const A1 = new PointByRotation(M, this.A, 90, { temp: true, style: '' })
      const A2 = new PointByRotation(M, this.A, -90, { temp: true, style: '' })
      const s = new Segment(A1, A2, { color: this.color, thickness: this.thickness })
      this.group.push(s)
    }
    const addBorder2 = () => {
      this.A.style = ''
      this.B.style = ''
      const L = new Line(this.B, this.A, { lineType: 'Segment', temp: true })
      const M = new PointOnLineAtD(L, h, { temp: true, style: '' })
      const B1 = new PointByRotation(M, this.B, 90, { temp: true, style: '' })
      const B2 = new PointByRotation(M, this.B, -90, { temp: true, style: '' })
      const s = new Segment(B1, B2, { color: this.color, thickness: this.thickness })
      this.group.push(s)
    }
    const addArrow1 = () => {
      this.A.style = ''
      this.B.style = ''
      const L = new Line(this.A, this.B, { lineType: 'Segment', temp: true })
      const M = new PointOnLineAtD(L, 3 * h, { temp: true, style: '' })
      const A1 = new PointByRotation(M, this.A, 30, { temp: true, style: '' })
      const A2 = new PointByRotation(M, this.A, -30, { temp: true, style: '' })
      const s = new Polyline(A1, this.A, A2)
      s.color = this.color
      s.thickness = this.thickness
      this.group.push(s)
    }
    const addArrow2 = () => {
      this.A.style = ''
      this.B.style = ''
      const L = new Line(this.B, this.A, { lineType: 'Segment', temp: true })
      const M = new PointOnLineAtD(L, 3 * h, { temp: true, style: '' })
      const B1 = new PointByRotation(M, this.B, 30, { temp: true, style: '' })
      const B2 = new PointByRotation(M, this.B, -30, { temp: true, style: '' })
      const s = new Polyline(B1, this.B, B2)
      s.color = this.color
      s.thickness = this.thickness
      this.group.push(s)
    }
    if (style === '|-') addBorder1()
    else if (style === '-|') addBorder2()
    else if (style === '|-|') {
      addBorder1()
      addBorder2()
    } else if (style === '<-') addArrow1()
    else if (style === '->') addArrow2()
    else if (style === '<->') {
      addArrow1()
      addArrow2()
    }
  }
}
