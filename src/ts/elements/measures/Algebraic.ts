/*
 * Created by Angot Rémi and Lhote Jean-Claude on 15/02/2022.
 *
 * MathALEA 2D : Software for animating online dynamic mathematics figures
 * https://coopmaths.fr
 * @Author Angot Rémi and Lhote Jean-Claude (contact@coopmaths.fr)
 * @License: GNU AGPLv3 https://www.gnu.org/licenses/agpl-3.0.html
 */

import { Figure } from '../../Figure'
import { Measure } from './Measure'
/**
 * Crée une mesure avec une valeur initiale qui peut varier et faire varier ses dépendances.
 * Elle peut être utilisée comme une variable dans les transformations par exemple. (on pourra lui trouver d'autres utilités par la suite)
 * les points construit par homothetie (pour l'instant et plus tard par rotation et similitude ) peuvent dépendre d'une telle mesure variable
 * L'objet cursor est pour l'instant le seul à disposer d'une propriété algebraic qui est une instance de cette classe.
 * Exemple :
 * const monCurseur = new Cursor(0,10, {length: 3, min: -2, max: 2, value: 0, step: 0.1}) // 0 sera la valeur initiale de monCurseur.algebraic
 * const B = new PointByHomothetie(A,O,monCurseur.algebraic) // B est une dépendance de monCurseur.algebraic
 * Si on fait bouger le curseur de monCurseur, c'est le rapport de l'homothétie qui change et donc le point B est mis à jour avec ce nouveau rapport
 * On peut imaginer un curseur allant de 0 à 360 et une rotation dont l'angle est l'attribut algebraic de ce curseur.
 */
export class Algebraic extends Measure {
  constructor (figure: Figure, value: number) {
    super(figure)
    this.value = value
  }

  update () {
    this.notifyAllChilds()
  }
}
