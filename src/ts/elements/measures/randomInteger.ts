import { Figure } from '../../Figure'
import { Measure } from './Measure'
/**
 * sa propriété value retourne un nombre aléatoire entier quand elle est lue.
 * Ce nombre est compris entre min et max en évitant les nombres exclus (listeAEviter)
 */
export class RandomInteger extends Measure {
    min: number
    max: number
    listeAEviter: number[]
    range: number
    constructor (figure: Figure, min: number, max: number, listeAEviter: number[] | number = []) {
      if (!Number.isInteger(min)) min = Math.floor(min)
      if (!Number.isInteger(max)) max = Math.ceil(max)
      if (min > max) {
        const minTemp = min
        min = max
        max = minTemp
      }
      const range = max - min
      let rand = Math.floor(Math.random() * (range + 1))
      if (typeof listeAEviter === 'number') {
        listeAEviter = [listeAEviter]
      }
      if (listeAEviter.length > 0) {
        while (listeAEviter.indexOf(min + rand) !== -1) {
          rand = Math.floor(Math.random() * (range + 1))
        }
      }
      super(figure)
      this.listeAEviter = listeAEviter
      this.range = range
      this.min = min
      this.max = max
      this.value = min + rand
    }

    update () {
      try {
        let rand = Math.floor(Math.random() * (this.range + 1))
        if (this.listeAEviter.length > 0) {
          while (this.listeAEviter.indexOf(this.min + rand) !== -1) {
            rand = Math.floor(Math.random() * (this.range + 1))
          }
        }
        this.value = this.min + rand
      } catch (error) {
        console.log('Erreur dans RandomInteger.update()', error)
        this.exist = false
      }
      this.notifyAllChilds()
    }
}
