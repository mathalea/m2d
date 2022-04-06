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
const save = { 3: { className: 'Point', arguments: [-4.733333333333333, 3.2333333333333334], thickness: 3, color: 'blue' }, 7: { className: 'Point', arguments: [-4.8, 0.13333333333333286], thickness: 3, color: 'blue' }, 11: { className: 'Point', arguments: [4.633333333333333, 1.4666666666666668], thickness: 3, color: 'blue' }, 15: { className: 'Const', arguments: [-0.8] }, 16: { className: 'PointByHomothetie', arguments: [3, 11, 15], thickness: 3, color: 'black' }, 20: { className: 'Const', arguments: [-0.8] }, 21: { className: 'PointByHomothetie', arguments: [7, 11, 20], thickness: 3, color: 'black' }, 25: { className: 'Const', arguments: [-0.8] }, 26: { className: 'PointByHomothetie', arguments: [3, 11, 25], thickness: 3, color: 'black' }, 30: { className: 'Const', arguments: [-0.8] }, 31: { className: 'PointByHomothetie', arguments: [16, 11, 30], thickness: 3, color: 'black' }, 35: { className: 'Segment', arguments: [3, 16], thickness: 2, color: 'purple', dashed: true, isVisible: true }, 36: { className: 'Segment', arguments: [7, 21], thickness: 2, color: 'purple', dashed: true, isVisible: true } }
loadJson(save, figure)
