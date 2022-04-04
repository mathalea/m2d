import { VectorByPoints } from './elements/others/VectorByPoints'
import { Vector } from './elements/others/Vector'
import { PointByTranslation } from './elements/points/PointByTranslation'
import { Figure } from './Figure'
import { PointByRotation } from './elements/points/PointByRotation'
import { Point } from './elements/points/Point'
import { Segment } from './elements/lines/Segment'
import { Const } from './elements/measures/Const'
import { Arc } from './elements/lines/Arc'
import { Circle } from './elements/lines/Circle'
import { testAll } from './tests'
import { Cursor } from './elements/measures/Cursor'
import { Line } from './elements/lines/Line'
import { Polygon } from './elements/lines/Polygon'
import { RegularPolygon } from './elements/lines/RegularPolygon'
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
const save = { 3: { className: 'Point', arguments: [-6.133333333333333, 1.166666666666667], thickness: 3, color: 'blue' }, 7: { className: 'Point', arguments: [-1.9000000000000004, 1.4333333333333336], thickness: 3, color: 'blue' }, 11: { className: 'Point', arguments: [-0.5999999999999996, -0.6999999999999993], thickness: 3, color: 'blue' }, 15: { className: 'Distance', arguments: [3, 7] }, 16: { className: 'Circle', arguments: [3, 15], thickness: 1, color: 'black' }, 20: { className: 'Const', arguments: [1] }, 21: { className: 'Circle', arguments: [11, 20], thickness: 1, color: 'black' }, 25: { className: 'Distance', arguments: [3, 7] }, 26: { className: 'Circle', arguments: [11, 25], thickness: 1, color: 'black' } }
loadJson(save, figure)
