import { Element2D } from './Element2D'
import { Point } from './Point'
import { OptionsGraphiques } from './Segment'

export class Circle extends Element2D {
    O: Point
    radius: number
    constructor (O: Point, radius: number, { color = 'black', thickness = 1, fill = 'none' } : OptionsGraphiques = {}) {
      super()
      this.O = O
      this.radius = radius
      this.parentFigure = O.parentFigure

      const xSvg = this.parentFigure.xToSx(this.O.x)
      const ySvg = this.parentFigure.yToSy(this.O.y)
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
      circle.setAttribute('cx', `${xSvg}`)
      circle.setAttribute('cy', `${ySvg}`)
      circle.setAttribute('r', `${this.radius * this.parentFigure.pixelsPerUnit}`)
      this.g = circle
      this.parentFigure.svg.appendChild(this.g)

      this.fill = fill
      this.color = color
      this.thickness = thickness

      O.addDependency({ element: this, type: 'centerCircle' })
    }

    /**
     * Translation définie par un couple de coordonnées ou un objet possédant des paramètres x et y
     * Renvoie un nouveau cercle sans modifier le premier
     */
    translation (xt: number, yt: number) {
      const O2 = new Point(this.parentFigure, this.O.x + xt, this.O.y + yt)
      return new Circle(O2, this.radius)
    }

    /**
     * Déplace le centre du cercle
     * @param x
     * @param y
     */
    moveCenter (x: number, y: number) {
      this.g.setAttribute('cx', `${this.parentFigure.xToSx(x)}`)
      this.g.setAttribute('cy', `${this.parentFigure.yToSy(y)}`)
    }

    /**
     * Rotation définie par un centre et un angle en degrés
     * Renvoie un nouveau cercle sans modifier le premier
     */
    rotation (O: Point, angle: number) {
      const x = (O.x + (this.O.x - O.x) * Math.cos((angle * Math.PI) / 180) - (this.O.y - O.y) * Math.sin((angle * Math.PI) / 180))
      const y = (O.y + (this.O.x - O.x) * Math.sin((angle * Math.PI) / 180) + (this.O.y - O.y) * Math.cos((angle * Math.PI) / 180))
      const O2 = new Point(this.parentFigure, x, y)
      return new Circle(O2, this.radius)
    }

    /**
     * Homothétie définie par un centre et un rapport
     * Renvoie un nouveau point sans modifier le premier
     */

    homothetie (O: Point, k: number) {
      const x = (O.x + k * (this.O.x - O.x))
      const y = (O.y + k * (this.O.y - O.y))
      const O2 = new Point(this.parentFigure, x, y)
      return new Circle(O2, this.radius * k)
    }

    /**
     * Similitude définie par un centre, un rapport et un angle en degré
     * Renvoie un nouveau point sans modifier le premier
     */
    similitude (O: Point, k: number, angle: number) {
      const angleRadian = angle * Math.PI / 180
      const x = (O.x + k * (Math.cos(angleRadian) * (this.O.x - O.x) - Math.sin(angleRadian) * (this.O.y - O.y)))
      const y = (O.y + k * (Math.cos(angleRadian) * (this.O.y - O.y) + Math.sin(angleRadian) * (this.O.x - O.x))
      )
      const O2 = new Point(this.parentFigure, x, y)
      return new Circle(O2, this.radius * k)
    }
}
