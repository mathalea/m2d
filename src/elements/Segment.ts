import { Point } from './Point'
import { Element2D } from './Element2D'
import { Figure } from '../Figure'

export type OptionsSegment = { color?: string, style?: '' | '|-' | '-|' | '|-|', thickness?: number }

export class Segment extends Element2D {
    x1: number
    y1: number
    x2: number
    y2: number
    svgContainer: Figure
    g: SVGElement
    style : '' | '|-' | '-|' | '|-|'
    constructor(A: Point, B: Point, svgContainer: Figure, { color = 'black', thickness = 1, style = '' }: OptionsSegment = {}) {
        super()
        this.x1 = A.x
        this.y1 = A.y
        this.x2 = B.x
        this.y2 = B.y
        this.svgContainer = svgContainer
        this.color = color
        this.thickness = thickness
        this.style = style

        const x1Svg = this.svgContainer.xToSx(this.x1)
        const x2Svg = this.svgContainer.xToSx(this.x2)
        const y1Svg = this.svgContainer.yToSy(this.y1)
        const y2Svg = this.svgContainer.yToSy(this.y2)

        const segment = document.createElementNS("http://www.w3.org/2000/svg", 'line')
        segment.setAttribute('x1', `${x1Svg}`)
        segment.setAttribute('y1', `${y1Svg}`)
        segment.setAttribute('x2', `${x2Svg}`)
        segment.setAttribute('y2', `${y2Svg}`)
        segment.setAttribute('stroke', `${this.color}`)
        segment.setAttribute('stroke-width', `${this.thickness}`)

        this.g = segment

        A.notifyDependency({ element: this, type: 'end1' })
        B.notifyDependency({ element: this, type: 'end2' })
    }

    moveTranslation(x: number, y: number) {
        this.g.setAttribute('x1', this.svgContainer.xToSx(this.x1 + x).toString())
        this.g.setAttribute('x2', this.svgContainer.xToSx(this.x2 + x).toString())
        this.g.setAttribute('y1', this.svgContainer.yToSy(this.y1 + y).toString())
        this.g.setAttribute('y2', this.svgContainer.yToSy(this.y2 + y).toString())
        this.x1 += x
        this.x2 += x
        this.y1 += y
        this.y2 += y
    }

    moveEnd(x: number, y: number, n: 1 | 2) {
        this.g.setAttribute(`x${n}`, this.svgContainer.xToSx(x).toString())
        this.g.setAttribute(`y${n}`, this.svgContainer.yToSy(y).toString())
        this[`x${n}`] = x
        this[`y${n}`] = y
    }

}