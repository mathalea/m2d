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
const save = {"1":{"className":"Const","arguments":[-9]},"2":{"className":"Const","arguments":[6.5]},"3":{"className":"Point","arguments":[-7.166666666666666,4.133333333333333],"thickness":3,"color":"blue"},"4":{"className":"Const","arguments":[-7.166666666666666]},"5":{"className":"Const","arguments":[4.133333333333333]},"7":{"className":"Point","arguments":[-4.233333333333333,4.2],"thickness":3,"color":"blue"},"8":{"className":"Const","arguments":[-4.233333333333333]},"9":{"className":"Const","arguments":[4.2]},"11":{"className":"Point","arguments":[-7.033333333333333,1.3666666666666663],"thickness":3,"color":"blue"},"12":{"className":"Const","arguments":[-7.033333333333333]},"13":{"className":"Const","arguments":[1.3666666666666663]},"15":{"className":"Point","arguments":[-2.033333333333333,0.5],"thickness":3,"color":"blue"},"16":{"className":"Const","arguments":[-2.033333333333333]},"17":{"className":"Const","arguments":[0.5]},"19":{"className":"Const","arguments":[1]},"20":{"className":"Circle","arguments":[11,19],"thickness":1,"color":"black"},"21":{"className":"Point","arguments":[100,100],"thickness":3,"color":"blue"},"22":{"className":"Const","arguments":[100]},"23":{"className":"Const","arguments":[100]},"24":{"className":"Distance","arguments":[11,15]},"25":{"className":"Circle","arguments":[11,24],"thickness":1,"color":"black"},"26":{"className":"Point","arguments":[100,100],"thickness":3,"color":"blue"},"27":{"className":"Const","arguments":[100]},"28":{"className":"Const","arguments":[100]},"29":{"className":"Distance","arguments":[3,7]},"30":{"className":"Circle","arguments":[11,29],"thickness":1,"color":"black"},"31":{"className":"Point","arguments":[100,100],"thickness":3,"color":"blue"},"32":{"className":"Const","arguments":[100]},"33":{"className":"Const","arguments":[100]}}
loadJson(save, figure)
