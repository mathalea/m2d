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
import { Segment } from '../lines/Segment'
import { Algebraic } from '../measures/Algebraic'
import { Point } from '../points/Point'
import { PointOnSegment } from '../points/PointOnSegment'
import { DisplayMeasure } from '../texts/DisplayMeasure'

export class Cursor extends Element2D {
  tab: Point
  origin: Point
  length: number
line: Segment
min: number
max: number
step: number
algebraic: Algebraic
display: DisplayMeasure

constructor (svgContainer: Figure, x: number, y: number, { min = 0, max = 1, step = 0.1, length = 2, value = 0 }: {min?: number, max?:number, step?:number, length?:number, value?:number}) {
  super(svgContainer)
  const factor = Math.round(length / step)
  if (!Number.isInteger(length / step)) {
    length = factor * step
  }
  this.length = length
  this.algebraic = new Algebraic(svgContainer, Math.max(Math.min(value, max), min))
  this.step = step
  this.max = max
  this.min = min
  const M = new Point(svgContainer, x, y, { temp: true })
  const N = new Point(svgContainer, x + length, y, { temp: true })
  this.origin = M
  this.line = new Segment(M, N)
  this.tab = new PointOnSegment(this.line, { draggable: true, style: '', length: length * (Math.max(Math.min(value, max), min) - min) / (max - min) }) // on s'assure que la valeur est comprise entre min et max.
  this.display = new DisplayMeasure(this.origin.x + this.length + 0.5, this.tab.y, this.algebraic, { precision: 2 })
  this.tab.addChild(this.display)
  this.tab.addChild(this)
  this.tab.addChild(this.algebraic)
  this.tab.style = 'x'
}

update () {
  this.algebraic.value = this.min + (this.tab.x - this.origin.x) * (this.max - this.min) / this.length
  this.notifyAllChilds()
}
}
