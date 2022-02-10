import { Element2D } from './elements/Element2D'
import { OptionsPoint, Point } from './elements/Point'
import { Polygon } from './elements/Polygon'
import { OptionsSegment, Segment } from './elements/Segment'

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
    constructor({ width = 600, height = 400, pixelsPerUnit = 30, xMin = -10, yMin = -6, isDynamic = true }: { width?: number, height?: number, pixelsPerUnit?: number, xMin?: number, yMin?: number, isDynamic?: boolean } = {}) {
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

        this.svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg')
        this.svg.style.width = `${this.width}px`
        this.svg.style.height = `${this.height}px`
        this.svg.setAttribute('viewBox', `${this.xToSx(this.xMin)} ${this.yToSy(this.yMax)} ${this.width} ${this.height}`)
        this.svg.style.backgroundColor = 'lightGray'
        // Pour éviter le scroll quand on manipule la figure sur un écran tactile
        this.svg.style.touchAction = 'none'

        if (this.isDynamic) this.getPointerTouch()
    }

    /**
     * abscisse de nos coordonnées => abscisse du SVG
     * @param x number
     * @returns number
     */
    xToSx(x: number) {
        return x * this.pixelsPerUnit
    }

    /**
     * ordonnée de nos coordonnées => ordonnée du SVG
     * @param y number
     * @returns number
     */
    yToSy(y: number) {
        return - y * this.pixelsPerUnit
    }

    /**
     * abscisse du SVG => abscisse de nos coordonnées
     * @param x number
     * @returns number
     */
    sxTox(x: number) {
        return x / this.pixelsPerUnit
    }

    /**
     * ordonnée du SVG => ordonnée de nos coordonnées
     * @param y number
     * @returns number
     */
    syToy(y: number) {
        return - y * this.pixelsPerUnit
    }

    /**
     * À chaque déplacement du pointeur sur le container, this.pointerX et this.PointerY sont mis à jour
     * Si un élément est dans listInDrag alors on lui notifie de bouger
     */
    private getMouseCoord() {
        const pointerMove = (event: PointerEvent) => {
            event.preventDefault()
            this.setMouseCord(event)
            this.notifySetMove(this.setInDrag)
        }
        this.svg.onpointermove = pointerMove
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
        this.svg.onpointerdown = startDrag
        this.svg.onpointercancel = endDrag
        this.svg.onpointerleave = endDrag
        this.svg.onpointerup = endDrag
        this.svg.onpointerleave = endDrag

    }

    /**
     * Stocke les coordonnées du pointeur dans this.pointerX et this.pointerY
     * @param event
     */
    private setMouseCord = (event: PointerEvent) => {
        event.preventDefault()
        const rect = this.svg.getBoundingClientRect()
        this.pointerX = (event.clientX - rect.x) / this.pixelsPerUnit + this.xMin
        this.pointerY = - (event.clientY - rect.y) / this.pixelsPerUnit + this.yMax
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
    segment(A: Point, B: Point, options: OptionsSegment) {
        const s = new Segment(A, B, this, options)
        const segmentElementSvg = s.g
        this.svg.appendChild(segmentElementSvg)
        return s
    }

    polygon (listPoints: Point[]) {
    // polygon(listPoints: Point[], options: object = {}) {
        const p = new Polygon(this, listPoints)
        // for (const key in options) {
        //     p[key] = options[key]
        // }
        const polygonElementSvg = p.g
        this.svg.appendChild(polygonElementSvg)
    }

    /**
     * Ajoute un point au SVG
     * @param x
     * @param y
     * @param options
     * @returns
     */
    point(x: number, y: number, options?: OptionsPoint) {
        const A = new Point(this, x, y, options)
        const pointElementSvg = A.g
        this.svg.appendChild(pointElementSvg)
        return A
    }
}
