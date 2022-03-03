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
import { Cross } from '../others/cross'
import { TextByPoint } from '../texts/TextByPoint'

export type PointStyle = 'x' | 'o' | ''
export type PointOptions = { label?: string, style?: PointStyle, size?: number, color?: string, thickness?: number, draggable?: boolean, temp?: boolean, snapToGrid?: boolean }

export class Point extends Element2D {
  x: number
  y: number
  private _style: PointStyle
  private _label: string
  protected _size: number // Pour la taille de la croix et utilisé dans changeStyle
  g: SVGElement
  mark: Element2D
  labelElement: Element2D
  parentFigure: Figure
  draggable: true | false | Circle | Segment
  temp: boolean // Pour les points qui ne servent qu'à faire des calculs
  snapToGrid: boolean
  // On définit un point avec ses deux coordonnées
  constructor (svgContainer: Figure, x: number, y: number, { label, style = 'x', size = 0.15, thickness = 3, color, draggable = true, temp = false, snapToGrid = false }: PointOptions = {}) {
    super()
    this.x = x
    this.y = y
    this.group = []
    this.parentFigure = svgContainer
    this.thickness = thickness
    this.temp = temp
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
    ;[this.x, this.y] = [x, y]
    if (this.mark instanceof Cross) {
      ;[this.mark.x, this.mark.y] = [x, y]
      this.mark.update()
    }
    // ToFix ce console.log est là qu'en phase de développement
    if (this.dependencies.length > 20) console.log(`Nombre de dépendances élevée pour ${this.label} : ${this.dependencies.length}`)
    this.notifyAllDependencies()
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
  private changeStyle (style) {
    if (this.parentFigure.set.has(this.mark)) this.parentFigure.set.delete(this.mark)
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

  hide (): void {
    super.hide()
    this.labelElement.hide()
  }

  show (): void {
    super.show()
    this.labelElement.show()
  }

  get label () {
    return this._label
  }

  set label (label) {
    if (this.labelElement) {
      this.labelElement.g.remove()
      this.parentFigure.set.delete(this.labelElement)
    }
    if (label !== '') {
      this.labelElement = new TextByPoint(this, label, { dx: -0.3, dy: 0.3 })
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
}
