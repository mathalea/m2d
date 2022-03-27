/*
 * Created by Angot Rémi and Lhote Jean-Claude on 15/02/2022.
 *
 * MathALEA 2D : Software for animating online dynamic mathematics figures
 * https://coopmaths.fr
 * @Author Angot Rémi and Lhote Jean-Claude (contact@coopmaths.fr)
 * @License: GNU AGPLv3 https://www.gnu.org/licenses/agpl-3.0.html
 */

import { Figure } from '../../Figure'
import { Element2D } from '../Element2D'
/**
 * Crée un rond plein aux coordonnées fournies.
 * Sert notamment dans les instances de Point dont il est en fait l'élément graphique.
 */
export class RoundMark extends Element2D {
    x: number
    y: number
    size: number
    label: string
    constructor (svgContainer: Figure, x: number, y: number, { color = 'blue', size = 0.15, thickness = 2, label = '', fill = 'blue' }: {color?: string, size?: number, thickness?: number, label?: string, fill?: string} = {}) {
      super(svgContainer)
      this.x = x
      this.y = y
      this.size = size
      this.g = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
      this.parentFigure.svg.appendChild(this.g)
      const xSvg = this.parentFigure.xToSx(this.x)
      const ySvg = this.parentFigure.yToSy(this.y)
      this.g.setAttribute('cx', `${xSvg}`)
      this.g.setAttribute('cy', `${ySvg}`)
      this.g.setAttribute('r', `${size * this.parentFigure.pixelsPerUnit}`)
      this.color = color
      this.fill = fill
      this.label = label
      this.thickness = thickness
      this.parentFigure.set.add(this)
    }

    update (): void {
      try {
        const xSvg = this.parentFigure.xToSx(this.x)
        const ySvg = this.parentFigure.yToSy(this.y)
        this.g.setAttribute('cx', `${xSvg}`)
        this.g.setAttribute('cy', `${ySvg}`)
      } catch (error) {
        console.log(error)
        this.exist = false
      }
    }

    get latex () {
      if (!this.isVisible || !this.exist) return ''
      let tex = `\n\n\t % Point ${this.label ?? ''}`
      tex += `\n \t \\draw${this.tikzOptions} (${this.x}, ${this.y}) circle(${this.size});`
      return tex
    }
}
