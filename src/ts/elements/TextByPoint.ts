import { Point } from './Point'
import { TextByPosition } from './Text'

export class TextByPoint extends TextByPosition {
  A: Point
  private _dx: number
  private _dy: number
  constructor (A: Point, text: string, { dx = 0, dy = 0 }: {dx?:number, dy?: number} = {}) {
    super(A.parentFigure, A.x + dx, A.y + dy, text)
    this.A = A
    this._dx = dx
    this._dy = dy
    A.addDependency(this)
  }

  /**
   * Quand le pointeur se déplace en mode drag, le point va aussi se déplacer
   * @param x coordonnées dans notre repère
   * @param y
   */
  notifyPointerMove (x: number, y: number) {
    this.x = x
    this.y = y
    this._dx = this.x - this.A.x
    this._dy = this.y - this.A.y
  }

  update (): void {
    this.x = this.A.x + this._dx
    this.y = this.A.y + this._dy
  }

  get dx () {
    return this._dx
  }

  set dx (dx) {
    this._dx = dx
    this.update()
  }

  get dy () {
    return this._dy
  }

  set dy (dy) {
    this._dy = dy
    this.update()
  }
}
