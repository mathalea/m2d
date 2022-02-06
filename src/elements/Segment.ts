import { Point} from './Point'
import { Element2D } from './Element2D'

export class Segment extends Element2D {
    x1: number
    y1: number
    x2: number
    y2: number
    constructor(A: Point, B: Point) {
        super()
        this.x1 = A.x
        this.y1 = A.y
        this.x2 = B.x
        this.y2 = B.y
    }

    svg (pixelsPerCm = 30) {
        const x1Svg = this.x1 * pixelsPerCm
        const x2Svg = this.x2 * pixelsPerCm
        const y1Svg = - this.y1 * pixelsPerCm
        const y2Svg = - this.y2 * pixelsPerCm
        const segment = document.createElementNS("http://www.w3.org/2000/svg",'line')
        segment.setAttribute('x1', `${x1Svg}`)
        segment.setAttribute('y1', `${y1Svg}`)
        segment.setAttribute('x2', `${x2Svg}`)
        segment.setAttribute('y2', `${y2Svg}`)
        segment.setAttribute('stroke',`${this.color}`)
        segment.setAttribute('stroke-width', `${this.thickness}`)
        if (this.id) segment.setAttribute('id', `${this.id}`)
        return segment
    }
}