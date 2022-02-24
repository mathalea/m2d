import { Figure } from '../Figure'
import { Element2D } from './Element2D'

export class Text extends Element2D {
    x: number
    y: number
    text: string
    alignment: string
    constructor (figure: Figure, x: number, y: number, text: string, { alignment = '', temp = false }: {alignment?: string, temp?: boolean} = {}) {
      super()
      this.parentFigure = figure
      this.x = x
      this.y = y
      this.text = text
      this.alignment = alignment
      this.g = document.createElementNS('http://www.w3.org/2000/svg', 'text')
      this.g.setAttribute('x', `${this.parentFigure.xToSx(x)}`)
      this.g.setAttribute('y', `${this.parentFigure.yToSy(y)}`)
      this.g.setAttribute('stroke', 'black')
      this.g.style.overflow = 'visible'
      this.g.style.lineHeight = '0'
      this.g.textContent = `${text}`
      if (!temp) this.parentFigure.svg.appendChild(this.g)
    }

    update (): void {

    }

  // get tex () {

  // }
}
