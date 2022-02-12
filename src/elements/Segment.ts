import { Point } from './Point'
import { Element2D } from './Element2D'
import { Figure } from '../Figure'

export type SegmentStyle = '' | '|-' | '-|' | '|-|'
export type OptionsSegment = { color?: string, style?: SegmentStyle, thickness?: number }

export class Segment extends Element2D {
    x1: number
    y1: number
    x2: number
    y2: number
    parentFigure: Figure
    g: SVGElement
    style : SegmentStyle
    constructor (A: Point, B: Point, parentFigure: Figure, { color = 'black', thickness = 1, style = '' }: OptionsSegment = {}) {
      super()
      this.x1 = A.x
      this.y1 = A.y
      this.x2 = B.x
      this.y2 = B.y
      this.parentFigure = parentFigure
      this.color = color
      this.thickness = thickness
      this.style = style

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
      // On ajoute le groupe au dom que s'il a des enfants
      this.parentFigure.svg.appendChild(this.g)

      // Les styles ne doivent être appliqués qu'une fois le groupe créé
      this.color = color
      this.thickness = thickness

      // Pour les points de construction pas besoin de gérer les dépendances
      if (!A.temp && !B.temp) {
        A.addDependency({ element: this, type: 'end1' })
        B.addDependency({ element: this, type: 'end2' })
      }
    }

    moveTranslation (x: number, y: number) {
      this.g.setAttribute('x1', this.parentFigure.xToSx(this.x1 + x).toString())
      this.g.setAttribute('x2', this.parentFigure.xToSx(this.x2 + x).toString())
      this.g.setAttribute('y1', this.parentFigure.yToSy(this.y1 + y).toString())
      this.g.setAttribute('y2', this.parentFigure.yToSy(this.y2 + y).toString())
      this.x1 += x
      this.x2 += x
      this.y1 += y
      this.y2 += y
    }

    moveEnd (x: number, y: number, n: 1 | 2) {
      this.g.setAttribute(`x${n}`, this.parentFigure.xToSx(x).toString())
      this.g.setAttribute(`y${n}`, this.parentFigure.yToSy(y).toString())
      this[`x${n}`] = x
      this[`y${n}`] = y
    }
}
