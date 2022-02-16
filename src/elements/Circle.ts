import { intersectionLC } from '../calculus/intersection'
import { distance } from '../calculus/random'
import { Element2D } from './Element2D'
import { Point, StringDependence } from './Point'
import { PointOnCircle } from './PointOnCircle'
import { OptionsGraphiques, Segment } from './Segment'

export class Circle extends Element2D {
    center: Point
    M: Point // Point du cercle de même ordonnée que le centre et d'abscisse supérieure
    private _radius: number
    constructor (O: Point, arg2: number | Point, { color = 'black', thickness = 1, fill = 'none' } : OptionsGraphiques = {}) {
      super()
      this.parentFigure = O.parentFigure
      this.center = O
      this.parentFigure.list.push(this)

      const xSvg = this.parentFigure.xToSx(this.center.x)
      const ySvg = this.parentFigure.yToSy(this.center.y)
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
      circle.setAttribute('cx', `${xSvg}`)
      circle.setAttribute('cy', `${ySvg}`)
      this.g = circle
      this.parentFigure.svg.appendChild(this.g)

      this.M = new Point(this.parentFigure, 100, 100, { style: '' }) // Point temporaire qui sera placé quand on connaitra le rayon
      this.radius = (typeof arg2 === 'number') ? arg2 : this.radius = distance(O, arg2)
      this.M.style = ''
      this.fill = fill
      this.color = color
      this.thickness = thickness

      if (arg2 instanceof Point) {
        O.addDependency({ element: this, type: 'centerCircle', pointOnCircle: arg2 })
        arg2.addDependency({ element: this, type: 'pointOnCircle', center: O })
      } else O.addDependency({ element: this, type: 'centerCircle', pointOnCircle: null })
    }

    addDependency (dependency: { element: Element2D, type: StringDependence, x?: number, y?: number, angle?: number, k?: number, center?: Point, previous?: Point, pointOnCircle?: Point, L?: Segment, C?: Circle}) {
      this.dependencies.push(dependency)
    }

    /**
     * Translation définie par un couple de coordonnées ou un objet possédant des paramètres x et y
     * Renvoie un nouveau cercle sans modifier le premier
     */
    translation (xt: number, yt: number) {
      const O2 = new Point(this.parentFigure, this.center.x + xt, this.center.y + yt)
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
      this.M.moveTo(this.center.x + this.radius, this.center.y)
      console.log(this.dependencies)
      for (const dependence of this.dependencies) {
        if (dependence.type === 'pointOnCircle') {
          const M = dependence.element as PointOnCircle
          // On simule un léger déplacement pour qu'il recalcule sa position sur le cercle
          M.notifyMouseMove(M.x + 0.00001, M.y)
        }
        if (dependence.type === 'intersectionLC') {
          const M = dependence.element as Point
          const [x1, y1] = intersectionLC(dependence.L, dependence.C)
          const [x2, y2] = intersectionLC(dependence.L, dependence.C, 2)
          // On cherche le point d'intersection le plus proche de l'actuel
          if ((M.x - x1) ** 2 + (M.y - y1) ** 2 < (M.x - x2) ** 2 + (M.y - y2) ** 2) {
            M.moveTo(x1, y1)
          } else M.moveTo(x2, y2)
        }
      }
    }

    /**
     * Rotation définie par un centre et un angle en degrés
     * Renvoie un nouveau cercle sans modifier le premier
     */
    rotation (O: Point, angle: number) {
      const x = (O.x + (this.center.x - O.x) * Math.cos((angle * Math.PI) / 180) - (this.center.y - O.y) * Math.sin((angle * Math.PI) / 180))
      const y = (O.y + (this.center.x - O.x) * Math.sin((angle * Math.PI) / 180) + (this.center.y - O.y) * Math.cos((angle * Math.PI) / 180))
      const O2 = new Point(this.parentFigure, x, y)
      return new Circle(O2, this.radius)
    }

    /**
     * Homothétie définie par un centre et un rapport
     * Renvoie un nouveau point sans modifier le premier
     */

    homothetie (O: Point, k: number) {
      const x = (O.x + k * (this.center.x - O.x))
      const y = (O.y + k * (this.center.y - O.y))
      const O2 = new Point(this.parentFigure, x, y)
      return new Circle(O2, this.radius * k)
    }

    /**
     * Similitude définie par un centre, un rapport et un angle en degré
     * Renvoie un nouveau point sans modifier le premier
     */
    similitude (O: Point, k: number, angle: number) {
      const angleRadian = angle * Math.PI / 180
      const x = (O.x + k * (Math.cos(angleRadian) * (this.center.x - O.x) - Math.sin(angleRadian) * (this.center.y - O.y)))
      const y = (O.y + k * (Math.cos(angleRadian) * (this.center.y - O.y) + Math.sin(angleRadian) * (this.center.x - O.x))
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
      return `\n \t \\draw${txtOptions} (${this.center.x}, ${this.center.y}) circle(${this.radius});`
    }
}
