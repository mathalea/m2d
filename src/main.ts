
import { LineParallelByPoint } from './elements/LineParallelByPoint'
import { LinePerpendicularByPoint } from './elements/LinePerpendicularlByPoint'
import { Segment } from './elements/Segment'
import { Figure } from './Figure'

/**
 * Script qui permet de tester M2D
 */

// On créé un espace de travail avec les réglages par défaut
const figure = new Figure()

// On l'ajoute au dom
const body = document.querySelector('body')
if (body) body.appendChild(figure.svg)
figure.svg.style.margin = 'auto'
figure.svg.style.display = 'block'
figure.svg.style.border = 'solid'
figure.svg.style.backgroundColor = 'lightcyan'

// On créé des points à partir de leur coordonnées

const A = figure.point(0, 0)
const B = figure.point(4, 1)
const dAB = new Segment(A, B)
const C = figure.point(0, 3)

const L = new LinePerpendicularByPoint(dAB, C)
// const L = new LineByPointVector(C, dAB.directeur)
// L.vector.y = -3
