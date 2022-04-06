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
const save = { 3: { className: 'Point', arguments: [-3.7, 3.5], thickness: 3, color: 'blue' }, 7: { className: 'Point', arguments: [4.533333333333333, 3.2333333333333334], thickness: 3, color: 'blue' }, 11: { className: 'Const', arguments: [-15] }, 12: { className: 'PointByRotation', arguments: [3, 7, 11], thickness: 3, color: 'black' } }
loadJson(save, figure)
const A = new Point(figure, 0, 0, { label: 'A' })
const B = new Point(figure, 5, 0, { label: 'B' })
const V = new VectorByPoints(A, B)
const C = new PointByTranslationVector(B, V, { label: 'C' })
