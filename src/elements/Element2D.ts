/**
 * Classe parente de tous les éléments de géométrie
 */
export class Element2D {
    color: string
    thickness: number
    // Un élément de géométrie peut être composé de plusieurs autres éléments de géométrie (plusieurs segments pour marquer un point ou coder un angle par exemple)
    group: Element2D[]
    id: string
    constructor () {
        this.color = 'black'
        this.thickness = 1
        this.group = []
        this.id = ''
    }

    /**
     * Méthode par défaut qui permet
     */
    svg (pixelsPerCm?: number) {
        const groupSvg = document.createElementNS("http://www.w3.org/2000/svg",'g')
        if (this.id) groupSvg.setAttribute('id', `${this.id}`)
        // O applique les styles du parent puis on créé l'arbre svg    
        for (const e of this.group) {
            e.color = this.color
            e.thickness = this.thickness
            groupSvg.appendChild(e.svg(pixelsPerCm))
        }
        return groupSvg
    }

}