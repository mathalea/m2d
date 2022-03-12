/*
 * Created by Angot Rémi and Lhote Jean-Claude on 15/02/2022.
 *
 * MathALEA 2D : Software for animating online dynamic mathematics figures
 * https://coopmaths.fr
 * @Author Angot Rémi and Lhote Jean-Claude (contact@coopmaths.fr)
 * @License: GNU AGPLv3 https://www.gnu.org/licenses/agpl-3.0.html
 */

import { Figure } from '../../Figure'
import { Element2D } from '../Element2D'
import { Segment } from '../lines/Segment'
import { Circle } from '../lines/Circle'
import { Cross } from '../others/Cross'
import { TextByPoint } from '../texts/TextByPoint'
import { Measure } from '../measures/Measure'

export type PointStyle = 'x' | 'o' | ''
export type PointOptions = { label?: string, style?: PointStyle, size?: number, color?: string, thickness?: number, draggable?: boolean, temp?: boolean, snapToGrid?: boolean, labelDx?: number, labelDy?: number, exist?: boolean }

export class Point extends Element2D {
  private _x: number | Measure
  private _y: number | Measure
  private _style: PointStyle
  private _label: string
  private _size: number // Pour la taille de la croix et utilisé dans changeStyle
  mark: Element2D | null
  labelElement: Element2D | null
  labelDx: number // Ecart entre le label et le point en abscisse
  labelDy: number // Ecart entre le label et le point en ordonnées
  draggable: true | false | Circle | Segment
  temp: boolean // Pour les points qui ne servent qu'à faire des calculs
  snapToGrid: boolean
  // On définit un point avec ses deux coordonnées
  constructor (figure: Figure, x: number | Measure, y: number|Measure, { label, style = 'x', size = 0.15, thickness = 3, color, draggable = true, temp = false, snapToGrid = false, labelDx = -0.3, labelDy = 0.3, exist = true }: PointOptions = {}) {
    super(figure)
    this._x = x
    this._y = y
    this.group = []
    this.mark = null
    this.labelElement = null
    this._style = style
    this.thickness = thickness
    this.temp = temp
    this.exist = exist
    this._size = size
    // Les points que l'on peut déplacer sont bleus par défaut
    this.color = color || (draggable ? 'blue' : 'black')
    this.draggable = draggable
    this.snapToGrid = snapToGrid
    if (!this.temp) {
      this.parentFigure.set.add(this)
      this.style = style // Le style initialise aussi size
    } else {
      this.style = ''
    }
    if (this.g.childElementCount > 0 && !this.temp) {
      this.parentFigure.svg.appendChild(this.g)
      if (this.draggable) this.g.style.cursor = 'move'
    }
    this._label = label || ''
    this.labelDx = labelDx
    this.labelDy = labelDy
    if (label !== undefined) this.label = label
  }

  /**
   * Un point n'a pas de tracé
   * Ce sont sur ses marques (croix ou rond ou ...) qu'il faut faire une mise à jour du graphique
   */
  update (): void {
  }

  isOnFigure () {
    return (this.x < this.parentFigure.xMax && this.x > this.parentFigure.xMin && this.y < this.parentFigure.yMax && this.y > this.parentFigure.yMin)
  }

  /**
   * Déplace l'élément et ses dépendances
   * @param x nouvelle abscisse
   * @param y nouvelle ordonnée
   */
  moveTo (x: number, y: number) {
    this.x = x
    this.y = y
    if (this.mark instanceof Cross) {
      ;[this.mark.x, this.mark.y] = [x, y]
      this.mark.update()
    }
    // ToFix ce console.log est là qu'en phase de développement
    if (this.childs.length > 20) console.log(`Nombre de dépendances élevée pour ${this.label} : ${this.childs.length}`)
    this.notifyAllChilds()
  }

  /**
   * Quand le pointeur se déplace en mode drag, le point va aussi se déplacer
   * @param x coordonnées dans notre repère
   * @param y
   */
  notifyPointerMove (x: number, y: number) {
    this.moveTo(x, y)
  }

  /**
   * Détermine la distance entre les points et le pointeur pour déterminer lequel va passer en drag
   * @param pointerX
   * @param pointerY
   * @returns distance entre le point et le pointeur
   */
  public distancePointer (pointerX: number, pointerY: number) {
    return Math.sqrt((this.x - pointerX) ** 2 + (this.y - pointerY) ** 2)
  }

  /**
   * Fonction qui dessine la marque du point
   * @param style 'x' | 'o' | ''
   */
  private changeStyle (style: 'x' | 'o' | '') {
    if (this.mark !== null) this.parentFigure.set.delete(this.mark)
    if (style === '') {
      this.g.remove()
    }
    if (style === 'x') {
      const X = new Cross(this.parentFigure, this.x, this.y)
      this.mark = X
      this.group.push(X)
      this.g = X.g
      this.mark.color = this.color
      this.mark.thickness = this.thickness
    }
    if (style === 'o') {
      // Rond
      const C = new Circle(this, this.size)
      this.mark = C
      this.group.push(C)
      this.g.appendChild(C.g)
      C.fill = this.color
      this.mark.color = this.color
      this.mark.thickness = this.thickness
    }
  }

  hide (changeIsVisible = true): void {
    super.hide(changeIsVisible)
    if (this.labelElement) this.labelElement.hide(changeIsVisible)
  }

  show (changeIsVisible = true): void {
    super.show(changeIsVisible)
    if (this.labelElement) this.labelElement.show(changeIsVisible)
  }

  get label () {
    return this._label
  }

  set label (label) {
    if (this.labelElement) {
      this.labelElement.g.innerHTML = label
    } else if (this._label) {
      this.labelElement = new TextByPoint(this, label, { dx: this.labelDx, dy: this.labelDy })
      this.parentFigure.svg.appendChild(this.labelElement.g)
    }
    this._label = label
  }

  get style () {
    return this._style
  }

  set style (style) {
    this.changeStyle(style)
    this._style = style
  }

  get size () {
    return this._size
  }

  set size (size) {
    this._size = size
    this.changeStyle(this._style)
  }

  get x () {
    if (this._x instanceof Measure) return this._x.value
    else return this._x
  }

  set x (x) {
    if (this._x instanceof Measure) this._x.value = x
    else this._x = x
  }

  get y () {
    if (this._y instanceof Measure) return this._y.value
    else return this._y
  }

  set y (y) {
    if (this._y instanceof Measure) this._y.value = y
    else this._y = y
  }
}
