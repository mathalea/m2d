/*
 * Created by Angot Rémi and Lhote Jean-Claude on 15/02/2022.
 *
 * MathALEA 2D : Software for animating online dynamic mathematics figures
 * https://coopmaths.fr
 * @Author Angot Rémi and Lhote Jean-Claude (contact@coopmaths.fr)
 * @License: GNU AGPLv3 https://www.gnu.org/licenses/agpl-3.0.html
 */

import { distance } from '../../calculus/random'
import { Element2D } from '../Element2D'
import { Point } from '../points/Point'
import { OptionsGraphiques } from './Line'

export class Circle extends Element2D {
  center: Point
  temp: boolean
  M: Point // Point de même ordonnée que le centre et d'abscisse supérieure
  pointOnCircle: Point | null // Point qui définit le cercle
  private _radius: number
  constructor (center: Point, arg2: number | Point, { color = 'black', thickness = 1, fill = 'none', temp = false, dashed = false }: OptionsGraphiques = {}) {
    super()
    this.parentFigure = center.parentFigure
    this.pointOnCircle = arg2 instanceof Point ? arg2 : null
    this.center = center
    this.temp = temp
    if (!this.temp) this.parentFigure.set.add(this)

    const xSvg = this.parentFigure.xToSx(this.center.x)
    const ySvg = this.parentFigure.yToSy(this.center.y)
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    circle.setAttribute('cx', `${xSvg}`)
    circle.setAttribute('cy', `${ySvg}`)
    this.g = circle
    if (!this.temp) this.parentFigure.svg.appendChild(this.g)
    this.M = new Point(this.parentFigure, 100, 100, { style: '', temp: true }) // Point temporaire qui sera placé quand on connaitra le rayon
    this.radius = (typeof arg2 === 'number') ? arg2 : this.radius = distance(center, arg2)
    this.M.moveTo(center.x + this.radius, center.y)
    this.fill = fill
    this.color = color
    this.thickness = thickness
    this.dashed = dashed

    if (arg2 instanceof Point) {
      this.pointOnCircle = arg2
      center.addDependency(this)
      arg2.addDependency(this)
    } else center.addDependency(this)
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
    this.M.moveTo(this.center.x + this.radius, this.center.y)
  }

  get radius () {
    return this._radius
  }

  set radius (radius: number) {
    this._radius = radius
    this.g.setAttribute('r', `${this._radius * this.parentFigure.pixelsPerUnit}`)
  }

  update (): void {
    this.moveCenter(this.center.x, this.center.y)
    if (this.pointOnCircle) {
      this.radius = distance(this.center, this.pointOnCircle)
    }
    this.notifyAllDependencies()
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

  get latex () {
    if (!this.isVisible) return ''
    let latex = `\n\n\t% Circle center : ${this.center.label}, radius ${this._radius}`
    latex += `\n \t \\draw${this.tikzOptions} (${this.center.x}, ${this.center.y}) circle(${this.radius});`
    return latex
  }
}
