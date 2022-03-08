/*
 * Created by Angot Rémi and Lhote Jean-Claude on 15/02/2022.
 *
 * MathALEA 2D : Software for animating online dynamic mathematics figures
 * https://coopmaths.fr
 * @Author Angot Rémi and Lhote Jean-Claude (contact@coopmaths.fr)
 * @License: GNU AGPLv3 https://www.gnu.org/licenses/agpl-3.0.html
 */

import { Coords } from '../elements/Element2D'
import { Point } from '../elements/points/Point'

export function distance (A: Point | Coords, B: Point | Coords): number {
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
export function randint (min: number, max: number, listeAEviter: number[] | number = []) {
  // Source : https://gist.github.com/pc035860/6546661
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
  return min + rand
}
