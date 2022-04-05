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
const save = { 3: { className: 'Point', arguments: [-5.733333333333333, 3.333333333333333], thickness: 3, color: 'blue' }, 7: { className: 'Point', arguments: [-1.6999999999999993, 3.4333333333333336], thickness: 3, color: 'blue' }, 11: { className: 'Point', arguments: [-4.766666666666667, -0.16666666666666696], thickness: 3, color: 'blue' }, 15: { className: 'Point', arguments: [-0.3000000000000007, -0.13333333333333375], thickness: 3, color: 'blue' }, 19: { className: 'Point', arguments: [1.9000000000000004, 1.7000000000000002], thickness: 3, color: 'blue' }, 23: { className: 'Segment', arguments: [3, 7], thickness: 2, color: 'green', dashed: true, isVisible: true }, 24: { className: 'Line', arguments: [3, 11], thickness: 2, color: 'green', dashed: true, isVisible: true }, 25: { className: 'Ray', arguments: [7, 15], thickness: 2, color: 'green', dashed: true, isVisible: true }, 26: { className: 'Point', arguments: [2.366666666666667, 4.1], thickness: 3, color: 'blue' }, 30: { className: 'Point', arguments: [4.699999999999999, 3.966666666666667], thickness: 3, color: 'blue' }, 34: { className: 'Point', arguments: [4.699999999999999, 2.833333333333333], thickness: 3, color: 'blue' }, 38: { className: 'Polygon', arguments: [19, 26, 30, 34], thickness: 2, color: 'green', dashed: true }, 82: { className: 'Segment', arguments: [19, 26], thickness: 0, color: 'black', dashed: false, isVisible: true }, 83: { className: 'Segment', arguments: [26, 30], thickness: 0, color: 'black', dashed: false, isVisible: true }, 84: { className: 'Segment', arguments: [30, 34], thickness: 0, color: 'black', dashed: false, isVisible: true }, 85: { className: 'Segment', arguments: [34, 19], thickness: 0, color: 'black', dashed: false, isVisible: true }, 86: { className: 'Distance', arguments: [3, 7] }, 87: { className: 'Circle', arguments: [3, 86], thickness: 2, color: 'green', dashed: true, isVisible: true }, 91: { className: 'Const', arguments: [1] }, 92: { className: 'Circle', arguments: [15, 91], thickness: 2, color: 'green', dashed: true, isVisible: true }, 96: { className: 'Distance', arguments: [26, 30] }, 97: { className: 'Circle', arguments: [34, 96], thickness: 2, color: 'green', dashed: true, isVisible: true } }
loadJson(save, figure)
