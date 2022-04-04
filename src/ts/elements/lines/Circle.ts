import { PointByReflectionOverLine } from './../points/PointByReflectionOverLine'
import { PointByTranslationVector } from './../points/PointByTranslationVector'
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
import { OptionsGraphiques, Line } from './Line'
import { CalculDynamic } from '../measures/CalculDynamic'
import { PointByRotation } from '../points/PointByRotation'
import { PointBySimilitude } from '../points/PointBySimilitude'
import { Distance } from '../measures/Distance'
import { Const } from '../measures/Const'
import { Vector } from './../others/Vector'
import { PointByHomothetie } from './../points/PointByHomothetie'
import { VectorByPoints } from '../others/VectorByPoints'
/**
 * Crée un cercle dont on donne le centre et un point ou le rayon.
 * Le rayon peut être un nombre (constante) ou une instance des classes dérivées de Measure
 */
export class Circle extends Element2D {
  center: Point
  temp: boolean
  M: Point // Point de même ordonnée que le centre et d'abscisse supérieure
  pointOnCircle: Point | null // Point qui définit le cercle
  private _radius: Measure // _radius est une Measure (CalculDynamic ou Distance) alors que radius est un nombre (sa propriété value)
  constructor (center: Point, arg2: number | Point | Measure, { color = 'black', thickness = 1, fill = 'none', temp = false, dashed = false }: OptionsGraphiques = {}) {
    let rayon
    if (arg2 instanceof Point) rayon = new Distance(center, arg2)
    else if (typeof arg2 === 'number') rayon = new Const(center.parentFigure, arg2)
    else rayon = arg2
    super(center.parentFigure)
    this._radius = rayon
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
      rayon.addChild(this)
    }
    this.update()
  }

  /**
   * Sauvegarde les informations pour refaire cet élément
   */
  save () {
    this.parentFigure.save[this.id] = { className: 'Circle', arguments: [this.center.id, this._radius.id], thickness: this.thickness, color: this.color }
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
  rotation (O: Point, angle: number | Measure) {
    try {
      let O2: PointByRotation
      if (angle instanceof Measure) {
        O2 = new PointByRotation(this.center, O, angle, { temp: true })
        return new Circle(O2, this._radius)
      } else {
        O2 = new PointByRotation(this.center, O, angle, { temp: true })
        return new Circle(O2, this._radius)
      }
    } catch (error) {
      console.log('Erreur dans Circle.rotation() avec les arguments ', O, angle, error)
    }
  }

  /**
   * Homothétie définie par un centre et un rapport
   * Renvoie un nouveau point sans modifier le premier
   */

  homothetie (O: Point, k: number | Measure) {
    try {
      let rayon: Measure
      if (k instanceof Measure) {
        rayon = new CalculDynamic((x:Measure[]) => Math.abs(x[0].value * x[1].value), [k, this._radius])
      } else {
        rayon = new CalculDynamic((x:Measure[]) => Math.abs(x[0].value * k), [this._radius])
      }
      const O2 = new PointByHomothetie(this.center, O, k, { temp: true })
      return new Circle(O2, rayon)
    } catch (error) {
      console.log('Erreur dans Circle.homothetie() avec les arguments ', O, k, error)
      return new Circle(this.center, this.radius)
    }
  }

  /**
   * Similitude définie par un centre, un rapport et un angle en degré
   * Renvoie un nouveau point sans modifier le premier
   */
  similitude (O: Point, k: number | Measure, angle: number | Measure) {
    try {
      let rayon: Measure
      if (k instanceof Measure) {
        rayon = new CalculDynamic((x:Measure[]) => Math.abs(x[0].value * x[1].value), [k, this._radius])
      } else {
        rayon = new CalculDynamic((x:Measure[]) => Math.abs(x[0].value * k), [this._radius])
      }
      const O2 = new PointBySimilitude(this.center, O, k, angle, { temp: true })
      return new Circle(O2, rayon)
    } catch (error) {
      console.log('Erreur dans Circle.similitude() avec les arguments ', O, k, angle, error)
      return new Circle(this.center, this.radius)
    }
  }

  /**
   * Translation définie par un couple de coordonnées ou un objet possédant des paramètres x et y
   * Renvoie un nouveau cercle sans modifier le premier
   */
  translation (xt: number, yt: number) {
    try {
      const rayon = new CalculDynamic((x:Measure[]) => Math.abs(x[0].value), [this._radius])
      const O2 = new Point(this.parentFigure, this.center.x + xt, this.center.y + yt)
      return new Circle(O2, rayon)
    } catch (error) {
      console.log('Erreur dans Circle.translation() avec les arguments', xt, yt, error)
      return new Circle(this.center, this.radius)
    }
  }

  /**
   * Translation définie par un couple de coordonnées ou un objet possédant des paramètres x et y
   * Renvoie un nouveau cercle sans modifier le premier
   */
  translationVector (v: Vector | VectorByPoints) {
    try {
      const rayon = new CalculDynamic((x:Measure[]) => Math.abs(x[0].value), [this._radius])
      const O2 = new PointByTranslationVector(this.center, v)
      return new Circle(O2, rayon)
    } catch (error) {
      console.log('Erreur dans Circle.translationVector() avec le vecteur ', v, error)
      return new Circle(this.center, this.radius)
    }
  }

  reflectionOverLine (L: Line) {
    try {
      const rayon = new CalculDynamic((x:Measure[]) => Math.abs(x[0].value), [this._radius])
      const O2 = new PointByReflectionOverLine(this.center, L)
      return new Circle(O2, rayon)
    } catch (error) {
      console.log('Erreur dans Circle.translationVector() avec le vecteur ', L, error)
      return new Circle(this.center, this.radius)
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
