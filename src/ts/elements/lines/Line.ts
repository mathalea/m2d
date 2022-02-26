import { angleOriented } from '../../calculus/trigonometry'
import { Element2D } from '../Element2D'
import { Vector } from '../others/Vector'
import { Point } from '../points/Point'
import { PointByRotation } from '../points/PointByRotation'
import { PointOnLine } from '../points/PointOnLine'
import { OptionsGraphiques, Segment } from './Segment'

export class Line extends Element2D {
    A: Point
    B: Point
    x1: number
    y1: number // Coordonnées de l'extrémité la plus à gauche (qui sort légèrement du cadre)
    x2: number
    y2: number // Coordonnées de l'extrémité la plus à droite
    label: string
    _style: string
    _dashed: boolean
    temp: boolean
    constructor (A: Point, B: Point, { color = 'black', thickness = 1, style = '', temp = false, dashed = false }: OptionsGraphiques = {}) {
      super()
      this.parentFigure = A.parentFigure
      this.A = A
      this.B = B
      if (A.isOnFigure) {
        ;[this.x1, this.y1, this.x2, this.y2] = getCoordsOut(A, B)
      } else if (B.isOnFigure) {
        ;[this.x1, this.y1, this.x2, this.y2] = getCoordsOut(B, A)
      } else {
        ;[this.x1, this.y1, this.x2, this.y2] = [A.x, A.y, B.x, B.y]
      }
      const x1Svg = this.parentFigure.xToSx(this.x2)
      const x2Svg = this.parentFigure.xToSx(this.x1)
      const y1Svg = this.parentFigure.yToSy(this.y2)
      const y2Svg = this.parentFigure.yToSy(this.y1)

      this.g = document.createElementNS('http://www.w3.org/2000/svg', 'line')
      this.g.setAttribute('x1', `${x1Svg}`)
      this.g.setAttribute('y1', `${y1Svg}`)
      this.g.setAttribute('x2', `${x2Svg}`)
      this.g.setAttribute('y2', `${y2Svg}`)

      this.temp = temp
      this.color = color
      this.thickness = thickness
      this.dashed = dashed
      this.style = style
      if (!temp) this.parentFigure.svg.appendChild(this.g)
      A.addDependency(this)
      B.addDependency(this)
    }

    update () {
      const [xOutLeft, yOutLeft, xOutRight, yOutRight] = getCoordsOut(this.A, this.B)
      const x1Svg = this.parentFigure.xToSx(xOutRight)
      const x2Svg = this.parentFigure.xToSx(xOutLeft)
      const y1Svg = this.parentFigure.yToSy(yOutRight)
      const y2Svg = this.parentFigure.yToSy(yOutLeft)
      this.g.setAttribute('x1', `${x1Svg}`)
      this.g.setAttribute('y1', `${y1Svg}`)
      this.g.setAttribute('x2', `${x2Svg}`)
      this.g.setAttribute('y2', `${y2Svg}`)
      this.notifyAllDependencies()
    }

    get latex () {
      const arrayOptions : string[] = []
      if (this.color !== 'black') arrayOptions.push(`color = ${this.color}`)
      if (this.thickness !== 1) arrayOptions.push(`line width = ${this.thickness}`)
      if (this.fill !== 'none') arrayOptions.push(`fill = ${this.fill}`)
      if (this.dashed) arrayOptions.push('dashed')
      let txtOptions = ''
      if (arrayOptions) txtOptions = `[${arrayOptions.join(', ')}]`
      let latex = `\n\t% ${this.label ?? 'Droite'}`
      latex += `\n \t \\draw${txtOptions} (${this.x1}, ${this.y1}) -- (${this.x2}, ${this.y2});`
      return latex
    }

    get style () {
      return this._style
    }

    /**
     * Renvoie [a, b] tels que la droite est définie par y = ax + b
     * ToFiX gestion des droites verticales et du cas où les 2 extrémités sont confondues
     */
    get affine () {
      const [a, b, c] = this.equation
      return [-a / b, -c / b]
    }

    /**
     * Renvoie [a, b, c] tels que ax +y + c = 0
     */
    get equation () {
      const a = this.A.y - this.B.y
      const b = this.B.x - this.A.x
      const c = (this.A.x - this.B.x) * this.A.y + (this.B.y - this.A.y) * this.A.x
      return [a, b, c]
    }

    /**
     * Vecteur normal à la droite
     */
    get normal () {
      const [a, b] = this.equation
      return new Vector(this.parentFigure, a, b)
    }

    /**
     * Vecteur directeur à la droite
     * ToFiX Anglicisation ?
     */
    get directeur () {
      const [a, b] = this.equation
      return new Vector(this.parentFigure, b, -a)
    }

    get angleWithHorizontal () {
      const O = new Point(this.parentFigure, 0, 0, { temp: true })
      const A = new Point(this.parentFigure, 1, 0, { temp: true })
      const M = new Point(this.parentFigure, this.directeur.x, this.directeur.y, { temp: true })
      return angleOriented(A, O, M)
    }

    set style (style: string) {
      this._style = style
      const h = 0.2
      const addBorder1 = () => {
        this.A.style = ''
        const L = new Segment(this.A, this.B, { temp: true })
        const M = new PointOnLine(L, { length: h, style: '' })
        const A1 = new PointByRotation(M, this.A, 90, { temp: true, style: '' })
        const A2 = new PointByRotation(M, this.A, -90, { style: '' })
        const s = new Segment(A1, A2, { color: this.color, thickness: this.thickness })
        this.group.push(s)
      }
      const addBorder2 = () => {
        this.B.style = ''
        const L = new Segment(this.B, this.A, { temp: true })
        const M = new PointOnLine(L, { length: h, temp: true, style: '' })
        const B1 = new PointByRotation(M, this.B, 90, { temp: true, style: '' })
        const B2 = new PointByRotation(M, this.B, -90, { temp: true, style: '' })
        const s = new Segment(B1, B2, { color: this.color, thickness: this.thickness })
        this.group.push(s)
      }
      if (style === '|-') addBorder1()
      if (style === '-|') addBorder2()
      if (style === '|-|') {
        addBorder1()
        addBorder2()
      }
    }

    get dashed () {
      return this._dashed
    }

    set dashed (isDashed) {
      if (isDashed) {
        this.g.setAttribute('stroke-dasharray', '4 3')
      } else {
        this.g.removeAttribute('stroke-dasharray')
      }
      this._dashed = isDashed
    }
}

function getCoordsOut (A: Point, B: Point) {
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
}
