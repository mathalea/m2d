export class Element2D {
    color: string
    thickness: number
    group: Element2D[]
    id: string
    constructor () {
        this.color = 'black'
        this.thickness = 1
        this.group = []
        this.id = ''
    }

    
    svg (pixelsPerCm?: number) {
        const groupSvg = document.createElementNS("http://www.w3.org/2000/svg",'g')
        if (this.id) groupSvg.setAttribute('id', `${this.id}`)
        for (const e of this.group) {
            e.color = this.color
            e.thickness = this.thickness
            groupSvg.appendChild(e.svg(pixelsPerCm))
        }
        return groupSvg
    }

}