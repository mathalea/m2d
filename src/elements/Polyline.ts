import { Element2D } from './Element2D'
import { Point} from './Point'

export class Polyline extends Element2D {
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
        const polyline = document.createElementNS("http://www.w3.org/2000/svg",'polyline')
        polyline.setAttribute('stroke',`${this.color}`)
        polyline.setAttribute('stroke-width', `${this.thickness}`)
        polyline.setAttribute('points', `${binomeXY}`)
        polyline.setAttribute('fill', `${this.fill}`)
        if (this.id) polyline.setAttribute('id', `${this.id}`)
        return polyline
    }
}