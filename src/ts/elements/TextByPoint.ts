import { Point } from './Point'
import { Text } from './Text'

export class TextByPoint extends Text {
  A: Point
  private _dx: number
  private _dy: number
  constructor (A: Point, text: string, { dx = -0.3, dy = 0.3 }: {dx?:number, dy?: number} = {}) {
    super(A.parentFigure, A.x + dx, A.y + dy, text)
    this.A = A
    this._dx = dx
    this._dy = dy
    A.addDependency(this)
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