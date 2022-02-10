import { Segment } from "./Segment"

export type optionsElement2D = { color?: string, thickness?: number, fill?: string}

/**
 * Classe parente de tous les éléments de géométrie
 */
export class Element2D {
    color: string
    thickness: number
    drag: boolean
    // Un élément de géométrie peut être composé de plusieurs autres éléments de géométrie (plusieurs segments pour marquer un point ou coder un angle par exemple)
    group: Segment[]
    id: string
    svgElement: SVGElement
    dependences: {object: Element2D, type: string}[]
    constructor () {
        this.color = 'black'
        this.thickness = 1
        this.group = []
        this.dependences = []
        this.id = ''
        this.svgElement = document.createElementNS("http://www.w3.org/2000/svg", 'g')
        this.drag = false
    }
}