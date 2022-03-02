/*
 * Created by Angot Rémi and Lhote Jean-Claude on 15/02/2022.
 *
 * MathALEA 2D : Software for animating online dynamic mathematics figures
 * https://coopmaths.fr
 * @Author Angot Rémi and Lhote Jean-Claude (contact@coopmaths.fr)
 * @License: GNU AGPLv3 https://www.gnu.org/licenses/agpl-3.0.html
 */

// Gestion de l'éditeur de code
import CodeMirror from 'codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/monokai.css'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/mode/xml/xml.js'
import 'codemirror/mode/htmlmixed/htmlmixed.js'
import 'codemirror/mode/stex/stex.js'
import 'codemirror/addon/hint/javascript-hint.js'
import 'codemirror/addon/hint/show-hint.js'
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/addon/edit/closebrackets.js'
//

import { Figure } from './Figure'
import { Segment } from './elements/lines/Segment'
import { Mediatrice } from './elements/lines/Mediatrice'
import { PointIntersectionLL } from './elements/points/PointIntersectionLL'
import { Polygon } from './elements/lines/Polygon'
import { Bissectrice } from './elements/lines/Bissectrice'
import { Ray } from './elements/lines/Ray'
import { LineParallelByPoint } from './elements/lines/LineParallelByPoint'
import { Arc } from './elements/lines/Arc'
import { Grid } from './elements/others/Grid'
import { Point } from './elements/points/Point'
import Sval from 'sval'
import { Line } from './elements/lines/Line'
import { initEditor } from './gui/initEditor'
/**
 * Script qui permet de tester M2D
 */

// On créé un espace de travail avec les réglages par défaut
const figure = new Figure()

// On l'ajoute au dom
const body = document.querySelector('body')
const btnLatex = document.createElement('button')
btnLatex.innerHTML = 'Obtenir LaTeX'
const btnDrag = document.createElement('button')
btnDrag.innerHTML = 'Drag'
const btnNewPoint = document.createElement('button')
btnNewPoint.innerHTML = 'Nouveau point'
const btnNewSegment = document.createElement('button')
btnNewSegment.innerHTML = 'Segment'
const btnZoomPlus = document.createElement('button')
btnZoomPlus.innerHTML = '+'
const btnZoomMinus = document.createElement('button')
btnZoomMinus.innerHTML = '-'
const btnRed = document.createElement('button')
btnRed.style.backgroundColor = 'red'
btnRed.style.width = '20px'
btnRed.style.height = '20px'
const btnGreen = document.createElement('button')
btnGreen.style.backgroundColor = 'green'
btnGreen.style.width = '20px'
btnGreen.style.height = '20px'
const texteLatex = document.createElement('pre')
if (body) {
  body.appendChild(figure.svg)
  body.appendChild(btnLatex)
  body.appendChild(btnDrag)
  body.appendChild(btnNewPoint)
  body.appendChild(btnNewSegment)
  body.appendChild(texteLatex)
  body.appendChild(btnRed)
  body.appendChild(btnGreen)
  body.appendChild(btnZoomMinus)
  body.appendChild(btnZoomPlus)
}

btnLatex.addEventListener('click', () => {
  texteLatex.innerHTML = figure.latex
})
btnDrag.addEventListener('click', () => {
  figure.pointerAction = 'drag'
})
btnNewPoint.addEventListener('click', () => {
  figure.pointerAction = 'newPoint'
})
btnNewSegment.addEventListener('click', () => {
  figure.pointerAction = 'newSegment'
})
btnZoomPlus.addEventListener('click', () => {
  figure.pixelsPerUnit += 10
  for (const e of figure.set) {
    e.update()
  }
})
btnRed.addEventListener('click', () => {
  figure.pointerAction = 'setColor'
  figure.pointerSetOptions.color = 'red'
})
btnGreen.addEventListener('click', () => {
  figure.pointerAction = 'setColor'
  figure.pointerSetOptions.color = 'green'
})

figure.svg.style.margin = 'auto'
figure.svg.style.display = 'block'
figure.svg.style.border = 'solid'

// On créé des points à partir de leur coordonnées

// const A = figure.point(-4, 2, { label: 'A' })
// const B = figure.point(3, -2, { label: 'O' })
// const arc = new Arc(B, A, 30)
// arc.color = 'red'
// arc.thickness = 3
// const C = figure.point(2, 5, { label: 'C' })
// const sAB = new Segment(A, B)
// sAB.style = '|-|'
// const mAB = new Mediatrice(sAB)
// const p = new Polygon(A, B, C)
// const d = new Bissectrice(C, B, A)
// const D = figure.point(0, 0, { label: 'D' })
// const r = new Ray(D, B)
// const e = new LineParallelByPoint(mAB, A)
// const E = new PointIntersectionLL(sAB, mAB)
// p.color = 'blue'
// p.thickness = 3
// mAB.dashed = true
// p.fill = 'yellow'
// p.fillOpacity = 0.1

// // // const v = new VectorNormal(L)

// // // const A = new Point(figure, 0, 0)
// // // const v = new Vector(figure, 3, 1)
// // // const L = new LineByPointVector(A, v)
// // // L.vector.y = -5

const divEditeur = document.createElement('div')
const btnRunCode = document.createElement('button')
btnRunCode.innerHTML = 'Valider'
body.appendChild(divEditeur)
body.appendChild(btnRunCode)

const myCodeMirror = CodeMirror(divEditeur, {
  value: '',
  mode: 'javascript',
  lineNumbers: true,
  autofocus: true,
  theme: 'monokai',
  autoCloseBrackets: true,
  showHint: true,
  extraKeys: { 'Ctrl-Space': 'autocomplete' },
  matchBrackets: true,
  lineWrapping: true
})

// Autocomplétion
myCodeMirror.on('inputRead', function onChange (editor, input) {
  if (input.text[0] === ';' || input.text[0] === ' ') {
    return
  }
  CodeMirror.commands.autocomplete(editor, null, { completeSingle: false })
})

btnRunCode.addEventListener('click', () => {
  const interpreter = initEditor(figure)
  const code = myCodeMirror.getValue()
  interpreter.run(code)
})
