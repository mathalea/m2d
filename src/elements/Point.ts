import { Figure } from '../Figure'
import { Element2D } from './Element2D'
import { Segment } from './Segment'

export type PointStyle = 'x' | ''
export type PointOptions = { style?: PointStyle, size?: number, color?: string, thickness?: number, temp?: boolean }

export class Point extends Element2D {
  x: number
  y: number
  private _style: 'x' | ''
  size: number
  g: SVGElement
  parentFigure: Figure
  temp: boolean
  // On définit un point avec ses deux coordonnées
  constructor (svgContainer: Figure, x: number, y: number, { style = 'x', size = 0.2, thickness = 1, color = 'black', temp = false }: PointOptions = {}) {
    super()
    this.x = x
    this.y = y
    this.size = size // Pour la taille de la croix
    this.group = []
    this.parentFigure = svgContainer
    this.thickness = thickness
    this.color = color
    this.temp = temp
    const groupSvg = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    this.g = groupSvg
    if (!this.temp) {
      this.parentFigure.list.push(this)
      this.style = style
      this.parentFigure.svg.appendChild(this.g)
    }
  }

  moveTo (x: number, y: number) {
    for (const e of this.group) {
      e.moveTranslation(x - this.x, y - this.y)
    }
    this.x = x
    this.y = y

    for (const dependence of this.dependencies) {
      if (dependence.type === 'end1') {
        const segment = dependence.element as Segment
        segment.moveEnd(x, y, 1)
      }
      if (dependence.type === 'end2') {
        const segment = dependence.element as Segment
        segment.moveEnd(x, y, 2)
      }
    }
  }

  moveTranslation (x: number, y: number) {
    this.moveTo(this.x + x, this.y + y)
  }

  notifyMouseMove (x: number, y: number) {
    this.moveTo(x, y)
  }

  public distancePointer (pointerX: number, pointerY: number) {
    return Math.sqrt((this.x - pointerX) ** 2 + (this.y - pointerY) ** 2)
  }

  /**
 * Translation définie par un couple de coordonnées ou un objet possédant des paramètres x et y
 * Renvoie un nouveau point sans modifier le premier
 */

  /**
   * Translation définie par un couple de coordonnées
   * puis un booléen clone, lorsqu'il est vrai on créé un nouveau point sinon on le modifie
   * @param arg1
   * @param arg2
   * @param arg3
   * @returns
   */
  translation (xt: number, yt: number, clone = true) {
    if (clone) return new Point(this.parentFigure, this.x + xt, this.y + yt)
    this.moveTo(this.x + xt, this.y + yt)
    return this
  }

  /**
 * Rotation définie par un centre et un angle en degrés
 * Renvoie un nouveau point sans modifier le premier
 */
  rotation (O: Point, angle: number, clone = true) {
    const x = (O.x + (this.x - O.x) * Math.cos((angle * Math.PI) / 180) - (this.y - O.y) * Math.sin((angle * Math.PI) / 180))
    const y = (O.y + (this.x - O.x) * Math.sin((angle * Math.PI) / 180) + (this.y - O.y) * Math.cos((angle * Math.PI) / 180))
    if (clone) return new Point(this.parentFigure, x, y)
    this.moveTo(x, y)
    return this
  }

  /**
 * Homothétie définie par un centre et un rapport
 * Renvoie un nouveau point sans modifier le premier
 */

  homothetie (O: Point, k: number, clone = true) {
    const x = (O.x + k * (this.x - O.x))
    const y = (O.y + k * (this.y - O.y))
    if (clone) return new Point(this.parentFigure, x, y)
    this.moveTo(x, y)
    return this
  }

  /**
 * Similitude définie par un centre, un rapport et un angle en degré
 * Renvoie un nouveau point sans modifier le premier
 */
  similitude (O: Point, k: number, angle: number, clone = true) {
    const angleRadian = angle * Math.PI / 180
    const x = (O.x + k * (Math.cos(angleRadian) * (this.x - O.x) - Math.sin(angleRadian) * (this.y - O.y)))
    const y = (O.y + k * (Math.cos(angleRadian) * (this.y - O.y) + Math.sin(angleRadian) * (this.x - O.x))
    )
    if (clone) return new Point(this.parentFigure, x, y)
    this.moveTo(x, y)
    return this
  }

  addDependency (dependency: { element: Element2D, type: string }) {
    this.dependencies.push(dependency)
  }

  private changeStyle (style) {
    if (style === '') {
      this.g.innerHTML = ''
    }
    if (style === 'x') {
      // Croix avec [AB] et [CD]
      const A = new Point(this.parentFigure, this.x - this.size, this.y + this.size, { temp: true })
      const B = new Point(this.parentFigure, this.x + this.size, this.y - this.size, { temp: true })
      const C = new Point(this.parentFigure, this.x - this.size, this.y - this.size, { temp: true })
      const D = new Point(this.parentFigure, this.x + this.size, this.y + this.size, { temp: true })
      const sAB = new Segment(A, B, this.parentFigure, { color: this.color, thickness: this.thickness })
      const sCD = new Segment(C, D, this.parentFigure, { color: this.color, thickness: this.thickness })
      this.group.push(sAB, sCD)
      for (const e of this.group) {
        e.color = this.color
        e.thickness = this.thickness
        this.g.appendChild(e.g)
      }
    }
  }

  get style () {
    return this._style
  }

  set style (style) {
    this.changeStyle(style)
    this._style = style
  }
}
