import { Point } from './elements/Point'

export function distance (A: Point, B: Point):number {
  return Math.sqrt((A.x - B.x) ** 2 + (A.y - B.y) ** 2)
}

/**
* Choisit un nombre au hasard entre min et max sans appartenir à liste\_a\_eviter.
* @param {int} min
* @param {int} max
* @param {liste} liste - Tous les éléments que l'on souhaite supprimer
*
* @example
* // Renvoie 1, 2 ou 3
* randint (1,3)
* @example
* // Renvoie -1 ou 1
* randint(-1,1,[0])
*
* @author Rémi Angot
* @Source https://gist.github.com/pc035860/6546661
*/
export function randint (min, max, listeAEviter = []) {
  // Source : https://gist.github.com/pc035860/6546661
  const range = max - min
  let rand = Math.floor(Math.random() * (range + 1))
  if (Number.isInteger(listeAEviter)) {
    listeAEviter = [listeAEviter]
  }
  if (listeAEviter.length > 0) {
    while (listeAEviter.indexOf(min + rand) !== -1) {
      rand = Math.floor(Math.random() * (range + 1))
    }
  }
  return min + rand
}
