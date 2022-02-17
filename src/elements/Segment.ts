import { Point, StringDependence } from './Point'
import { Element2D } from './Element2D'
import { intersectionLCCoord, intersectionSCCoord } from '../calculus/intersection'
import { Circle } from './Circle'
import { Vector } from './Vector'
import { angleOriented } from '../calculus/trigonometry'
import { PointOnLine } from './PointOnLine'

export type SegmentStyle = '' | '|-' | '-|' | '|-|'
export type OptionsGraphiques = { color?: string, style?: SegmentStyle, thickness?: number, fill?: string, add1?: number, add2?: number, temp?: boolean }

export class Segment extends Element2D {
    x1: number
    y1: number
    x2: number
    y2: number
    ends: [Point, Point]
    temp: boolean
    private _style: string
    constructor (A: Point, B: Point, { color = 'black', thickness = 1, style = '', temp = false }: OptionsGraphiques = {}) {
      super()
      this.temp = temp
      this.x1 = A.x
      this.y1 = A.y
      this.x2 = B.x
      this.y2 = B.y
      this.parentFigure = A.parentFigure
      if (!temp) this.parentFigure.list.push(this)
      this.ends = [A, B]

      const x1Svg = this.parentFigure.xToSx(this.x1)
      const x2Svg = this.parentFigure.xToSx(this.x2)
      const y1Svg = this.parentFigure.yToSy(this.y1)
      const y2Svg = this.parentFigure.yToSy(this.y2)

      const segment = document.createElementNS('http://www.w3.org/2000/svg', 'line')
      segment.setAttribute('x1', `${x1Svg}`)
      segment.setAttribute('y1', `${y1Svg}`)
      segment.setAttribute('x2', `${x2Svg}`)
      segment.setAttribute('y2', `${y2Svg}`)

      this.g = segment
      if (!temp) this.parentFigure.svg.appendChild(this.g)

      // Les styles ne doivent être appliqués qu'une fois le groupe créé
      this.color = color
      this.thickness = thickness
      this.style = style

      // Si une des extrémités se déplace alors on recalcule les coordonnées de line
      A.addDependency({ element: this, type: 'end1' })
      B.addDependency({ element: this, type: 'end2' })
    }

    moveEnd (x: number, y: number, n: 1 | 2) {
      // ToFix NaN ?
      if (!isNaN(x) && !isNaN(y)) {
        this.g.setAttribute(`x${n}`, this.parentFigure.xToSx(x).toString())
        this.g.setAttribute(`y${n}`, this.parentFigure.yToSy(y).toString())
        this[`x${n}`] = x
        this[`y${n}`] = y
        this.changing()
      }
    }

    private changing () {
      for (const dependence of this.dependencies) {
        if (dependence.type === 'intersectionLC') {
          const M = dependence.element as Point
          const [x1, y1] = intersectionLCCoord(dependence.L, dependence.C)
          const [x2, y2] = intersectionLCCoord(dependence.L, dependence.C, 2)
          // On cherche le point d'intersection le plus proche de l'actuel
          if ((M.x - x1) ** 2 + (M.y - y1) ** 2 < (M.x - x2) ** 2 + (M.y - y2) ** 2) {
            M.moveTo(x1, y1)
          } else M.moveTo(x2, y2)
        }
        if (dependence.type === 'intersectionSC') {
          const M = dependence.element as Point
          const [x1, y1] = intersectionLCCoord(dependence.L, dependence.C)
          const [x2, y2] = intersectionLCCoord(dependence.L, dependence.C, 2)
          // On cherche le point d'intersection le plus proche de l'actuel
          if ((M.x - x1) ** 2 + (M.y - y1) ** 2 < (M.x - x2) ** 2 + (M.y - y2) ** 2) {
            M.moveTo(x1, y1)
          } else M.moveTo(x2, y2)
          const [A, B] = dependence.L.ends
          if (M.x > Math.max(A.x, B.x) || M.x < Math.min(A.x, B.x) || M.y > Math.max(A.y, B.y) || M.y < Math.min(A.y, B.y)) {
            M.style = ''
          } else M.style = 'x'
        }
        if (dependence.type === 'pointOnLine') {
          const M = dependence.element as PointOnLine
          // On simule un léger déplacement pour qu'il recalcule sa position sur le cercle
          // M.notifyMouseMove(M.x + 0.00001 * ((Math.random() > 0.5) ? 1 : -1), M.y)
          const [x, y] = intersectionSCCoord(this, dependence.C)
          if (x === undefined) {
            // ToFix cacher la croix
            M.style = ''
          } else {
            M.moveTo(x, y)
            // ToFiX cela créé 2 segments à chaque fois, il faudrait toucher le style visibility plutôt
            if (M.style === '') M.style = 'x'
          }
        }
      }
    }

    addDependency (dependency: { element: Element2D, type: StringDependence, x?: number, y?: number, angle?: number, k?: number, center?: Point, previous?: Point, pointOnCircle?: Point, L?: Segment, C?: Circle}) {
      this.dependencies.push(dependency)
    }

    get tex () {
      const arrayOptions : string[] = []
      if (this.color !== 'black') arrayOptions.push(`color = ${this.color}`)
      if (this.thickness !== 1) arrayOptions.push(`line width = ${this.thickness}`)
      if (this.fill !== 'none') arrayOptions.push(`fill = ${this.fill}`)
      let txtOptions = ''
      if (arrayOptions) txtOptions = `[${arrayOptions.join(', ')}]`
      return `\n \t \\draw${txtOptions} (${this.x1}, ${this.y1}) -- (${this.x2}, ${this.y2});`
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
      const [A, B] = this.ends
      const a = A.y - B.y
      const b = B.x - A.x
      const c = (A.x - B.x) * A.y + (B.y - A.y) * A.x
      return [a, b, c]
    }

    /**
     * Vecteur normal à la droite
     */
    get normal () {
      const [a, b] = this.equation
      return new Vector(a, b)
    }

    /**
     * Vecteur directeur à la droite
     * ToFiX Anglicisation ?
     */
    get directeur () {
      const [a, b] = this.equation
      return new Vector(b, -a)
    }

    get angleWithHorizontal () {
      const O = new Point(this.parentFigure, 0, 0, { temp: true })
      const A = new Point(this.parentFigure, 1, 0, { temp: true })
      const M = new Point(this.parentFigure, this.directeur.x, this.directeur.y, { temp: true })
      return angleOriented(A, O, M)
    }

    set style (style: string) {
      this._style = style
      // const [A, B] = this.ends
      // const h = 0.2
      // const addBorder1 = () => {
      //   A.style = ''
      //   const L = new Segment(A, B, { temp: true })
      //   const M = new PointOnLine(L, { length: h, style: '' })
      //   const A1 = M.rotation(A, 90, { style: '' })
      //   const A2 = M.rotation(A, -90, { style: '' })
      //   const s = new Segment(A1, A2, { color: this.color, thickness: this.thickness })
      //   this.group.push(s)
      // }
      // const addBorder2 = () => {
      //   B.style = ''
      //   const L = new Segment(B, A, { temp: true })
      //   const M = new PointOnLine(L, { length: h, style: '' })
      //   const B1 = M.rotation(B, 90, { style: '' })
      //   const B2 = M.rotation(B, -90, { style: '' })
      //   const s = new Segment(B1, B2, { color: this.color, thickness: this.thickness })
      //   this.group.push(s)
      // }
      // if (style === '|-') addBorder1()
      // if (style === '-|') addBorder2()
      // if (style === '|-|') {
      //   addBorder1()
      //   addBorder2()
      // }
    }
}
