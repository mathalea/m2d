/*
 * Created by Angot Rémi and Lhote Jean-Claude on 15/02/2022.
 *
 * MathALEA 2D : Software for animating online dynamic mathematics figures
 * https://coopmaths.fr
 * @Author Angot Rémi and Lhote Jean-Claude (contact@coopmaths.fr)
 * @License: GNU AGPLv3 https://www.gnu.org/licenses/agpl-3.0.html
 */

import { Point, PointOptions } from './Point'
import { Line } from '../lines/Line'
/**
 * Crée l'image (Point) de A par la symétrie orthogonale d'axe line.
 */
export class PointByReflectionOverLine extends Point {
    line: Line
    previous: Point
    constructor (A: Point, line: Line, { label, style = 'x', size = 0.15, thickness = 3, color = 'black', draggable = false, temp = false }: PointOptions = {}) {
      let x, y
      const [a, b, c] = line.equation
      const k = 1 / (a * a + b * b)
      if (a === 0) {
        x = A.x
        y = -(A.y + (2 * c) / b)
      } else if (b === 0) {
        y = A.y
        x = -(A.x + (2 * c) / a)
      } else {
        x = k * ((b * b - a * a) * A.x - 2 * a * b * A.y - 2 * a * c)
        y = k * ((a * a - b * b) * A.y - 2 * a * b * A.x + (a * a * c) / b - b * c) - c / b
      }
      super(A.parentFigure, x, y, { style, size, thickness, color, draggable, temp })
      this.line = line
      this.previous = A
      if (label !== undefined) this.label = label
      A.addChild(this)
      line.addChild(this)
    }

    update (): void {
      try {
        let x, y
        const [a, b, c] = this.line.equation
        const k = 1 / (a * a + b * b)
        if (a === 0) {
          x = this.previous.x
          y = -(this.previous.y + (2 * c) / b)
        } else if (b === 0) {
          y = this.previous.y
          x = -(this.previous.x + (2 * c) / a)
        } else {
          x = k * ((b * b - a * a) * this.previous.x - 2 * a * b * this.previous.y - 2 * a * c)
          y = k * ((a * a - b * b) * this.previous.y - 2 * a * b * this.previous.x + (a * a * c) / b - b * c) - c / b
        }
        this.moveTo(x, y)
      } catch (error) {
        console.log('Erreur dans PointByreflectionOverLine.update()', error)
        this.exist = false
      }
    }
}
