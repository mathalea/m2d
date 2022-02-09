import { Element2D } from './Element2D'
import { Point} from './Point'

export class Polygone extends Element2D {
    points: Point[]
    fill: string
    constructor (...points: Point[]) {
        super()
        this.points = points
        this.fill = 'none'
    }

    svgContainer (pixelsPerCm:number = 30) {
        let binomeXY = ''
        for (const point of this.points) {
            binomeXY += `${(point.x * pixelsPerCm)},${(-point.y * pixelsPerCm)} `
    }
        const polygon = document.createElementNS("http://www.w3.org/2000/svg",'polygon')
        polygon.setAttribute('stroke',`${this.color}`)
        polygon.setAttribute('stroke-width', `${this.thickness}`)
        polygon.setAttribute('points', `${binomeXY}`)
        polygon.setAttribute('fill', `${this.fill}`)
        if (this.id) polygon.setAttribute('id', `${this.id}`)
        return polygon
    }
}