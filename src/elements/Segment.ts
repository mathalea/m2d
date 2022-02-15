import { Point } from './Point'
import { Element2D } from './Element2D'

export type SegmentStyle = '' | '|-' | '-|' | '|-|'
export type OptionsGraphiques = { color?: string, style?: SegmentStyle, thickness?: number, fill?: string }

export class Segment extends Element2D {
    x1: number
    y1: number
    x2: number
    y2: number
    style : SegmentStyle
    constructor (A: Point, B: Point, { color = 'black', thickness = 1, style = '' }: OptionsGraphiques = {}) {
      super()
      this.x1 = A.x
      this.y1 = A.y
      this.x2 = B.x
      this.y2 = B.y
      this.parentFigure = A.parentFigure
      this.parentFigure.list.push(this)

      const x1Svg = this.parentFigure.xToSx(this.x1)
      const x2Svg = this.parentFigure.xToSx(this.x2)
      const y1Svg = this.parentFigure.yToSy(this.y1)
      const y2Svg = this.parentFigure.yToSy(this.y2)

      const segment = document.createElementNS('http://www.w3.org/2000/svg', 'line')
      segment.setAttribute('x1', `${x1Svg}`)
      segment.setAttribute('y1', `${y1Svg}`)
      segment.setAttribute('x2', `${x2Svg}`)
      segment.setAttribute('y2', `${y2Svg}`)

      this.g = segment
      this.parentFigure.svg.appendChild(this.g)

      // Les styles ne doivent être appliqués qu'une fois le groupe créé
      this.color = color
      this.thickness = thickness
      this.style = style

      // Si une des extrémités se déplace alors on recalcule les coordonnées de line
      A.addDependency({ element: this, type: 'end1' })
      B.addDependency({ element: this, type: 'end2' })
    }

    moveEnd (x: number, y: number, n: 1 | 2) {
      this.g.setAttribute(`x${n}`, this.parentFigure.xToSx(x).toString())
      this.g.setAttribute(`y${n}`, this.parentFigure.yToSy(y).toString())
      this[`x${n}`] = x
      this[`y${n}`] = y
    }

    get tex () {
      const arrayOptions : string[] = []
      if (this.color !== 'black') arrayOptions.push(`color = ${this.color}`)
      if (this.thickness !== 1) arrayOptions.push(`line width = ${this.thickness}`)
      if (this.fill !== 'none') arrayOptions.push(`fill = ${this.fill}`)
      let txtOptions = ''
      if (arrayOptions) txtOptions = `[${arrayOptions.join(', ')}]`
      return `\n \t \\draw${txtOptions} (${this.x1}, ${this.y1}) -- (${this.x2}, ${this.y2});`
    }
}
