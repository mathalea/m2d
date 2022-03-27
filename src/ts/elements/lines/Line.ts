/*
 * Created by Angot Rémi and Lhote Jean-Claude on 15/02/2022.
 *
 * MathALEA 2D : Software for animating online dynamic mathematics figures
 * https://coopmaths.fr
 * @Author Angot Rémi and Lhote Jean-Claude (contact@coopmaths.fr)
 * @License: GNU AGPLv3 https://www.gnu.org/licenses/agpl-3.0.html
 */
import { PointByTranslationVector } from './../points/PointByTranslationVector'
import { PointByTranslation } from './../points/PointByTranslation'
import { PointByReflectionOverLine } from './../points/PointByReflectionOverLine'
import { PointByHomothetie } from './../points/PointByHomothetie'
import { Element2D } from '../Element2D'
import { Vector } from '../others/Vector'
import { Point } from '../points/Point'
import { Measure } from '../measures/Measure'
import { Coords } from '../others/Coords'
import { Angle } from '../measures/Angle'
import { PointByRotation } from '../points/PointByRotation'
import { PointBySimilitude } from '../points/PointBySimilitude'

export type LineType = 'Line' | 'Segment' | 'Ray'
export type SegmentStyle = '' | '|-' | '-|' | '|-|'
export type OptionsGraphiques = { color?: string, style?: SegmentStyle, thickness?: number, fill?: string, add1?: number, add2?: number, temp?: boolean, dashed?: boolean, lineType?: LineType }
/**
 * Crée une droite, une demi-droite ou un segment à partir de deux points.
 * lineType défini le type de tracé parmis les trois types : Line (defaut), Ray ou Segment
 * Pour les deux derniers types, il est préférable de passer par les sous classes respectives (Ray ou Segment)
 */
export class Line extends Element2D {
  A: Point
  B: Point
  x1: number
  y1: number // Coordonnées de l'extrémité la plus à gauche (qui sort légèrement du cadre)
  x2: number
  y2: number // Coordonnées de l'extrémité la plus à droite
  lineType: LineType
  _style: string
  temp: boolean
  label: string
  constructor (A: Point, B: Point, { lineType = 'Line', color = 'black', thickness = 1, style = '', temp = false, dashed = false }: OptionsGraphiques = {}) {
    super(A.parentFigure)
    this.exist = true
    this.A = A
    this.B = B
    this.lineType = lineType
    this._style = ''
    this.label = (A.label.length > 0 && B.label.length > 0) ? `(${A.label + B.label})` : ''

    if (this.lineType === 'Line') {
      if (A.isOnFigure()) {
        ;[this.x1, this.y1, this.x2, this.y2] = getCoordsOut(A, B)
      } else if (B.isOnFigure()) {
        ;[this.x1, this.y1, this.x2, this.y2] = getCoordsOut(B, A)
      } else {
        ;[this.x1, this.y1, this.x2, this.y2] = [A.x, A.y, B.x, B.y]
      }
    } else if (this.lineType === 'Ray') {
      ;[this.x1, this.y1, this.x2, this.y2] = getRayCoordsOut(A, B)
    } else if (this.lineType === 'Segment') {
      ;[this.x1, this.y1, this.x2, this.y2] = [A.x, A.y, B.x, B.y]
    } else {
      throw new Error("Le type doit être l'un des trois suivants : Line ou Segment ou Ray")
    }
    const x1Svg = this.parentFigure.xToSx(this.x1)
    const x2Svg = this.parentFigure.xToSx(this.x2)
    const y1Svg = this.parentFigure.yToSy(this.y1)
    const y2Svg = this.parentFigure.yToSy(this.y2)

    this.g = document.createElementNS('http://www.w3.org/2000/svg', 'line')
    this.g.setAttribute('x1', `${x1Svg}`)
    this.g.setAttribute('y1', `${y1Svg}`)
    this.g.setAttribute('x2', `${x2Svg}`)
    this.g.setAttribute('y2', `${y2Svg}`)

    this.temp = temp
    this.color = color
    this.thickness = thickness
    this.dashed = dashed
    if (!temp) this.parentFigure.svg.appendChild(this.g)
    if (!temp) this.parentFigure.set.add(this)
    A.addChild(this)
    B.addChild(this)
    this.exist = A.exist && B.exist && this.exist
  }

  update () {
    try {
      const [xOutLeft, yOutLeft, xOutRight, yOutRight] = getCoordsOut(this.A, this.B)
      // console.log(xOutLeft, yOutLeft, xOutRight, yOutRight, this.A.exist)
      const x1Svg = this.parentFigure.xToSx(xOutRight)
      const x2Svg = this.parentFigure.xToSx(xOutLeft)
      const y1Svg = this.parentFigure.yToSy(yOutRight)
      const y2Svg = this.parentFigure.yToSy(yOutLeft)
      this.g.setAttribute('x1', `${x1Svg}`)
      this.g.setAttribute('y1', `${y1Svg}`)
      this.g.setAttribute('x2', `${x2Svg}`)
      this.g.setAttribute('y2', `${y2Svg}`)
      this.notifyAllChilds()
    } catch (error) {
      console.log('Erreur dans Line.update() ', error)
      this.exist = false
    }
  }

  get latex () {
    try {
      if (!this.isVisible || !this.exist) return ''
      let latex = `\n\n\t% ${this.label ?? 'Droite'}`
      latex += `\n \t \\draw${this.tikzOptions} (${this.x1}, ${this.y1}) -- (${this.x2}, ${this.y2});`
      return latex
    } catch (error) {
      console.log('Erreur dans Line.latex()', error)
      return ''
    }
  }

  get style () {
    return this._style
  }

  /**
   * Renvoie [a, b] tels que la droite est définie par y = ax + b
   * ToFiX gestion des droites verticales et du cas où les 2 extrémités sont confondues
   */
  get affine () {
    try {
      const [a, b, c] = this.equation
      return [-a / b, -c / b]
    } catch (error) {
      console.log('Erreur dans Line.affine()', error)
      return [NaN, NaN]
    }
  }

  /**
   * Renvoie [a, b, c] tels que ax +y + c = 0
   */
  get equation () {
    try {
      const a = this.A.y - this.B.y
      const b = this.B.x - this.A.x
      const c = (this.A.x - this.B.x) * this.A.y + (this.B.y - this.A.y) * this.A.x
      return [a, b, c]
    } catch (error) {
      console.log('Erreur dans Line.equation()', error)
      this.exist = false
      return [NaN, NaN, NaN]
    }
  }

  /**
   * Vecteur normal à la droite
   */
  get normal () {
    try {
      const [a, b] = this.equation
      return new Vector(this.parentFigure, a, b)
    } catch (error) {
      console.log('Erreur dans Line.normal()', error)
      this.exist = false
      return { x: NaN, y: NaN }
    }
  }

  /**
   * Vecteur directeur à la droite
   * ToFiX Anglicisation ?
   */
  get directeur () {
    try {
      const [a, b] = this.equation
      return new Vector(this.parentFigure, b, -a)
    } catch (error) {
      console.log('Erreur dans Line.directeur()', error)
      this.exist = false
      return { x: NaN, y: NaN }
    }
  }

  get angleWithHorizontal () {
    try {
      const O: Coords = { x: 0, y: 0 }
      const A: Coords = { x: 1, y: 0 }
      const M: Coords = { x: this.directeur.x, y: this.directeur.y }
      return Angle.angleOriented(A, O, M)
    } catch (error) {
      console.log('Erreur dans Line.angleWidthHorizontal', error)
      return NaN
    }
  }

  public distancePointer (pointerX: number, pointerY: number) {
    try {
      const M = Coords.orthogonalProjectionCoord({ x: pointerX, y: pointerY }, this)
      return Point.distance(M, { x: pointerX, y: pointerY })
    } catch (error) {
      console.log('Erreur dans Line.distancePointer', error)
      return NaN
    }
  }

  translation (xt:number|Measure, yt:number|Measure) {
    try {
      const M = new PointByTranslation(this.A, xt, yt, { temp: true })
      const N = new PointByTranslation(this.B, xt, yt, { temp: true })
      return new Line(M, N)
    } catch (error) {
      console.log('Erreur dans Line.reflectionOverLine()', error)
      return new Line(this.A, this.B)
    }
  }

  translationVector (v:Vector) {
    try {
      const M = new PointByTranslationVector(this.A, v, { temp: true })
      const N = new PointByTranslationVector(this.B, v, { temp: true })
      return new Line(M, N)
    } catch (error) {
      console.log('Erreur dans Line.reflectionOverLine()', error)
      return new Line(this.A, this.B)
    }
  }

  reflectionOverLine (L: Line) {
    try {
      const M = new PointByReflectionOverLine(this.A, L, { temp: true })
      const N = new PointByReflectionOverLine(this.B, L, { temp: true })
      return new Line(M, N)
    } catch (error) {
      console.log('Erreur dans Line.reflectionOverLine()', error)
      return new Line(this.A, this.B)
    }
  }

  homothetie (center: Point, k:number|Measure) {
    try {
      const M = new PointByHomothetie(this.A, center, k, { temp: true })
      const N = new PointByHomothetie(this.B, center, k, { temp: true })
      return new Line(M, N)
    } catch (error) {
      console.log('Erreur dans Line.homothetie()', error)
      return new Line(this.A, this.B)
    }
  }

  /* usage : Segment.homothetie(segment, center, factor)
  static homothetie (line: Line, center: Point, k:number|Measure) {
    try {
      const M = new PointByHomothetie(line.A, center, k, { temp: true })
      const N = new PointByHomothetie(line.B, center, k, { temp: true })
      return new Line(M, N)
    } catch (error) {
      console.log('Erreur dans Line.homothetie()', error)
      return new Line(line.A, line.A)
    }
  }

  static rotation (line: Line, center: Point, angle: number|Measure) {
    try {
      const M = new PointByRotation(line.A, center, angle, { temp: true })
      const N = new PointByRotation(line.B, center, angle, { temp: true })
      console.log(line.lineType)
      return new Line(M, N, { lineType: line.lineType })
    } catch (error) {
      console.log('Erreur dans Line.homothetie()', error)
      return new Line(line.A, line.A)
    }
  }
*/
  rotation (center: Point, angle: number|Measure) {
    try {
      const M = new PointByRotation(this.A, center, angle, { temp: true })
      const N = new PointByRotation(this.B, center, angle, { temp: true })
      return new Line(M, N, { lineType: this.lineType })
    } catch (error) {
      console.log('Erreur dans Line.homothetie()', error)
      return new Line(this.A, this.B)
    }
  }
  /*
  static similitude (line: Line, center: Point, k: number|Measure, angle: number|Measure) {
    try {
      const M = new PointBySimilitude(line.A, center, k, angle, { temp: true })
      const N = new PointBySimilitude(line.B, center, k, angle, { temp: true })
      return new Line(M, N)
    } catch (error) {
      console.log('Erreur dans Line.similitude()', error)
      return new Line(line.A, line.A)
    }
  }
*/

  similitude (center: Point, k: number|Measure, angle: number|Measure) {
    try {
      const M = new PointBySimilitude(this.A, center, k, angle, { temp: true })
      const N = new PointBySimilitude(this.B, center, k, angle, { temp: true })
      return new Line(M, N)
    } catch (error) {
      console.log('Erreur dans Line.similitude()', error)
      return new Line(this.A, this.A)
    }
  }
}
// une droite coupe deux bords, on les détecte ici.
function getCoordsOut (A: Point, B: Point) {
  try {
    const parentFigure = A.parentFigure
    let pente = Infinity
    if (B.x !== A.x) {
      pente = (B.y - A.y) / (B.x - A.x)
    }
    if (pente === Infinity) return [A.x, parentFigure.yMax, A.x, parentFigure.yMin]
    if (Math.abs(pente) < 10 ** -4) return [parentFigure.xMin, A.y, parentFigure.xMax, A.y]
    let xOutLeft: number, yOutLeft: number
    let n = 0
    while (true) {
      xOutLeft = A.x + n
      yOutLeft = A.y + n * pente
      n++
      if (xOutLeft > parentFigure.xMax + 1 || yOutLeft > parentFigure.yMax + 1 || yOutLeft < parentFigure.yMin - 1) break
    }
    let xOutRight: number, yOutRight: number
    n = 0
    while (true) {
      xOutRight = A.x + n
      yOutRight = A.y + n * pente
      n--
      if (xOutRight < parentFigure.xMin - 1 || yOutRight > parentFigure.yMax + 1 || yOutRight < parentFigure.yMin - 1) break
    }
    return [xOutLeft, yOutLeft, xOutRight, yOutRight]
  } catch (error) {
    console.log('Erreur dans Line.getCoordsOut', error)
    return [NaN, NaN, NaN, NaN]
  }
}

// Parce que les demi-droites ne sortent que d'un côté... celui de B.
function getRayCoordsOut (A: Point, B: Point) {
  try {
    const parentFigure = A.parentFigure
    let pente = Infinity
    if (B.x !== A.x) {
      pente = (B.y - A.y) / (B.x - A.x)
    }
    if (pente === Infinity) {
      if (A.y > B.y) return [A.x, A.y, A.x, parentFigure.yMin] // Si la droite est verticale on prend l'abscisse de A et le bon bord en ordonnée
      else return [A.x, A.y, A.x, parentFigure.yMax] // Ici on sort par en haut
    }
    if (Math.abs(pente) < 10 ** -4) {
      if (A.x > B.x) return [A.x, A.y, parentFigure.xMin, A.y]
      else return [A.x, A.y, parentFigure.xMax, A.y]
    }
    let xOutLeft: number, yOutLeft: number
    let n = 0
    if (B.x > A.x) {
      while (true) {
        xOutLeft = A.x + n
        yOutLeft = A.y + n * pente
        n++
        if (xOutLeft > parentFigure.xMax + 1 || yOutLeft > parentFigure.yMax + 1 || yOutLeft < parentFigure.yMin - 1) break
      }
      return [A.x, A.y, xOutLeft, yOutLeft]
    } else {
      while (true) {
        xOutLeft = A.x - n
        yOutLeft = A.y - n * pente
        n++
        if (xOutLeft < parentFigure.xMin - 1 || yOutLeft > parentFigure.yMax + 1 || yOutLeft < parentFigure.yMin - 1) break
      }
      return [A.x, A.y, xOutLeft, yOutLeft]
    }
  } catch (error) {
    console.log('Erreur dans Line.getRayCoordsOut', error)
    return [NaN, NaN, NaN, NaN]
  }
}
