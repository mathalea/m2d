/*
 * Created by Angot Rémi and Lhote Jean-Claude on 15/02/2022.
 *
 * MathALEA 2D : Software for animating online dynamic mathematics figures
 * https://coopmaths.fr
 * @Author Angot Rémi and Lhote Jean-Claude (contact@coopmaths.fr)
 * @License: GNU AGPLv3 https://www.gnu.org/licenses/agpl-3.0.html
 */

import { Figure } from '../Figure'
import { Measure } from './measures/Measure'

export type optionsElement2D = { color?: string, thickness?: number, fill?: string }

/**
 * Classe parente de tous les éléments de géométrie
 */
export abstract class Element2D {
  parentFigure: Figure
  id: number
  draggable: boolean
  // Un élément de géométrie peut être composé de plusieurs autres éléments de géométrie (plusieurs segments pour marquer un point ou coder un angle par exemple)
  group: Element2D[]
  g: SVGElement
  childs: (Element2D | Measure)[]
  parents: (Element2D | Measure)[]
  // Ces paramètres privés sont mis à jour par les getters équivalents sans le _
  private _color: string
  private _fill: string
  private _thickness: number
  private _opacity: number
  private _fillOpacity: number
  private _dashed: boolean
  private _exist: boolean
  isVisible: boolean

  constructor (parentFigure: Figure) {
    this.parentFigure = parentFigure
    this.id = this.parentFigure.lastId++
    this.parentFigure.dictionnary[this.id] = this
    this.group = []
    this.childs = []
    this.parents = []
    this.g = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    this.isVisible = true
    this._color = 'black'
    this._fill = 'none'
    this._thickness = 2
    this._opacity = 1
    this._fillOpacity = 1
    this._dashed = false
    this.draggable = true
    this._exist = true
  }

  /**
   * Permet d'indiquer à l'objet quel élément (child) dépend de lui.
   */
  addChild (child: Element2D | Measure) {
    this.childs.push(child)
    child.parents.push(this)
  }

  /**
 * Permet de retirer un objet (child) de la liste des enfants.
 */
  removeChild (child: Element2D | Measure) {
    const index = this.childs.indexOf(child)
    if (index > -1) {
      this.childs.splice(index, 1)
    }
    const index2 = child.parents.indexOf(this)
    if (index2 > -1) {
      child.parents.splice(index2, 1)
    }
  }

  /**
 * Appelle de façon récursive la méthode update() de chaque enfant.
 */
  notifyAllChilds () {
    if (this.childs.length > 40) {
      console.log('Nombre de dépendances élevée pour ', this)
    }
    for (const element of this.childs) {
      element.update()
    }
  }

  /**
 * Méthode de mise à jour de l'objet
 */
  abstract update(): void

  hide (changeIsVisible = true) {
    // this.parentFigure.set.delete(this)
    // Tous les membres du groupe auront la même couleur
    for (const e of this.group) {
      e.hide(changeIsVisible)
    }
    if (this.g.children.length > 0) {
      for (const line of Array.from(this.g.children)) {
        line.setAttribute('visibility', 'hidden')
      }
    } else { // Le segment ou le cercle ne sont pas des groupes, ce sont des éléments uniques sans children
      this.g.setAttribute('visibility', 'hidden')
    }
    if (changeIsVisible) this.isVisible = false
  }

  show (changeIsVisible = true) {
    // if (!this.parentFigure.set.has(this)) this.parentFigure.set.add(this)
    if (!changeIsVisible && !this.isVisible) return
    for (const e of this.group) {
      e.show(changeIsVisible)
    }
    if (this.g.children.length > 0) {
      for (const line of Array.from(this.g.children)) {
        line.setAttribute('visibility', 'visible')
      }
    } else { // Le segment ou le cercle ne sont pas des groupes, ce sont des éléments uniques sans children
      this.g.setAttribute('visibility', 'visible')
    }
    if (changeIsVisible) this.isVisible = true
  }

  set exist (arg: boolean) {
    try {
      let allParentsExist = true
      for (const parent of this.parents) {
        if (!parent.exist) {
          allParentsExist = false
          break
        }
      }
      this._exist = arg && allParentsExist
      ;(this._exist && this.isVisible)
        ? this.show(false)
        : this.hide(false)
      for (const e of this.childs) {
        e.exist = this._exist && e.exist
        if (e instanceof Element2D && e.isVisible) this._exist ? e.show(false) : e.hide(false)
      }
    } catch (error) {
      console.log('Erreur dans Element2d.exist()', error)
      this.exist = false
    }
  }

  get exist () {
    return this._exist
  }

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
    for (const e of this.group) {
      e.dashed = isDashed
    }
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

  select () {
    this.parentFigure.selectedElements.push(this)
    if (this.g.children.length > 0) {
      for (const line of Array.from(this.g.children)) {
        line.setAttribute('stroke', 'purple')
        line.setAttribute('stroke-width', '5')
      }
    } else { // Le segment ou le cercle ne sont pas des groupes, ce sont des éléments uniques sans children
      this.g.setAttribute('stroke', 'purple')
      this.g.setAttribute('stroke-width', '5')
    }
  }

  unSelect () {
    this.parentFigure.selectedElements = this.parentFigure.selectedElements.filter((e) => e !== this)
    this.color = this._color
    this.thickness = this._thickness
  }

  setVisibleOnMouseOver () {
    this.g.classList.add('onlyOver')
    this.g.setAttribute('opacity', '0')
  }

  endVisibleOnlyOver () {
    this.g.classList.remove('onlyOver')
    this.g.removeAttribute('opacity')
  }
}
