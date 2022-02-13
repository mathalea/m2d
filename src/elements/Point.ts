import { Figure } from '../Figure'
import { Element2D } from './Element2D'
import { Segment } from './Segment'

export type PointStyle = 'x' | ''
export type PointOptions = { style?: PointStyle, size?: number, color?: string, thickness?: number, temp?: boolean, dragable?: boolean }

export class Point extends Element2D {
  x: number
  y: number
  private _style: 'x' | ''
  private _size: number // Pour la taille de la croix et utilisé dans changeStyle
  g: SVGElement
  parentFigure: Figure
  temp: boolean
  dragable: boolean
  // On définit un point avec ses deux coordonnées
  constructor (svgContainer: Figure, x: number, y: number, { style = 'x', size = 0.2, thickness = 1, color = 'black', temp = false, dragable = true }: PointOptions = {}) {
    super()
    this.x = x
    this.y = y
    this.group = []
    this.parentFigure = svgContainer
    this.thickness = thickness
    this._size = size
    this.color = color
    this.temp = temp
    this.dragable = dragable
    const groupSvg = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    this.g = groupSvg
    if (!this.temp) {
      this.parentFigure.list.push(this)
      this.style = style // Le style initialise aussi size
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
      const point = dependence.element as Point
      const segment = dependence.element as Segment
      if (dependence.type === 'end1') {
        segment.moveEnd(x, y, 1)
      }
      if (dependence.type === 'end2') {
        segment.moveEnd(x, y, 2)
      }
      if (dependence.type === 'translation') {
        point.moveTo(this.x + dependence.x, this.y + dependence.y)
      }
      if (dependence.type === 'rotation') {
        const [x, y] = this.rotationCoord(dependence.previous, dependence.center, dependence.angle)
        point.moveTo(x, y)
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
  translation (xt: number, yt: number, { clone = true, free = false } = {}) {
    if (clone) {
      const B = new Point(this.parentFigure, this.x + xt, this.y + yt, { dragable: free })
      if (!free) this.addDependency({ element: B, type: 'translation', x: xt, y: yt })
      return B
    }
    this.moveTo(this.x + xt, this.y + yt)
    return this
  }

  /**
   *
   * @param A Antécédent
   * @param O Centre
   * @param angle Image
   * @returns [x, y] coordonnées de l'image
   */
  private rotationCoord (A: Point, O: Point, angle: number) {
    const x = (O.x + (A.x - O.x) * Math.cos((angle * Math.PI) / 180) - (A.y - O.y) * Math.sin((angle * Math.PI) / 180))
    const y = (O.y + (A.x - O.x) * Math.sin((angle * Math.PI) / 180) + (A.y - O.y) * Math.cos((angle * Math.PI) / 180))
    return [x, y]
  }

  /**
 * Rotation définie par un centre et un angle en degrés
 * Renvoie un nouveau point sans modifier le premier avec clone = true ou déplace le point avec clone = false
 */
  rotation (O: Point, angle: number, { clone = true, free = false } = {}) {
    const [x, y] = this.rotationCoord(this, O, angle)
    if (clone) {
      const B = new Point(this.parentFigure, x, y, { dragable: free })
      if (!free) {
        const dependenceArgs = { element: B, type: 'rotation', angle, previous: this, center: O }
        // Si le centre est déplacé, on déplace B
        O.addDependency(dependenceArgs)
        // Si l'antécédent A est déplacé, on déplace B
        this.addDependency(dependenceArgs)
      }
      return B
    }
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

  addDependency (dependency: { element: Element2D, type: string, x?: number, y?: number, angle?: number, coeff?: number, center?: Point, previous?: Point}) {
    this.dependencies.push(dependency)
  }

  private changeStyle (style) {
    if (style === '') {
      this.g.innerHTML = ''
    }
    if (style === 'x') {
      // Croix avec [AB] et [CD]
      const A = new Point(this.parentFigure, this.x - this._size, this.y + this._size, { temp: true })
      const B = new Point(this.parentFigure, this.x + this._size, this.y - this._size, { temp: true })
      const C = new Point(this.parentFigure, this.x - this._size, this.y - this._size, { temp: true })
      const D = new Point(this.parentFigure, this.x + this._size, this.y + this._size, { temp: true })
      const sAB = new Segment(A, B, this.parentFigure, { color: this.color, thickness: this.thickness })
      const sCD = new Segment(C, D, this.parentFigure, { color: this.color, thickness: this.thickness })
      this.group.push(sAB, sCD)
      for (const e of this.group) {
        this.g.appendChild(e.g)
        e.color = this.color
        e.thickness = this.thickness
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

  get size () {
    return this._size
  }

  set size (size) {
    this._size = size
    this.changeStyle(this._style)
  }
}
