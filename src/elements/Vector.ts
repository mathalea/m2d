import { Element2D } from "./Element2D"

export class Vector extends Element2D {
    x: number
    y: number

    constructor(x: number, y: number) {
        super()
        this.x = x
        this.y = y
    }

    get norme () {
        return Math.sqrt(this.x**2 + this.y**2).toFixed(6)
    }
}