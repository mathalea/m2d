/*
 * Created by Angot Rémi and Lhote Jean-Claude on 15/02/2022.
 *
 * MathALEA 2D : Software for animating online dynamic mathematics figures
 * https://coopmaths.fr
 * @Author Angot Rémi and Lhote Jean-Claude (contact@coopmaths.fr)
 * @License: GNU AGPLv3 https://www.gnu.org/licenses/agpl-3.0.html
 */

// Initialisation

import { Segment } from './elements/lines/Segment'
import { Angle } from './elements/measures/Angle'
import { DisplayMeasure } from './elements/texts/DisplayMeasure'
import { Figure } from './Figure'
import { addButtons } from './gui/addButtons'

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

const A = figure.point(0, 0, { label: 'A', labelDx: 5, labelDy: -2 })
const B = figure.point(3, 0)
const C = figure.point(2, 5)
const sAB = new Segment(A, B)
sAB.color = 'orange'
console.log(A.label)
const angle = new Angle(A, B, C)
const dis = new DisplayMeasure(-3, 0, angle)
figure.pointerAction = 'setColor'

// Options

// displayEditor(figure)
addButtons(figure)
