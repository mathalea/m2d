import { Circle } from './elements/Circle'
import { Element2D } from './elements/Element2D'
import { PointOptions, Point } from './elements/Point'
import { Polygon } from './elements/Polygon'
import { OptionsGraphiques, Segment } from './elements/Segment'

export class Figure {
  width: number
  height: number
  pixelsPerUnit: number
  list: Element2D[]
  isDynamic: boolean
  setInDrag: Set<Point>
  isDraging: boolean
  xMin: number
  xMax: number
  yMin: number
  yMax: number
  svg: SVGElement
  pointerX: number | null
  pointerY: number | null
  constructor ({ width = 600, height = 400, pixelsPerUnit = 30, xMin = -10, yMin = -6, isDynamic = true }: { width?: number, height?: number, pixelsPerUnit?: number, xMin?: number, yMin?: number, isDynamic?: boolean } = {}) {
    this.width = width
    this.height = height
    this.pixelsPerUnit = pixelsPerUnit
    this.xMin = xMin
    this.xMax = xMin + width / pixelsPerUnit
    this.yMin = yMin
    this.yMax = yMin + height / pixelsPerUnit
    this.isDynamic = isDynamic
    this.list = []
    this.setInDrag = new Set()
    this.isDraging = false

    this.pointerX = null
    this.pointerY = null

    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    this.svg.style.width = `${this.width}px`
    this.svg.style.height = `${this.height}px`
    this.svg.setAttribute('viewBox', `${this.xToSx(this.xMin)} ${this.yToSy(this.yMax)} ${this.width} ${this.height}`)
    // Pour éviter le scroll quand on manipule la figure sur un écran tactile
    this.svg.style.touchAction = 'none'

    if (this.isDynamic) this.listenPointer()
  }

  /**
     * abscisse de nos coordonnées => abscisse du SVG
     * @param x number
     * @returns number
     */
  xToSx (x: number) {
    return x * this.pixelsPerUnit
  }

  /**
     * ordonnée de nos coordonnées => ordonnée du SVG
     * @param y number
     * @returns number
     */
  yToSy (y: number) {
    return -y * this.pixelsPerUnit
  }

  /**
     * abscisse du SVG => abscisse de nos coordonnées
     * @param x number
     * @returns number
     */
  sxTox (x: number) {
    return x / this.pixelsPerUnit
  }

  /**
     * ordonnée du SVG => ordonnée de nos coordonnées
     * @param y number
     * @returns number
     */
  syToy (y: number) {
    return -y * this.pixelsPerUnit
  }

  /**
     * Récupère les coordonnées du pointeur dans le repère de la figure
     * @param event
     * @returns
     */
  private getPointerCoord (event: PointerEvent) {
    const rect = this.svg.getBoundingClientRect()
    const pointerX = (event.clientX - rect.x) / this.pixelsPerUnit + this.xMin
    const pointerY = -(event.clientY - rect.y) / this.pixelsPerUnit + this.yMax
    return [pointerX, pointerY]
  }

  /**
     *
     */
  private listenPointer () {
    this.svg.addEventListener('pointermove', (event) => {
      if (!this.isDraging) return
      const [pointerX, pointerY] = this.getPointerCoord(event)
      for (const e of this.setInDrag) {
        e.notifyMouseMove(pointerX, pointerY)
      }
    })

    const startDrag = (event: PointerEvent) => {
      const [pointerX, pointerY] = this.getPointerCoord(event)
      for (const e of this.list) {
        if (e.dragable && e instanceof Point && e.distancePointer(pointerX, pointerY) < 1) {
          this.setInDrag.add(e)
          this.isDraging = true
        }
      }
    }

    const stopDrag = () => {
      this.isDraging = false
      this.setInDrag.clear()
    }

    this.svg.addEventListener('pointerdown', startDrag)
    this.svg.addEventListener('pointerup', stopDrag)
    // this.svg.addEventListener('pointerout', stopDrag)
  }

  /**
     * Ajoute un segment au SVG
     * @param A
     * @param B
     * @param options
     * @returns
     */
  segment (A: Point, B: Point, options?: OptionsGraphiques) {
    return new Segment(A, B, options)
  }

  circle (O: Point, arg2: number | Point, options?: OptionsGraphiques) {
    return new Circle(O, arg2, options)
  }

  polygon (listPoints: Point[]) {
    // polygon(listPoints: Point[], options: object = {}) {
    return new Polygon(this, listPoints)
    // for (const key in options) {
    //     p[key] = options[key]
    // }
  }

  /**
     * Ajoute un point au SVG
     * @param x
     * @param y
     * @param options
     * @returns
     */
  point (x: number, y: number, options?: PointOptions) {
    return new Point(this, x, y, options)
  }

  static translation (A: Point, x: number, y: number) {
    return A.translation(x, y)
  }

  set tex (txt: string) {
  }

  get tex () {
    let tex = '\\begin{tikzpicture}'
    for (const e of this.list) {
      tex += e.tex
    }
    tex += '\n\\end{tikzpicture}'
    return tex
  }
}
