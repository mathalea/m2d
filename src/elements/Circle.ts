import { Element2D } from './Element2D'
import { Point } from './Point'

type Binome = {x:number, y:number}

export class Circle extends Element2D {
    O: Point
    radius: number
    fill: string
    // On définit un point avec ses deux coordonnées
    constructor(O: Point, radius: number) {
        super()
        this.O = O
        this.radius = radius
        this.fill = 'none'
    }
    
    /**
     * Translation définie par un couple de coordonnées ou un objet possédant des paramètres x et y
     * Renvoie un nouveau cercle sans modifier le premier
     */
    translation(arg1: number | Binome, arg2?: number) {
        let xt : number
        let yt : number
        if (typeof arg1  === 'number') {
            xt = arg1
            yt = arg2 || 0
        } else {
            xt = arg1.x
            yt = arg1.y
        }
        const O2 = new Point(this.O.x + xt, this.O.y + yt)
        return new Circle(O2, this.radius)
    }
    
    /**
     * Rotation définie par un centre et un angle en degrés
     * Renvoie un nouveau cercle sans modifier le premier
     */
    rotation(O: Point, angle: number) {
        const x = (O.x + (this.O.x - O.x) * Math.cos((angle * Math.PI) / 180) - (this.O.y - O.y) * Math.sin((angle * Math.PI) / 180))
        const y = (O.y + (this.O.x - O.x) * Math.sin((angle * Math.PI) / 180) + (this.O.y - O.y) * Math.cos((angle * Math.PI) / 180))
        const O2 = new Point(x, y)
        return new Circle(O2, this.radius)
    }

    /**
     * Homothétie définie par un centre et un rapport
     * Renvoie un nouveau point sans modifier le premier
     */

    homothetie(O: Point, k: number) {
        const x = (O.x + k * (this.O.x - O.x))
        const y = (O.y + k * (this.O.y - O.y))
        const O2 = new Point(x, y)
        return new Circle(O2, this.radius * k)
    }

    /**
     * Similitude définie par un centre, un rapport et un angle en degré
     * Renvoie un nouveau point sans modifier le premier
     */
    similitude (O: Point, k: number, angle: number) {
        const angleRadian = angle * Math.PI / 180
        const x = (O.x + k * (Math.cos(angleRadian) * (this.O.x - O.x) - Math.sin(angleRadian) * (this.O.y - O.y)))
        const y = (O.y + k * (Math.cos(angleRadian) * (this.O.y - O.y) + Math.sin(angleRadian) * (this.O.x - O.x))
    )
        const O2 = new Point(x, y)
        return new Circle(O2, this.radius * k)
    }

    svg (pixelsPerCm: number = 30) {
        const xSvg = this.O.x * pixelsPerCm
        const ySvg = - this.O.y * pixelsPerCm
        const circle = document.createElementNS("http://www.w3.org/2000/svg",'circle')
        circle.setAttribute('cx', `${xSvg}`)
        circle.setAttribute('cy', `${ySvg}`)
        circle.setAttribute('r', `${this.radius * pixelsPerCm}`)
        // Si le cercle n'a pas d'épaisseur, on ne met pas stroke
        if (this.thickness) {
            circle.setAttribute('stroke',`${this.color}`)
            circle.setAttribute('stroke-width', `${this.thickness}`)
        }
        circle.setAttribute('fill', `${this.fill}`)
        circle.setAttribute('id', `${this.id}`)
        // Le cercle est la zone d'effet pour les évènements
        // Quand fill est à none, il faut ajouter pointer-events="visible" cf https://www.smashingmagazine.com/2018/05/svg-interaction-pointer-events-property/
        circle.setAttribute('pointer-events', 'visible')
        return circle


    }
}