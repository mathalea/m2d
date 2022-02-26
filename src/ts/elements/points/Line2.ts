import { Element2D } from '../Element2D'
import { Point } from './Point'

export class Line2 extends Element2D {
    A: Point
    B: Point
    constructor (A: Point, B: Point) {
      super()
      this.parentFigure = A.parentFigure
      this.A = A
      this.B = B
      let xOut: number, yOut: number, xOut2: number, yOut2: number
      if (A.isOnFigure) {
        ;[xOut, yOut, xOut2, yOut2] = getCoordsOut(A, B)
      } else if (B.isOnFigure) {
        ;[xOut, yOut, xOut2, yOut2] = getCoordsOut(B, A)
      } else {
        ;[xOut, yOut, xOut2, yOut2] = [A.x, A.y, B.x, B.y]
      }
      const x1Svg = this.parentFigure.xToSx(xOut2)
      const x2Svg = this.parentFigure.xToSx(xOut)
      const y1Svg = this.parentFigure.yToSy(yOut2)
      const y2Svg = this.parentFigure.yToSy(yOut)

      this.g = document.createElementNS('http://www.w3.org/2000/svg', 'line')
      this.g.setAttribute('x1', `${x1Svg}`)
      this.g.setAttribute('y1', `${y1Svg}`)
      this.g.setAttribute('x2', `${x2Svg}`)
      this.g.setAttribute('y2', `${y2Svg}`)

      // if (!temp)
      this.parentFigure.svg.appendChild(this.g)
      this.color = 'blue'
      A.addDependency(this)
      B.addDependency(this)
    }

    update () {
      const [xOut, yOut, xOut2, yOut2] = getCoordsOut(this.A, this.B)
      const x1Svg = this.parentFigure.xToSx(xOut2)
      const x2Svg = this.parentFigure.xToSx(xOut)
      const y1Svg = this.parentFigure.yToSy(yOut2)
      const y2Svg = this.parentFigure.yToSy(yOut)
      this.g.setAttribute('x1', `${x1Svg}`)
      this.g.setAttribute('y1', `${y1Svg}`)
      this.g.setAttribute('x2', `${x2Svg}`)
      this.g.setAttribute('y2', `${y2Svg}`)
    }
}

function getCoordsOut (A: Point, B: Point) {
  const parentFigure = A.parentFigure
  let pente = Infinity
  if (B.y !== A.y) {
    pente = (B.y - A.y) / (B.x - A.x)
  }
  if (pente === Infinity) return [A.x, parentFigure.yMax, A.x, parentFigure.yMin]
  if (pente === 0) return [parentFigure.xMin, A.y, parentFigure.xMax, A.y]
  let xOut: number, yOut: number
  let n = 0
  while (true) {
    xOut = A.x + n
    yOut = A.y + n * pente
    n++
    if (xOut > parentFigure.xMax || yOut > parentFigure.yMax || yOut < parentFigure.yMin) break
  }
  let xOut2: number, yOut2: number
  n = 0
  while (true) {
    xOut2 = A.x + n
    yOut2 = A.y + n * pente
    n--
    if (xOut2 < parentFigure.xMin || yOut2 > parentFigure.yMax || yOut2 < parentFigure.yMin) break
  }
  console.log(xOut, yOut, xOut2, yOut2)
  return [xOut, yOut, xOut2, yOut2]
}
