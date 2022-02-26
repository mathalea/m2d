
import { Figure } from './Figure'
import { Ray } from './elements/lines/Ray'
import { Bissectrice } from './elements/lines/Bissectrice'
import { Angle } from './elements/measures/Angle'
import { DisplayMeasure } from './elements/texts/DisplayMeasure'
import { CalculDynamic } from './elements/measures/CalculDynamic'
import { PointByRotation } from './elements/points/PointByRotation'
import { Vector } from './elements/others/Vector'
import { PointByTranslationVector } from './elements/points/PointByTranslationVector'
import { Cursor } from './elements/others/Cursor'
import { VectorByPoints } from './elements/others/VectorByPoints'
import { PointByHomothetie } from './elements/points/PointByHomothetie'
import { Polygon } from './elements/lines/Polygon'
import { Segment } from './elements/lines/Segment'
import { LinePerpendicularByPoint } from './elements/lines/LinePerpendicularlByPoint'

/**
 * Script qui permet de tester M2D
 */

// On créé un espace de travail avec les réglages par défaut
const figure = new Figure()

// On l'ajoute au dom
const body = document.querySelector('body')
const btn = document.createElement('button')
btn.innerHTML = 'Obtenir LaTeX'
const texteLatex = document.createElement('pre')
if (body) {
  body.appendChild(figure.svg)
  body.appendChild(btn)
  body.appendChild(texteLatex)
}

btn.addEventListener('click', () => {
  texteLatex.innerHTML = figure.latex
})

figure.svg.style.margin = 'auto'
figure.svg.style.display = 'block'
figure.svg.style.border = 'solid'


// On créé des points à partir de leur coordonnées

const A = figure.point(0, 2, { label: 'A' })
const B = figure.point(4, -2, { label: 'B' })
const C = figure.point(7, 3, { label: 'C' })
const D = figure.point(-1, 2, { label: 'D' })
const sAB = new Segment(A, B)
const p = new LinePerpendicularByPoint(sAB, C)
