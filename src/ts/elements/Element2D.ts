/*
 * Created by Angot Rémi and Lhote Jean-Claude on 15/02/2022.
 *
 * MathALEA 2D : Software for animating online dynamic mathematics figures
 * https://coopmaths.fr
 * @Author Angot Rémi and Lhote Jean-Claude (contact@coopmaths.fr)
 * @License: GNU AGPLv3 https://www.gnu.org/licenses/agpl-3.0.html
 */

import { Figure } from '../Figure'
import { Angle } from './measures/Angle'
import { CalculDynamic } from './measures/Calculdynamic'
import { Distance } from './measures/Distance'
import { Measure } from './measures/Measure'

export type optionsElement2D = { color?: string, thickness?: number, fill?: string }
export type Coords = {
  x: number
  y: number
}

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
  private _fillOpacity: number
  private _dashed: boolean
  label: string

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

  abstract update(): void

  get color () {
    return this._color
  }

  set color (color) {
    // Tous les membres du groupe auront la même couleur
    for (const e of this.group) {
      e.color = color
    }
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
    for (const e of this.group) {
      e.thickness = thickness
    }
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

  get fillOpacity () {
    return this._fillOpacity
  }

  set fillOpacity (fillOpacity) {
    if (this.g.children.length > 0) {
      for (const line of Array.from(this.g.children)) {
        line.setAttribute('fill-opacity', `${fillOpacity}`)
      }
    } else { // Le segment par exemple n'est pas un groupe mais un élément unique sans children
      this.g.setAttribute('fill-opacity', `${fillOpacity}`)
    }
    this._fillOpacity = fillOpacity
  }

  get dashed () {
    return this._dashed
  }

  set dashed (isDashed) {
    if (isDashed) {
      this.g.setAttribute('stroke-dasharray', '4 3')
    } else {
      this.g.removeAttribute('stroke-dasharray')
    }
    this._dashed = isDashed
  }

  get latex () {
    return ''
  }

  get tikzOptions () {
    const arrayOptions: string[] = []
    if (this.color !== 'black') arrayOptions.push(`color = ${this.color}`)
    if (this.thickness !== 1) arrayOptions.push(`line width = ${this.thickness}`)
    if (this.fill !== 'none') arrayOptions.push(`fill = ${this.fill}`)
    if (this.opacity !== undefined) arrayOptions.push(`opacity = ${this.opacity}`)
    if (this.fillOpacity !== undefined) arrayOptions.push(`fill opacity = ${this.fillOpacity}`)
    if (this.dashed) arrayOptions.push('dashed')
    let txtOptions = ''
    if (arrayOptions) txtOptions = `[${arrayOptions.join(', ')}]`
    return txtOptions
  }
}
