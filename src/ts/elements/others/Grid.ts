import { Figure } from '../../Figure'
import { Element2D } from '../Element2D'

export class Grid extends Element2D {
  xMin: number
  xMax: number
  yMin: number
  yMax: number
  dx: number
  dy: number
  constructor (figure: Figure, { xMin = figure.xMin, xMax = figure.xMax, yMin = figure.yMin, yMax = figure.yMax, dx = 1, dy = 1, color = 'gray', opacity = 0.2, dashed = false, thickness = 1 }: {xMin?: number, xMax?: number, yMin?: number, yMax?: number, dx?: number, dy?: number, color?: string, opacity?: number, dashed?: boolean, thickness?: number } = {}) {
    super()
    this.parentFigure = figure
    this.xMin = xMin
    this.xMax = xMax
    this.yMin = yMin
    this.yMax = yMax
    this.dx = dx
    this.dy = dy

    for (let x: number = xMin; x <= xMax; x += dx) {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
      line.setAttribute('x1', `${figure.xToSx(x)}`)
      line.setAttribute('y1', `${figure.yToSy(yMin)}`)
      line.setAttribute('x2', `${figure.xToSx(x)}`)
      line.setAttribute('y2', `${figure.yToSy(yMax)}`)
      this.g.appendChild(line)
    }
    for (let y: number = yMin; y <= yMax; y += dy) {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
      line.setAttribute('x1', `${figure.xToSx(xMin)}`)
      line.setAttribute('y1', `${figure.yToSy(y)}`)
      line.setAttribute('x2', `${figure.xToSx(xMax)}`)
      line.setAttribute('y2', `${figure.yToSy(y)}`)
      this.g.appendChild(line)
    }
    figure.svg.appendChild(this.g)
    figure.set.add(this)
    this.color = color
    this.opacity = opacity
    this.dashed = dashed
    this.thickness = thickness
  }

  update () {
    // C'est un élément fixe qui n'a pas vocation à être déplacé.
  }

  get latex (): string {
    let latex = '\n\t% Grid'
    const tikzOptions = this.tikzOptions
    for (let x: number = this.xMin; x <= this.xMax; x += this.dx) {
      latex += `\n\t\\draw${tikzOptions} (${x}, ${this.yMin}) -- (${x}, ${this.yMax});`
    }
    for (let y: number = this.yMin; y <= this.yMax; y += this.dy) {
      latex += `\n\t\\draw${tikzOptions} (${this.xMin}, ${y}) -- (${this.xMax}, ${y});`
    }
    return latex
  }
}
