import { Element2D } from "./elements/Element2D"
import { Point } from "./elements/Point"
import { Segment } from "./elements/Segment"



export class M2d {
    width: number
    height: number
    id: string
    pixelsPerUnit: number
    list: Element2D[] = []
    xMin: number
    xMax: number
    yMin: number
    yMax: number
    svgElement: SVGElement
    constructor({ width = 600, height = 400, id = 'm2d', pixelsPerUnit = 30, xMin = -10, yMin = -12 }: { width?: number, height?: number, id?: string, pixelsPerUnit?: number, xMin?: number, yMin?: number } = {}) {
        this.width = width
        this.height = height
        this.id = id
        this.pixelsPerUnit = pixelsPerUnit
        this.xMin = xMin
        this.xMax = xMin + width / pixelsPerUnit
        this.yMin = yMin
        this.yMax = yMin + width / pixelsPerUnit
        this.list = []

        this.svgElement = document.createElementNS("http://www.w3.org/2000/svg", 'svg')
        this.svgElement.style.width = `${this.width}px`
        this.svgElement.style.height = `${this.height}px`
        this.svgElement.id = this.id
        this.svgElement.setAttribute('viewBox', `${this.xToxSvg(this.xMin)} ${this.yToySvg(this.yMax)} ${this.width} ${this.height}`)
    }

    /**
     * abscisse de nos coordonnées => abscisse du SVG
     * @param x number 
     * @returns number 
     */
    xToxSvg (x: number) {
        return x * this.pixelsPerUnit
    }
    
    /**
     * ordonnée de nos coordonnées => ordonnée du SVG
     * @param y number 
     * @returns number 
     */
    yToySvg (y: number) {
        return - y * this.pixelsPerUnit
    }
    
    /**
     * abscisse du SVG => abscisse de nos coordonnées
     * @param x number 
     * @returns number 
     */
    xSvgTox (x: number) {
        return x / this.pixelsPerUnit
    }
    
    /**
     * ordonnée du SVG => ordonnée de nos coordonnées
     * @param y number 
     * @returns number 
     */
    ySvgToy (y: number) {
        return - y * this.pixelsPerUnit
    }


    segment(A: Point, B: Point) {
        const s = new Segment(A, B, this)
        const segmentElementSvg = s.svgElement
        this.svgElement.appendChild(segmentElementSvg)
        return s
    }

    point(x: number, y: number) {
        const A = new Point(x, y, this, {style: 'x'})
        const pointElementSvg = A.svgElement
        this.svgElement.appendChild(pointElementSvg)
        return A
    }
}