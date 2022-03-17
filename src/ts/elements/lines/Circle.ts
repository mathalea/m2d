import { PointByHomothetie } from './../points/PointByHomothetie'
/*
 * Created by Angot Rémi and Lhote Jean-Claude on 15/02/2022.
 *
 * MathALEA 2D : Software for animating online dynamic mathematics figures
 * https://coopmaths.fr
 * @Author Angot Rémi and Lhote Jean-Claude (contact@coopmaths.fr)
 * @License: GNU AGPLv3 https://www.gnu.org/licenses/agpl-3.0.html
 */

import { Element2D } from '../Element2D'
import { Measure } from '../measures/Measure'
import { Point } from '../points/Point'
import { OptionsGraphiques } from './Line'
import { CalculDynamic } from '../measures/CalculDynamic'
import { PointByRotation } from '../points/PointByRotation'
import { PointBySimilitude } from '../points/PointBySimilitude'
import { Distance } from '../measures/Distance'
import { Const } from '../measures/Const'

export class Circle extends Element2D {
  center: Point
  temp: boolean
  M: Point // Point de même ordonnée que le centre et d'abscisse supérieure
  pointOnCircle: Point | null // Point qui définit le cercle
  private _radius: Measure // _radius est une Measure (CalculDynamic ou Distance) alors que radius est un nombre (sa propriété value)
  constructor (center: Point, arg2: number | Point | Measure, { color = 'black', thickness = 1, fill = 'none', temp = false, dashed = false }: OptionsGraphiques = {}) {
    super(center.parentFigure)
    this.pointOnCircle = arg2 instanceof Point ? arg2 : null
    this.center = center
    this.temp = temp
    if (!this.temp) this.parentFigure.set.add(this)
    if (arg2 instanceof Point) this._radius = new Distance(center, arg2)
    else {
      if (typeof arg2 === 'number') this._radius = new Const(center.parentFigure, arg2)
      else this._radius = new CalculDynamic((r: Measure[]) => Math.abs(r[0].value), [arg2])
    }
    const xSvg = this.parentFigure.xToSx(this.center.x)
    const ySvg = this.parentFigure.yToSy(this.center.y)
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    circle.setAttribute('cx', `${xSvg}`)
    circle.setAttribute('cy', `${ySvg}`)
    this.g = circle
    if (!this.temp) this.parentFigure.svg.appendChild(this.g)
    this.M = new Point(this.parentFigure, 100, 100, { style: '', temp: true }) // Point temporaire qui sera placé quand on connaitra le rayon
    this.M.moveTo(center.x + this.radius, center.y)
    this.fill = fill
    this.color = color
    this.thickness = thickness
    this.dashed = dashed

    if (arg2 instanceof Point) {
      this.pointOnCircle = arg2
      center.addChild(this)
      arg2.addChild(this)
      this.exist = center.exist && this.pointOnCircle.exist
    } else if (arg2 instanceof Measure) {
      this.pointOnCircle = null
      center.addChild(this)
      arg2.addChild(this)
      this.exist = center.exist && arg2.value > 0
    } else {
      center.addChild(this)
      this.exist = center.exist
    }
  }

  /**
   * Translation définie par un couple de coordonnées ou un objet possédant des paramètres x et y
   * Renvoie un nouveau cercle sans modifier le premier
   */
  translation (xt: number, yt: number) {
    try {
      const O2 = new Point(this.parentFigure, this.center.x + xt, this.center.y + yt)
      return new Circle(O2, this.radius)
    } catch (error) {
      return null
    }
  }

  /**
   * Déplace le centre du cercle
   * @param x
   * @param y
   */
  moveCenter (x: number, y: number) {
    try {
      this.g.setAttribute('cx', `${this.parentFigure.xToSx(x)}`)
      this.g.setAttribute('cy', `${this.parentFigure.yToSy(y)}`)
      this.M.moveTo(this.center.x + this.radius, this.center.y)
    } catch (error) {
      console.log('erreur dans Circle.moveCenter', error)
    }
  }

  get radius (): number {
    try {
      return this._radius.value
    } catch (error) {
      return NaN
    }
  }

  set radius (radius: number) {
    try {
      this._radius.value = radius
      this.g.setAttribute('r', `${this._radius.value * this.parentFigure.pixelsPerUnit}`)
    } catch (error) {
      console.log('Erreur dans Circle set radius avec l\'argument ', radius)
    }
  }

  update (): void {
    try {
      this.moveCenter(this.center.x, this.center.y)
      if (this.pointOnCircle) {
        this.radius = Point.distance(this.center, this.pointOnCircle)
      }
      if (this._radius instanceof Measure) {
        this.radius = Math.max(this._radius.value, 0)
      }
      this.notifyAllChilds()
    } catch (error) {
      console.log('Erreur dans Circle update().', error)
      this.exist = false
    }
  }

  /**
   * Rotation définie par un centre et un angle en degrés
   * Renvoie un nouveau cercle sans modifier le premier
   */
  static rotation (C:Circle, O: Point, angle: number | Measure) {
    try {
      let O2: PointByRotation
      if (angle instanceof Measure) {
        O2 = new PointByRotation(C.center, O, angle, { temp: true })
        return new Circle(O2, C.radius)
      } else {
        O2 = new PointByRotation(C.center, O, angle, { temp: true })
        return new Circle(O2, C.radius)
      }
    } catch (error) {
      console.log('Erreur dans Circle.rotation() avec les arguments ', O, angle, error)
    }
  }

  /**
   * Homothétie définie par un centre et un rapport
   * Renvoie un nouveau point sans modifier le premier
   */

  static homothetie (C: Circle, O: Point, k: number | Measure) {
    try {
      let rayon: Measure
      let O2: PointByHomothetie
      if (k instanceof Measure) {
        rayon = new CalculDynamic((x:Measure[]) => Math.abs(x[0].value * C.radius), [k])
        O2 = new PointByHomothetie(C.center, O, k, { temp: true })
        return new Circle(O2, rayon)
      } else {
        O2 = new PointByHomothetie(C.center, O, k, { temp: true })
        return new Circle(O2, C.radius * k)
      }
    } catch (error) {
      console.log('Erreur dans Circle.homothetie() avec les arguments ', O, k, error)
    }
  }

  /**
   * Similitude définie par un centre, un rapport et un angle en degré
   * Renvoie un nouveau point sans modifier le premier
   */
  static similitude (C: Circle, O: Point, k: number | Measure, angle: number | Measure) {
    try {
      let rayon: Measure
      let O2: PointBySimilitude
      if (k instanceof Measure) {
        rayon = new CalculDynamic((x:Measure[]) => Math.abs(x[0].value * C.radius), [k])
        O2 = new PointBySimilitude(C.center, O, k, angle, { temp: true })
        return new Circle(O2, rayon)
      } else {
        O2 = new PointBySimilitude(C.center, O, k, angle, { temp: true })
        return new Circle(O2, C.radius * k)
      }
    } catch (error) {
      console.log('Erreur dans Circle.similitude() avec les arguments ', O, k, angle, error)
    }
  }

  /**
   * Translation définie par un couple de coordonnées ou un objet possédant des paramètres x et y
   * Renvoie un nouveau cercle sans modifier le premier
   */
  static translation (cercle: Circle, xt: number, yt: number) {
    try {
      const O2 = new Point(cercle.parentFigure, cercle.center.x + xt, cercle.center.y + yt)
      return new Circle(O2, cercle.radius)
    } catch (error) {
      return null
    }
  }

  public distancePointer (pointerX: number, pointerY: number) {
    try {
      return Math.abs(Point.distance(this.center, { x: pointerX, y: pointerY }) - this.radius)
    } catch (error) {
      return NaN
    }
  }

  get latex () {
    try {
      if (!this.isVisible || !this.exist) return ''
      let latex = `\n\n\t% Circle center : ${this.center.label}, radius ${this._radius}`
      latex += `\n \t \\draw${this.tikzOptions} (${this.center.x}, ${this.center.y}) circle(${this.radius});`
      return latex
    } catch (error) {
      return ''
    }
  }
}
