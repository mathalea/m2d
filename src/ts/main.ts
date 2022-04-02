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

const figure = new Figure()
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
const save = [{ className: 'Point', arguments: [-5.566666666666666, 2.466666666666667], thickness: 3, color: 'blue' }, { className: 'Point', arguments: [0.2333333333333325, 2.9000000000000004], thickness: 3, color: 'blue' }, { className: 'Point', arguments: [8.766666666666666, 1.1333333333333337], thickness: 3, color: 'blue' }, { className: 'Point', arguments: [14.5, 0.5666666666666664], thickness: 3, color: 'blue' }, { className: 'Segment', arguments: [1, 3], color: 'black', thickness: 1, dashed: false }, { className: 'Segment', arguments: [5, 7], color: 'black', thickness: 1, dashed: false }]
loadJson(save, figure)
