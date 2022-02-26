import { Figure } from '../Figure'
import { Angle } from './measures/Angle'
import { CalculDynamic } from './measures/Calculdynamic'
import { Distance } from './measures/Distance'
import { Measure } from './measures/Measure'

export type optionsElement2D = { color?: string, thickness?: number, fill?: string}

/**
 * Classe parente de tous les éléments de géométrie
 */
export abstract class Element2D {
  draggable: any
  parentFigure: Figure
  // Un élément de géométrie peut être composé de plusieurs autres éléments de géométrie (plusieurs segments pour marquer un point ou coder un angle par exemple)
  group: Element2D[]
  g: SVGElement
  dependencies: (Element2D | Measure)[]
  private _color: string
  private _fill: string
  private _thickness: number
  private _opacity: number
  constructor () {
    this.group = []
    this.dependencies = []
    this.g = document.createElementNS('http://www.w3.org/2000/svg', 'g')
  }

  /**
   * Permet d'indiquer au point que sa position dépend d'autres éléments
   * @param dependency
   */
  addDependency (dependency: Element2D | Angle | Distance | CalculDynamic | Measure) {
    this.dependencies.push(dependency)
  }

  notifyAllDependencies () {
    for (const element of this.dependencies) {
      element.update()
    }
  }

  abstract update ():void

  get color () {
    return this._color
  }

  set color (color) {
    if (this.g.children.length > 0) {
      for (const line of Array.from(this.g.children)) {
        line.setAttribute('stroke', color)
      }
    } else { // Le segment ou le cercle ne sont pas des groupes, ce sont des éléments uniques sans children
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

  get fill () {
    return this._fill || 'none'
  }

  set fill (fill) {
    if (this.g.children.length > 0) {
      for (const line of Array.from(this.g.children)) {
        line.setAttribute('fill', `${fill}`)
      }
    } else { // Le segment par exemple n'est pas un groupe mais un élément unique sans children
      this.g.setAttribute('fill', `${fill}`)
    }
    this._fill = fill
  }

  get opacity () {
    return this._opacity
  }

  set opacity (opacity) {
    if (this.g.children.length > 0) {
      for (const line of Array.from(this.g.children)) {
        line.setAttribute('opacity', `${opacity}`)
      }
    } else { // Le segment par exemple n'est pas un groupe mais un élément unique sans children
      this.g.setAttribute('opacity', `${opacity}`)
    }
    this._opacity = opacity
  }

  get latex () {
    return ''
  }
}
