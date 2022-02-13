import { Figure } from '../Figure'
import { Point } from './Point'
import { Segment } from './Segment'

export type optionsElement2D = { color?: string, thickness?: number, fill?: string}

/**
 * Classe parente de tous les éléments de géométrie
 */
export class Element2D {
  drag: boolean
  dragable: boolean
  parentFigure: Figure
  // Un élément de géométrie peut être composé de plusieurs autres éléments de géométrie (plusieurs segments pour marquer un point ou coder un angle par exemple)
  group: Segment[]
  g: SVGElement
  dependencies: {element: Element2D, type: string, x?: number, y?: number, center?: Point, angle?: number, previous?: Point, coeff?: number}[]
  private _color: string
  private _thickness: number
  constructor () {
    this.group = []
    this.dependencies = []
    this.g = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    this.drag = false // drag en cours
    this.parentFigure?.list.push(this)
  }

  get color () {
    return this._color
  }

  set color (color) {
    if (this.g.children.length > 0) {
      for (const line of Array.from(this.g.children)) {
        line.setAttribute('stroke', color)
      }
    } else { // Le segment par exemple n'est pas un groupe mais un élément unique sans children
      this.g.setAttribute('stroke', color)
    }
    this._color = color
  }

  get thickness () {
    return this._thickness
  }

  set thickness (thickness) {
    if (this.g.children.length > 0) {
      for (const line of Array.from(this.g.children)) {
        line.setAttribute('stroke-width', `${thickness}`)
      }
    } else { // Le segment par exemple n'est pas un groupe mais un élément unique sans children
      this.g.setAttribute('stroke-width', `${thickness}`)
    }
    this._thickness = thickness
  }
}
