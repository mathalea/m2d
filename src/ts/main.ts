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
const k = new Cursor(figure, -4, 7, { min: 3, max: 8, step: 1, length: 5, value: 1 })
const angle = new Cursor(figure, -4, 6, { min: -180, max: 180, step: 1, length: 5, value: 0 })

const O = new Point(figure, 0, 0, { label: 'O' })
const A = new Point(figure, 5, 1, { label: 'A' })
const p = new RegularPolygon(O, A, k, { color: 'blue' })
