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
const save = {"3":{"className":"Point","arguments":[-0.8666666666666671,2.7333333333333334],"thickness":3,"color":"blue"},"7":{"className":"Point","arguments":[-4.2,-1.3999999999999995],"thickness":3,"color":"blue"},"11":{"className":"Point","arguments":[4.199999999999999,-1.2999999999999998],"thickness":3,"color":"blue"},"15":{"className":"Polygon","arguments":[3,7,11],"thickness":"2","color":"green","dashed":true},"49":{"className":"Segment","arguments":[3,7],"thickness":0,"color":"black","dashed":false},"50":{"className":"Segment","arguments":[7,11],"thickness":0,"color":"black","dashed":false},"51":{"className":"Segment","arguments":[11,3],"thickness":0,"color":"black","dashed":false}}
loadJson(save, figure)
