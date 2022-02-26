import { Point } from '../points/Point'
import { Line, OptionsGraphiques } from './Line'
import { SegmentStyle } from './Line'

export class Ray extends Line {
  constructor(A: Point, B: Point, { color = 'black', thickness = 1, style = '', temp = false }: OptionsGraphiques = {}) {
    super(A, B, 'Ray', { color, thickness, style, temp })

  }
  update(): void {

    ;[this.x1, this.y1, this.x2, this.y2] = getRayCoordsOut(this.A, this.B)

    const x1Svg = this.parentFigure.xToSx(this.x1)
    const x2Svg = this.parentFigure.xToSx(this.x2)
    const y1Svg = this.parentFigure.yToSy(this.y1)
    const y2Svg = this.parentFigure.yToSy(this.y2)
    this.g.setAttribute('x1', `${x1Svg}`)
    this.g.setAttribute('y1', `${y1Svg}`)
    this.g.setAttribute('x2', `${x2Svg}`)
    this.g.setAttribute('y2', `${y2Svg}`)
    this.notifyAllDependencies()
  }
}
function getRayCoordsOut(A: Point, B: Point) {
  const parentFigure = A.parentFigure
  let pente = Infinity
  if (B.x !== A.x) {
    pente = (B.y - A.y) / (B.x - A.x)
  }
  if (pente === Infinity) {
    if (A.y > B.y) return [A.x, A.y, A.x, parentFigure.yMin] // Si la droite est verticale on prend l'abscisse de A et le bon bord en ordonnée
    else[A.x, A.y, A.x, parentFigure.yMax] // Ici on sort par en haut
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
}
