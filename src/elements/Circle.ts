import { intersectionLC } from '../calculus/intersection'
import { distance } from '../calculus/random'
import { Element2D } from './Element2D'
import { Point } from './Point'
import { OptionsGraphiques } from './Segment'

export class Circle extends Element2D {
    O: Point
    private _radius: number
    constructor (O: Point, arg2: number | Point, { color = 'black', thickness = 1, fill = 'none' } : OptionsGraphiques = {}) {
      super()
      this.parentFigure = O.parentFigure
      this.O = O
      this.parentFigure.list.push(this)

      const xSvg = this.parentFigure.xToSx(this.O.x)
      const ySvg = this.parentFigure.yToSy(this.O.y)
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
      circle.setAttribute('cx', `${xSvg}`)
      circle.setAttribute('cy', `${ySvg}`)
      this.g = circle
      this.parentFigure.svg.appendChild(this.g)

      this.radius = (typeof arg2 === 'number') ? arg2 : this.radius = distance(O, arg2)

      this.fill = fill
      this.color = color
      this.thickness = thickness

      if (arg2 instanceof Point) {
        O.addDependency({ element: this, type: 'centerCircle', pointOnCircle: arg2 })
        arg2.addDependency({ element: this, type: 'pointOnCircle', center: O })
      } else O.addDependency({ element: this, type: 'centerCircle', pointOnCircle: null })
    }

    addDependency (dependency: { element: Element2D, type: string, x?: number, y?: number, angle?: number, k?: number, center?: Point, previous?: Point, pointOnCircle?: Point}) {
      this.dependencies.push(dependency)
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
      this.changing()
    }

    get radius () {
      return this._radius
    }

    set radius (radius: number) {
      this._radius = radius
      this.g.setAttribute('r', `${this._radius * this.parentFigure.pixelsPerUnit}`)
      this.changing()
    }

    private changing () {
      for (const dependence of this.dependencies) {
        if (dependence.type === 'onCircle') {
          const angleRadian = dependence.angle * Math.PI / 180
          const C = this
          const x = C.O.x + C.radius * Math.cos(angleRadian)
          const y = C.O.y + C.radius * Math.sin(angleRadian)
          dependence.element.moveTo(x, y)
        }
        if (dependence.type === 'intersectionLC') {
          const [x1, y1] = intersectionLC(dependence.L, dependence.C)
          const [x2, y2] = intersectionLC(dependence.L, dependence.C, 2)
          // On cherche le point d'intersection le plus proche de l'actuel
          if ((dependence.element.x - x1) ** 2 + (dependence.element.y - y1) ** 2 < (dependence.element.x - x2) ** 2 + (dependence.element.y - y2) ** 2) {
            dependence.element.moveTo(x1, y1)
          } else dependence.element.moveTo(x2, y2)
        }
      }
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

    get tex () {
      const arrayOptions : string[] = []
      if (this.color !== 'black') arrayOptions.push(`color = ${this.color}`)
      if (this.thickness === 1) arrayOptions.push(`line width = ${this.thickness}`)
      if (this.fill !== 'none') arrayOptions.push(`fill = ${this.fill}`)
      let txtOptions = ''
      if (arrayOptions) txtOptions = `[${arrayOptions.join(', ')}]`
      return `\n \t \\draw${txtOptions} (${this.O.x}, ${this.O.y}) circle(${this.radius});`
    }
}
