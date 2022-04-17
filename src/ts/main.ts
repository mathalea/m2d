import { PointByTranslationVector } from './elements/points/PointByTranslationVector'
import { VectorByPoints } from './elements/others/VectorByPoints'
import { Point } from './elements/points/Point'
import { Figure } from './Figure'
import { loadJson } from './load'

/*
 * Created by Angot Rémi and Lhote Jean-Claude on 15/02/2022.
 *
 * MathALEA 2D : Software for animating online dynamic mathematics figures
 * https://coopmaths.fr
 * @Author Angot Rémi and Lhote Jean-Claude (contact@coopmaths.fr)
 * @License: GNU AGPLv3 https://www.gnu.org/licenses/agpl-3.0.html
 */

// Initialisation

const figure = new Figure({ width: 1040, height: 640 })
const body = document.querySelector('body')
const texteLatex = document.createElement('pre')
const btnLatex = document.createElement('button')
btnLatex.innerHTML = 'Obtenir LaTeX'
btnLatex.addEventListener('click', () => {
  texteLatex.innerHTML = figure.latex
})
if (body) {
  body.appendChild(figure.svg)
  body.appendChild(btnLatex)
  body.appendChild(texteLatex)
}

figure.svg.style.margin = 'auto'
figure.svg.style.display = 'block'
figure.svg.style.border = 'solid'

// Ma figure
const save = { 3: { className: 'Point', arguments: [-3.3666666666666663, 9.466666666666665], thickness: 3, color: 'blue' }, 7: { className: 'Point', arguments: [1.1999999999999993, 9.466666666666665], thickness: 3, color: 'blue' }, 11: { className: 'Point', arguments: [-1.9333333333333336, 6.7333333333333325], thickness: 3, color: 'blue' }, 17: { className: 'Vector', arguments: [15, 16] }, 18: { className: 'PointByTranslationVector', arguments: [11, 17], thickness: 3, color: 'black' } }
loadJson(save, figure)
