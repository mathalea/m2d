import { Element2D } from './elements/Element2D'
import { OptionsPoint, Point } from './elements/Point'
import { Polygon } from './elements/Polygon'
import { OptionsSegment, Segment } from './elements/Segment'

export class M2d {
    width: number
    height: number
    id: string
    pixelsPerUnit: number
    list: Element2D[]
    isDynamic: boolean
    setInDrag: Set<Point>
    isDraging: boolean
    xMin: number
    xMax: number
    yMin: number
    yMax: number
    svgElement: SVGElement
    pointerX: number | null
    pointerY: number | null
    constructor ({ width = 600, height = 400, id = 'm2d', pixelsPerUnit = 30, xMin = -10, yMin = -6, isDynamic = true }: { width?: number, height?: number, id?: string, pixelsPerUnit?: number, xMin?: number, yMin?: number, isDynamic?: boolean } = {}) {
      this.width = width
      this.height = height
      this.id = id
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

      this.svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      this.svgElement.style.width = `${this.width}px`
      this.svgElement.style.height = `${this.height}px`
      this.svgElement.id = this.id
      this.svgElement.setAttribute('viewBox', `${this.xToxSvg(this.xMin)} ${this.yToySvg(this.yMax)} ${this.width} ${this.height}`)
      this.svgElement.style.backgroundColor = 'lightGray'
      this.svgElement.style.touchAction = 'none'

      if (this.isDynamic) this.getPointerTouch()
    }

    /**
     * abscisse de nos coordonnées => abscisse du SVG
     * @param x number
     * @returns number
     */
    xToxSvg (x: number) {
      return x * this.pixelsPerUnit
    }

    /**
     * ordonnée de nos coordonnées => ordonnée du SVG
     * @param y number
     * @returns number
     */
    yToySvg (y: number) {
      return -y * this.pixelsPerUnit
    }

    /**
     * abscisse du SVG => abscisse de nos coordonnées
     * @param x number
     * @returns number
     */
    xSvgTox (x: number) {
      return x / this.pixelsPerUnit
    }

    /**
     * ordonnée du SVG => ordonnée de nos coordonnées
     * @param y number
     * @returns number
     */
    ySvgToy (y: number) {
      return -y * this.pixelsPerUnit
    }

    /**
     * À chaque déplacement du pointeur sur le container, this.pointerX et this.PointerY sont mis à jour
     * Si un élément est dans listInDrag alors on lui notifie de bouger
     */
    private getMouseCoord () {
      const pointerMove = (event: PointerEvent) => {
        event.preventDefault()
        this.setMouseCord(event)
        this.notifySetMove(this.setInDrag)
      }
      this.svgElement.onpointermove = pointerMove
    }

    /**
     * Gère le toucher du dessin
     */
    private getPointerTouch () {
      this.getMouseCoord()
      /**
         * Au clic sur le SVG, on cherche les points à proximité pour leur initier le drag
         * @param event
         */
      const startDrag = (event: PointerEvent) => {
        event.preventDefault()
        this.setMouseCord(event)
        for (const e of this.list) {
          if (e instanceof Point && e.distancePointer < 1) {
            this.setInDrag.add(e)
            this.isDraging = true
          }
        }
      }

      /**
         * Signifie à tous les points que le drag est terminé
         */
      const endDrag = () => {
        this.isDraging = false
        this.setInDrag.clear()
      }
      this.svgElement.onpointerdown = startDrag
      this.svgElement.onpointercancel = endDrag
      this.svgElement.onpointerleave = endDrag
      this.svgElement.onpointerup = endDrag
      this.svgElement.onpointerleave = endDrag
    }

    /**
     * Stocke les coordonnées du pointeur dans this.pointerX et this.pointerY
     * @param event
     */
    private setMouseCord = (event: PointerEvent) => {
      event.preventDefault()
      const rect = this.svgElement.getBoundingClientRect()
      this.pointerX = (event.clientX - rect.x) / this.pixelsPerUnit + this.xMin
      this.pointerY = -(event.clientY - rect.y) / this.pixelsPerUnit + this.yMax
    }

    /**
     * Notifie tous les éléments du set qu'il faut se mettre en mouvement
     * @param set
     */
    private notifySetMove (set: Set<Point>) {
      if (this.pointerX !== null && this.pointerY !== null) {
        for (const e of set) {
          e.notifyMouseMove(this.pointerX, this.pointerY)
        }
      }
    }

    /**
     * Ajoute un segment au SVG
     * @param A
     * @param B
     * @param options
     * @returns
     */
    segment (A: Point, B: Point, options: OptionsSegment) {
      const s = new Segment(A, B, this, options)
      const segmentElementSvg = s.svgElement
      this.svgElement.appendChild(segmentElementSvg)
      return s
    }

    polygon (listPoints: Point[]) {
    // polygon(listPoints: Point[], options: object = {}) {
      const p = new Polygon(this, listPoints)
      // for (const key in options) {
      //     p[key] = options[key]
      // }
      const polygonElementSvg = p.svgElement
      this.svgElement.appendChild(polygonElementSvg)
    }

    /**
     * Ajoute un point au SVG
     * @param x
     * @param y
     * @param options
     * @returns
     */
    point (x: number, y: number, options?: OptionsPoint) {
      const A = new Point(this, x, y, options)
      const pointElementSvg = A.svgElement
      this.svgElement.appendChild(pointElementSvg)
      return A
    }
}
