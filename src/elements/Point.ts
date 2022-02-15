import { Figure } from '../Figure'
import { Element2D } from './Element2D'
import { Segment } from './Segment'
import { Circle } from './Circle'
import { distance } from '../calcul'

export type PointStyle = 'x' | 'o' | ''
export type PointOptions = { style?: PointStyle, size?: number, color?: string, thickness?: number, dragable?: boolean }
export type StringDependence = 'end1' | 'end2' | 'translation' | 'rotation' | 'homothetie' | 'similitude' | 'centerCircle' | 'pointOnCircle'

export class Point extends Element2D {
  x: number
  y: number
  private _style: 'x' | ''
  private _size: number // Pour la taille de la croix et utilisé dans changeStyle
  g: SVGElement
  parentFigure: Figure
  dragable: boolean
  // On définit un point avec ses deux coordonnées
  constructor (svgContainer: Figure, x: number, y: number, { style = 'x', size = 0.15, thickness = 3, color, dragable = true }: PointOptions = {}) {
    super()
    this.x = x
    this.y = y
    this.group = []
    this.parentFigure = svgContainer
    this.thickness = thickness
    this._size = size
    // Les points que l'on peut déplacer sont bleus par défaut
    this.color = color || (dragable ? 'blue' : 'black')
    this.dragable = dragable
    const groupSvg = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    this.g = groupSvg
    this.parentFigure.list.push(this)
    this.style = style // Le style initialise aussi size
    if (this.g.childElementCount > 0) this.parentFigure.svg.appendChild(this.g)
  }

  /**
   * Déplace l'élément et ses dépendances
   * @param x nouvelle abscisse
   * @param y nouvelle ordonnée
   */
  moveTo (x: number, y: number) {
    this.x = x
    this.y = y

    for (const dependence of this.dependencies) {
      const point = dependence.element as Point
      const segment = dependence.element as Segment
      const circle = dependence.element as Circle
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
      if (dependence.type === 'homothetie') {
        const [x, y] = this.homothetieCoord(dependence.previous, dependence.center, dependence.k)
        point.moveTo(x, y)
      }
      if (dependence.type === 'similitude') {
        const [x, y] = this.similitudeCoord(dependence.previous, dependence.center, dependence.k, dependence.angle)
        point.moveTo(x, y)
      }
      if (dependence.type === 'centerCircle') {
        circle.moveCenter(this.x, this.y)
        if (dependence.pointOnCircle) circle.radius = (distance(dependence.pointOnCircle, this))
      }
      if (dependence.type === 'pointOnCircle') {
        circle.radius = (distance(dependence.center, this))
      }
    }
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
  translation (xt: number, yt: number, { clone = true, free = false, style = this.style, color = this.color, thickness = this.thickness } = {}) {
    if (clone) {
      const B = new Point(this.parentFigure, this.x + xt, this.y + yt, { dragable: free, style, color, thickness })
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
   *
   * @param A Antécédent
   * @param O Centre
   * @param k Coefficient
   * @returns [x, y] coordonnées de l'image
   */
  private homothetieCoord (A: Point, O: Point, k: number) {
    const x = (O.x + k * (A.x - O.x))
    const y = (O.y + k * (A.y - O.y))
    return [x, y]
  }

  /**
   *
   * @param A Antécédent
   * @param O Centre
   * @param k Coefficient
   * @param angle Angle en degrés
   * @returns [x, y] coordonnées de l'image
   */
  private similitudeCoord (A: Point, O: Point, k: number, angle: number) {
    const angleRadian = angle * Math.PI / 180
    const x = (O.x + k * (Math.cos(angleRadian) * (this.x - O.x) - Math.sin(angleRadian) * (this.y - O.y)))
    const y = (O.y + k * (Math.cos(angleRadian) * (this.y - O.y) + Math.sin(angleRadian) * (this.x - O.x)))
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
        // Si le centre est déplacé, on déplace B
        O.addDependency({ element: B, type: 'rotation', angle, previous: this, center: O })
        // Si l'antécédent A est déplacé, on déplace B
        this.addDependency({ element: B, type: 'rotation', angle, previous: this, center: O })
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

  homothetie (O: Point, k: number, { clone = true, free = false } = {}) {
    const [x, y] = this.homothetieCoord(this, O, k)
    if (clone) {
      const B = new Point(this.parentFigure, x, y, { dragable: free })
      if (!free) {
        // Si le centre est déplacé, on déplace B
        O.addDependency({ element: B, type: 'homothetie', k, previous: this, center: O })
        // Si l'antécédent A est déplacé, on déplace B
        this.addDependency({ element: B, type: 'homothetie', k, previous: this, center: O })
      }
      return B
    }
    this.moveTo(x, y)
    return this
  }

  /**
 * Similitude définie par un centre, un rapport et un angle en degré
 * Renvoie un nouveau point sans modifier le premier
 */
  similitude (O: Point, k: number, angle: number, { clone = true, free = false } = {}) {
    const [x, y] = this.similitudeCoord(this, O, k, angle)
    if (clone) {
      const B = new Point(this.parentFigure, x, y, { dragable: free })
      if (!free) {
        // Si le centre est déplacé, on déplace B
        O.addDependency({ element: B, type: 'similitude', k, previous: this, center: O, angle })
        // Si l'antécédent A est déplacé, on déplace B
        this.addDependency({ element: B, type: 'similitude', k, previous: this, center: O, angle })
      }
      return B
    }
    this.moveTo(x, y)
    return this
  }

  addDependency (dependency: { element: Element2D, type: StringDependence, x?: number, y?: number, angle?: number, k?: number, center?: Point, previous?: Point, pointOnCircle?: Point}) {
    this.dependencies.push(dependency)
  }

  private changeStyle (style) {
    if (style === '') {
      this.g.innerHTML = ''
    }
    if (style === 'x') {
      // Croix avec [AB] et [CD]
      const A = this.translation(-this._size, this._size, { style: '' })
      const B = this.translation(this._size, -this._size, { style: '' })
      const C = this.translation(-this._size, -this._size, { style: '' })
      const D = this.translation(this._size, this._size, { style: '' })
      const sAB = new Segment(A, B, { color: this.color, thickness: this.thickness })
      const sCD = new Segment(C, D, { color: this.color, thickness: this.thickness })
      this.group.push(sAB, sCD)
      for (const e of this.group) {
        this.g.appendChild(e.g)
        e.color = this.color
        e.thickness = this.thickness
      }
    }
    if (style === 'o') {
      // Rond
      const C = new Circle(this, this.size)
      this.group.push(C)
      C.color = this.color
      C.fill = this.color
      C.thickness = this.thickness
      this.g.appendChild(C.g)
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
