import { Figure } from '../Figure'
import { Element2D } from './Element2D'
import { Segment } from './Segment'
import { Circle } from './Circle'
import { distance } from '../calculus/random'
import { homothetieCoord, rotationCoord, similitudeCoord } from '../calculus/transformation'

export type PointStyle = 'x' | 'o' | ''
export type PointOptions = { style?: PointStyle, size?: number, color?: string, thickness?: number, dragable?: boolean, temp?: boolean }
export type StringDependence = 'end1' | 'end2' | 'translation' | 'rotation' | 'homothetie' | 'similitude' | 'centerCircle' | 'pointOnCircle' | 'pointOnLine' | 'pointOnSegment' | 'intersectionLC' | 'intersectionSC' | 'intersectionLL' | 'intersectionCC'

export class Point extends Element2D {
  x: number
  y: number
  private _style: PointStyle
  protected _size: number // Pour la taille de la croix et utilisé dans changeStyle
  g: SVGElement
  parentFigure: Figure
  dragable: true | false | Circle | Segment
  temp: boolean // Pour les points qui ne servent qu'à faire des calculs
  isHidden : boolean
  // On définit un point avec ses deux coordonnées
  constructor (svgContainer: Figure, x: number, y: number, { style = 'x', size = 0.15, thickness = 3, color, dragable = true, temp = false }: PointOptions = {}) {
    super()
    this.x = x
    this.y = y
    this.isHidden = false
    this.group = []
    this.parentFigure = svgContainer
    this.thickness = thickness
    this.temp = temp
    this._size = size
    // Les points que l'on peut déplacer sont bleus par défaut
    this.color = color || (dragable ? 'blue' : 'black')
    this.dragable = dragable
    const groupSvg = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    this.g = groupSvg
    if (!this.temp) {
      this.parentFigure.list.push(this)
      this.style = style // Le style initialise aussi size
    } else {
      this.style = ''
    }
    if (this.g.childElementCount > 0 && !this.temp) this.parentFigure.svg.appendChild(this.g)
  }

  /**
   * Déplace l'élément et ses dépendances
   * @param x nouvelle abscisse
   * @param y nouvelle ordonnée
   */
  moveTo (x: number, y: number) {
    this.x = x
    this.y = y

    // Déplace tous les éléments qui dépendent de ce point
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
        const [x, y] = rotationCoord(dependence.previous, dependence.center, dependence.angle)
        point.moveTo(x, y)
      }
      if (dependence.type === 'homothetie') {
        const [x, y] = homothetieCoord(dependence.previous, dependence.center, dependence.k)
        point.moveTo(x, y)
      }
      if (dependence.type === 'similitude') {
        const [x, y] = similitudeCoord(dependence.previous, dependence.center, dependence.k, dependence.angle)
        point.moveTo(x, y)
      }
      if (dependence.type === 'centerCircle') {
        circle.moveCenter(this.x, this.y)
        if (dependence.pointOnCircle) circle.radius = (distance(dependence.pointOnCircle, this))
      }
      // ToFix ici c'est point sur le cercle dans le cercle défini par un centre et un point
      // Il reste à faire le point qui se balade sur le cercle et dont ne dépend pas le cercle
      if (dependence.type === 'pointOnCircle') {
        circle.radius = (distance(dependence.center, this))
      }
    }
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
   * Translation définie par un couple de coordonnées
   * Lorsque clone est vrai on créé un nouveau point sinon on modifie this
   * @param xt
   * @param yt
   * @param Options graphiques
   * @returns
   */
  translation (xt: number, yt: number, { clone = true, free = false, style = this.style, color = 'black', thickness = this.thickness, temp = false } = {}) {
    if (clone) {
      const B = new Point(this.parentFigure, this.x + xt, this.y + yt, { dragable: free, style, color, thickness, temp })
      if (!free) this.addDependency({ element: B, type: 'translation', x: xt, y: yt })
      return B
    }
    this.moveTo(this.x + xt, this.y + yt)
    return this
  }

  /**
 * Rotation définie par un centre et un angle en degrés
 * Renvoie un nouveau point sans modifier le premier avec clone = true ou déplace le point avec clone = false
 */
  rotation (O: Point, angle: number, { clone = true, free = false, color = 'black', style = O.style, thickness = O.thickness, temp = false } = {}) {
    const [x, y] = rotationCoord(this, O, angle)
    if (clone) {
      const B = new Point(this.parentFigure, x, y, { dragable: free, color, style, thickness, temp })
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

  homothetie (O: Point, k: number, { clone = true, dragable = false, style = this.style, color = 'black', thickness = this.thickness, temp = false } : {clone?: boolean, dragable?: boolean, color?: string, style?: PointStyle, thickness?: number, temp?: boolean} = {}) {
    const [x, y] = homothetieCoord(this, O, k)
    if (clone) {
      const B = new Point(this.parentFigure, x, y, { dragable, style, color, thickness })

      // Si le centre est déplacé, on déplace B
      O.addDependency({ element: B, type: 'homothetie', k, previous: this, center: O })
      // Si l'antécédent A est déplacé, on déplace B
      this.addDependency({ element: B, type: 'homothetie', k, previous: this, center: O })
      return B
    }
    this.moveTo(x, y)
    return this
  }

  /**
 * Similitude définie par un centre, un rapport et un angle en degré
 * Renvoie un nouveau point sans modifier le premier
 */
  similitude (O: Point, k: number, angle: number, { clone = true, free = false, temp = false, color = 'black' } = {}) {
    const [x, y] = similitudeCoord(this, O, k, angle)
    if (clone) {
      const B = new Point(this.parentFigure, x, y, { dragable: free, temp, color })
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

  /**
   * Permet d'indiquer au point que sa position dépend d'autres éléments
   * @param dependency
   */
  addDependency (dependency: { element: Element2D, type: StringDependence, x?: number, y?: number, angle?: number, k?: number, center?: Point, previous?: Point, pointOnCircle?: Point, L?: Segment, C?: Circle, C2?: Circle, n?: 1 | 2}) {
    this.dependencies.push(dependency)
  }

  /**
   * Fonction qui dessine la marque du point
   * @param style 'x' | 'o' | ''
   */
  private changeStyle (style) {
    if (style === '') {
      this.g.innerHTML = ''
    }
    if (style === 'x') {
      // Croix avec [AB] et [CD]
      const A = this.translation(-this._size, this._size, { temp: true, style: '' })
      const B = this.translation(this._size, -this._size, { temp: true, style: '' })
      const C = this.translation(-this._size, -this._size, { temp: true, style: '' })
      const D = this.translation(this._size, this._size, { temp: true, style: '' })
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

  hide () {
    for (const segment of this.group) {
      segment.g.setAttribute('visibility', 'hidden')
    }
  }

  show () {
    for (const segment of this.group) {
      segment.g.setAttribute('visibility', 'visible')
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
