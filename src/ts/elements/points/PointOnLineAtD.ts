import { distance } from '../../calculus/random'
import { Point, PointOptions } from './Point'
import { PointByHomothetie } from './PointByHomothetie'
import { Segment } from '../lines/Segment'
import { homothetieCoord } from '../../calculus/transformation'
/**
 * Place un point sur un Line (Segment) à une distance D fixe du point Line.A
 */
export class PointOnLineAtD extends Point {
  line: Segment
  length: number // valeur signée (mesure algébrique de A à M)
  d: number

  constructor(L: Segment, d: number, { label, style = 'x', size = 0.15, thickness = 3, color = 'Gray', draggable = false, temp = false }: { length?: number, k?: number } & PointOptions = {}) {
    const length = distance(L.A, L.B)
    const M = new PointByHomothetie(L.B, L.A, d / (length === 0 ? 1 : length), { temp: true })
    super(L.parentFigure, M.x, M.y, { style, size, thickness, color, draggable, temp })
    this.x = M.x
    this.y = M.y
    this.line = L
    this.d = d
    if (label !== undefined) this.label = label
    this.line.addDependency(this)
  }

  update() {
    const L = this.line
    const Llength = distance(L.A, L.B)
    const [Mx, My] = homothetieCoord(L.B, L.A, this.d / (Llength === 0 ? 1 : Llength))
    this.moveTo(Mx, My)
  }
}
