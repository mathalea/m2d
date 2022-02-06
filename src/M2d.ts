import { Element2D } from "./elements/Element2D"

/**
 * Espace de travail 
 */
export class M2d {
    width: number
    height: number
    id: string
    pixelsPerCm: number
    list: Element2D[] = []
    constructor ({width = 600, height = 400, id = 'm2d', pixelsPerCm = 30} : {width?: number, height?: number, k?: number, id?: string, pixelsPerCm?: number} = {}) {
        this.width = width
        this.height = height
        this.id = id
        this.pixelsPerCm = pixelsPerCm
    }

    get svg () {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg')
        svg.style.width = `${this.width}px`
        svg.style.height = `${this.height}px`
        svg.id = this.id
        svg.setAttribute('viewBox', `-200 -200 ${this.width} ${this.height}`)
        let i = 1
        for (const element of this.list) {
            const id = this.id + i
            i++
            element.id = id
            const elementSvg = element.svg(this.pixelsPerCm)
            svg.appendChild(elementSvg)
        }
        return svg
    }
}