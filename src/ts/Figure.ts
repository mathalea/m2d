/*
 * Created by Angot Rémi and Lhote Jean-Claude on 15/02/2022.
 *
 * MathALEA 2D : Software for animating online dynamic mathematics figures
 * https://coopmaths.fr
 * @Author Angot Rémi and Lhote Jean-Claude (contact@coopmaths.fr)
 * @License: GNU AGPLv3 https://www.gnu.org/licenses/agpl-3.0.html
 */

import { intersectionLCCoord } from './calculus/intersection'
import { distance } from './calculus/random'
import { Circle } from './elements/lines/Circle'
import { Element2D } from './elements/Element2D'
import { PointOptions, Point } from './elements/points/Point'
import { Line, OptionsGraphiques } from './elements/lines/Line'
import { TextByPosition } from './elements/texts/TextByPosition'
import { Segment } from './elements/lines/Segment'
import { PointOnLineAtD } from './elements/points/PointOnLineAtD'
import { PointIntersectionLC } from './elements/points/PointIntersectionLC'
import { moveDrag, startDrag, stopDrag } from './pointerAction/drag'
import { handleAction } from './pointerAction/newPoint'
import { clickNewSegment } from './pointerAction/newPointSegment'

export class Figure {
  width: number
  height: number
  pixelsPerUnit: number
  set: Set<Element2D>
  setSelectedElements: Set<Element2D>
  isDynamic: boolean
  setInDrag: Set<Point | TextByPosition>
  isDraging: boolean
  xMin: number
  xMax: number
  yMin: number
  yMax: number
  svg: SVGElement
  pointerX: number | null
  pointerY: number | null
  pointerAction: 'drag' | 'newPoint' | 'newSegment'
  constructor ({ width = 600, height = 400, pixelsPerUnit = 30, xMin = -10, yMin = -6, isDynamic = true }: { width?: number, height?: number, pixelsPerUnit?: number, xMin?: number, yMin?: number, isDynamic?: boolean } = {}) {
    this.width = width
    this.height = height
    this.pixelsPerUnit = pixelsPerUnit
    this.xMin = xMin
    this.xMax = xMin + width / pixelsPerUnit
    this.yMin = yMin
    this.yMax = yMin + height / pixelsPerUnit
    this.isDynamic = isDynamic
    this.set = new Set()
    this.setSelectedElements = new Set()
    this.pointerAction = 'newSegment'
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
  getPointerCoord (event: PointerEvent) {
    event.preventDefault()
    const rect = this.svg.getBoundingClientRect()
    const pointerX = (event.clientX - rect.x) / this.pixelsPerUnit + this.xMin
    const pointerY = -(event.clientY - rect.y) / this.pixelsPerUnit + this.yMax
    return [pointerX, pointerY]
  }

  listenPointer () {
    // On créé des listenners et on change leur attitude suivant l'action en cours sauvegardée dans this.pointerAction
    this.svg.addEventListener('pointerdown', (event) => {
      const [pointerX, pointerY] = this.getPointerCoord(event)
      if (this.pointerAction === 'newPoint') handleAction(this, pointerX, pointerY)
      else if (this.pointerAction === 'drag') startDrag(this, pointerX, pointerY)
      else if (this.pointerAction === 'newSegment') clickNewSegment(this, pointerX, pointerY)
    })

    this.svg.addEventListener('pointerup', (event) => {
      if (this.pointerAction === 'drag' && this.isDraging) stopDrag(this)
    })

    this.svg.addEventListener('pointermove', (event) => {
      const [pointerX, pointerY] = this.getPointerCoord(event)
      if (this.pointerAction === 'drag') moveDrag(this, pointerX, pointerY)
    })
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

  /**
   * Trace une droite passant par A et B
   * @param A
   * @param B
   * @param option add1 contrôle la distance ajoutée du côté de A et add2 celle du côté de B
   * @returns
   */
  line (A: Point, B: Point, { color = 'black', thickness = 1 } = {}) {
    return new Line(A, B, { lineType: 'Line', color, thickness })
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

  pointIntersectionLC (L: Segment, C: Circle, n: 1 | 2 = 1, options?: PointOptions) {
    return new PointIntersectionLC(L, C, n, options)
  }

  // ToFix : Il faudrait que la méthode crée 2 points et que ces points se cachent ou se montrent en fonction de leur appartenance au segment [AB]
  pointIntersectionSC (L: Segment, C: Circle, options?: PointOptions) {
    const [x] = intersectionLCCoord(L, C, 1)
    const [A, B] = [L.A, L.B]
    if (x !== undefined && distance(A, B) > C.radius) {
      let M: Point
      if (x < Math.max(A.x, B.x) && x > Math.min(A.x, B.x)) {
        M = this.pointIntersectionLC(L, C, 1, options)
      } else {
        M = this.pointIntersectionLC(L, C, 2, options)
      }
      C.addDependency(M)
      L.addDependency(M)
      return M
    }
  }

  pointOnSegmentAtD (L: Segment, d: number) {
    return new PointOnLineAtD(L, d)
  }

  get latex () {
    let latex = '\\begin{tikzpicture}'
    latex += `\n\t\\clip(${this.xMin}, ${this.yMin}) rectangle (${this.xMax}, ${this.yMax});`
    for (const e of this.set) {
      latex += e.latex
    }
    latex += '\n\\end{tikzpicture}'
    // ToFix Il peut y avoir un problème si un nombre est en écriture scientifique
    latex = latex.replace(/\d+\.\d+/g, (number: string) => (Math.round(1000 * parseFloat(number)) / 1000).toString())
    return latex
  }
}
