import { Circle } from './Circle'
import { Element2D } from './Element2D'
import { Segment } from './Segment'

type Binome = {x:number, y:number}

export class Point extends Element2D {
    x: number
    y: number
    pointStyle: 'x'
    size: number
    // On définit un point avec ses deux coordonnées
    constructor(x: number, y: number) {
        super()
        this.x = x
        this.y = y
        this.pointStyle = 'x' // Pour faire une croix par défaut
        this.size = 3 // Pour la taille de la croix
    }
    
    /**
     * Translation définie par un couple de coordonnées ou un objet possédant des paramètres x et y
     * Renvoie un nouveau point sans modifier le premier
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
        return new Point(this.x + xt, this.y + yt)
    }
    
    /**
     * Rotation définie par un centre et un angle en degrés
     * Renvoie un nouveau point sans modifier le premier
     */
    rotation(O: Point, angle: number) {
        const x = (O.x + (this.x - O.x) * Math.cos((angle * Math.PI) / 180) - (this.y - O.y) * Math.sin((angle * Math.PI) / 180))
        const y = (O.y + (this.x - O.x) * Math.sin((angle * Math.PI) / 180) + (this.y - O.y) * Math.cos((angle * Math.PI) / 180))
        return new Point(x, y)
    }

    /**
     * Homothétie définie par un centre et un rapport
     * Renvoie un nouveau point sans modifier le premier
     */

    homothetie(O: Point, k: number) {
        const x = (O.x + k * (this.x - O.x))
        const y = (O.y + k * (this.y - O.y))
        return new Point(x, y)
    }

    /**
     * Similitude définie par un centre, un rapport et un angle en degré
     * Renvoie un nouveau point sans modifier le premier
     */
    similitude (O: Point, k: number, angle: number) {
        const angleRadian = angle * Math.PI / 180
        const x = (O.x + k * (Math.cos(angleRadian) * (this.x - O.x) - Math.sin(angleRadian) * (this.y - O.y)))
        const y = (O.y + k * (Math.cos(angleRadian) * (this.y - O.y) + Math.sin(angleRadian) * (this.x - O.x))
    )
    return new Point(x, y)
    }

    svg (pixelsPerCm: number = 30) {
        this.group = []
        if (this.pointStyle === 'x') {
            const s1 = new Segment(new Point(this.x - this.size / pixelsPerCm, this.y + this.size / pixelsPerCm),
                new Point(this.x + this.size / pixelsPerCm, this.y - this.size / pixelsPerCm))
            const s2 = new Segment(new Point(this.x - this.size / pixelsPerCm, this.y - this.size / pixelsPerCm),
                new Point(this.x + this.size / pixelsPerCm, this.y + this.size / pixelsPerCm))
            s1.thickness = 1
            s2.thickness = 1
            this.group.push(s1, s2)
        }
        const groupSvg = document.createElementNS("http://www.w3.org/2000/svg",'g')
        if (this.id) groupSvg.setAttribute('id', `${this.id}`)
        // Le cercle ne doit pas être stylisés, on n'appelle donc pas super.svg()
        for (const e of this.group) {
            e.color = this.color
            e.thickness = this.thickness
            groupSvg.appendChild(e.svg(pixelsPerCm))
        }
         // On créé un cercle transparent pour la zone d'effet du clic
         const c = new Circle(new Point(this.x, this.y), this.size)
         c.thickness = 0
         groupSvg.appendChild(c.svg(1)) // Le rayon du cercle est défini par this.size en pixels
         groupSvg.classList.add('draggable')
         return groupSvg
    }
}