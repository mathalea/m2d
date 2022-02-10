import { Figure } from '../Figure'
import { Element2D } from './Element2D'
import { Point } from './Point'
import { Segment } from './Segment'

export class Polygon extends Element2D {
    points: Point[]
    fill: string
    svgContainer: Figure
    constructor(svgContainer: Figure, points: Point[], {color = 'black'} : {color?: string} = {}) {
        super()
        this.svgContainer = svgContainer
        this.points = points
        this.fill = 'none'
        this.color = color

        const groupSvg = document.createElementNS("http://www.w3.org/2000/svg", 'g')
        for (let i = 0; i < this.points.length - 1; i++) {
            const s = new Segment(this.points[i], this.points[i + 1], this.svgContainer, {color: this.color, thickness: this.thickness})
            groupSvg.appendChild(s.g)
        }
        const s = new Segment(this.points[0], this.points[this.points.length - 1], this.svgContainer, {color: this.color, thickness: this.thickness})
        groupSvg.appendChild(s.g)
        this.g = groupSvg
    }
}
