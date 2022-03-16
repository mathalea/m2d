import { Distance } from './../measures/Distance'
import { CalculDynamic } from './../measures/CalculDynamic'
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
import { Point } from '../points/Point'
import { PointOnSegment } from '../points/PointOnSegment'
import { DisplayMeasure } from '../texts/DisplayMeasure'
import { Measure } from '../measures/Measure'

export class Cursor extends Measure {
  tab: Point
  origin: Point
  length: number
line: Segment
min: number
max: number
step: number
calcul: CalculDynamic
display: DisplayMeasure
position: Distance

constructor (svgContainer: Figure, x: number, y: number, { min = 0, max = 1, step = 0.1, length = 2, value = 0 }: {min?: number, max?:number, step?:number, length?:number, value?:number} = {}) {
  super(svgContainer)
  const factor = Math.round(length / step)
  if (!Number.isInteger(length / step)) {
    length = factor * step
  }
  this.length = length
  this.step = step
  this.max = max
  this.min = min
  const M = new Point(svgContainer, x, y, { temp: true })
  const N = new Point(svgContainer, x + length, y, { temp: true })
  this.origin = M
  this.line = new Segment(M, N)
  this.line.thickness = 4
  this.line.color = 'black'
  this.tab = new PointOnSegment(this.line, { draggable: true, style: 'o', color: 'blue', length: length * (Math.max(Math.min(value, max), min) - min) / (max - min) }) // on s'assure que la valeur est comprise entre min et max.
  this.line.g.setAttribute('stroke-linecap', 'round')
  this.position = new Distance(M, this.tab)
  this.calcul = new CalculDynamic((args: Measure[]) => this.min + Math.round((this.max - this.min) * args[0].value / this.length / this.step) * this.step, [this.position])
  this.value = this.calcul.value
  this.display = new DisplayMeasure(this.origin.x + this.length + 0.5, this.tab.y, this, { precision: 2 })
  this.tab.addChild(this.display)
  this.tab.addChild(this)
  this.tab.addChild(this.calcul)
  this.tab.style = 'x'
}

update () {
  this.value = this.calcul.value
  this.notifyAllChilds()
}
}
