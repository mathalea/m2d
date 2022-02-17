import { intersectionLCCoord } from '../calculus/intersection'
import { randint } from '../calculus/random'
import { Circle } from './Circle'
import { Point, PointOptions } from './Point'
import { Segment } from './Segment'

export class PointOnCircle extends Point {
  circle : Circle
  constructor (C: Circle, { angle = randint(-180, 180), style = 'x', size = 0.15, thickness = 3, color = 'Gray', dragable = true, temp = false }: PointOptions & {angle?: number} = {}) {
    const angleRadian = angle * Math.PI / 180
    const x = C.center.x + C.radius * Math.cos(angleRadian)
    const y = C.center.y + C.radius * Math.sin(angleRadian)
    super(C.parentFigure, x, y)
    this.x = x
    this.y = y
    this.circle = C
    this.group = []
    this.parentFigure = C.parentFigure
    this.thickness = thickness
    this.temp = temp
    this._size = size
    // Les points que l'on peut déplacer sont bleus par défaut
    this.color = color || (dragable ? 'blue' : 'black')
    this.dragable = dragable
    const groupSvg = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    this.g = groupSvg
    this.parentFigure.list.push(this)
    this.style = style // Le style initialise aussi size
    if (this.g.childElementCount > 0 && !this.temp) this.parentFigure.svg.appendChild(this.g)
    this.circle.addDependency({ element: this, type: 'pointOnCircle' })
  }

  /**
   * Gère le déplacement du point sur le cercle
   * @param x abscisse du pointeur dans notre repère
   * @param y ordonnée du pointeur
   */
  notifyPointerMove (x: number, y: number) {
    if (this.dragable) {
      const O = this.circle.center
      const P = new Point(this.circle.parentFigure, x, y, { temp: true })
      const L = new Segment(O, P, { temp: true })
      const [xM, yM] = intersectionLCCoord(L, this.circle, (P.y > O.y) ? 1 : 2)
      this.moveTo(xM, yM)
    }
  }
}
