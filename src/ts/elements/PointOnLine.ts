import { distance, randint } from '../calculus/random'
import { orthogonalProjectionCoord } from '../calculus/transformation'
import { Point, PointOptions } from './Point'
import { Segment } from './Segment'

export class PointOnLine extends Point {
  line : Segment
  length: number // valeur signée (mesure algébrique de ends[0] à M)
  k: number
  constructor (L: Segment, { k, length, style = 'x', size = 0.15, thickness = 3, color = 'Gray', draggable = true, temp = false }: {length?: number, k?: number} & PointOptions = {}) {
    const Llength = distance(L.ends[0], L.ends[1])
    length = (length === undefined) ? randint(15, 85) * Llength / 100 : length
    k = k || Llength === 0 ? 0.5 : length / Llength // Evitons la division par zéro avec le milieu d'un segment nul.
    const [Mx, My] = [(1 - k) * L.ends[0].x + k * L.ends[1].x, (1 - k) * L.ends[0].y + k * L.ends[1].y]
    super(L.parentFigure, Mx, My, { style, size, thickness, color, draggable, temp })
    this.x = Mx
    this.y = My
    this.line = L
    this.k = k
    this.line.addDependency(this)
  }

  update () {
    const L = this.line
    const k = this.k
    const Llength = distance(L.ends[0], L.ends[1])
    this.length = Llength === 0 ? this.length : k * Llength
    this.moveTo((1 - k) * L.ends[0].x + k * L.ends[1].x, (1 - k) * L.ends[0].y + k * L.ends[1].y)
  }

  moveTo (x: number, y:number) {
    const L = this.line
    const P = new Point(L.parentFigure, x, y, { temp: true })
    const [xM, yM] = orthogonalProjectionCoord(P, L)
    this.k = (L.ends[1].x - L.ends[0].x) === 0 ? (L.ends[1].y - L.ends[0].y) === 0 ? this.k : (yM - L.ends[0].y) / (L.ends[1].y - L.ends[0].y) : (xM - L.ends[0].x) / (L.ends[1].x - L.ends[0].x)
    this.length = this.k * distance(L.ends[0], L.ends[1])
    super.moveTo(xM, yM)
  }

  /**
   * Gère le déplacement du point le long de la droite
   * @param x
   * @param y
   */
  notifyPointerMove (x: number, y: number) {
    if (this.draggable) {
      this.moveTo(x, y)
    }
  }
}
