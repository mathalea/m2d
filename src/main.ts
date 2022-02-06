import { M2d } from './M2d'
import { Point } from './elements/Point'
import { Segment } from './elements/Segment'
import { Polygone } from './elements/Polygone'

/**
 * Script qui permet de tester M2D 
 */

// On créé un espace de travail avec les réglages par défaut
const m2d = new M2d()

// On créé des points à partir de leur coordonnées
const A = new Point(0,0)
const B = new Point(3, 0)
const C = new Point(3, 3)
const D = new Point(0, 3)

// On peut les créer par translation, rotation, similitude ou homothétie
const E = A.homothetie(B, -4)

// On créé des segments
const s = new Segment(A, B)
const s2 = new Segment(A, C)

// On change l'épaisseur et la couleur
s2.thickness = 3
s2.color = 'blue'
const s3 = new Segment(A,D)
const s4 = new Segment(E,D)
const p = new Polygone(A,B,C,D)

// On insère les objets créé dans l'instance de m2d en modifiant la liste des objets
// Les points doivent être en dernier pour les zones d'effet des clics (à automatiser)
m2d.list = [s, s2, s3, p, s4, A, B, C]


console.log(m2d.svg, m2d.list)
const body = document.querySelector('body')
if (body) body.appendChild(m2d.svg)

// Remplacer la figure
// s4.thickness = 5
// document.querySelector('#m2d')?.parentNode?.replaceChild(m2d.svg, document.querySelector('#m2d'))


// Drag and drop en développement
    // let point: Element
    // const query = document.querySelector('#m2d6')
    // const svg = document.querySelector('svg')
    // if ( query !== null) {
    //     point = query
    //     point.addEventListener('mousedown', startDrag)
    //     svg.addEventListener('mousemove', drag)
    //     svg.addEventListener('mouseup', endDrag)
    //     svg.addEventListener('mouseleave', endDrag)
    //     point.addEventListener('touchstart', startDrag)
    //     svg.addEventListener('touchmove', drag)
    //     svg.addEventListener('touchend', endDrag)
    //     svg.addEventListener('touchleave', endDrag)
    //     svg.addEventListener('touchcancel', endDrag)

    //     let Ox: number
    //     let Oy: number
    //     let selectedElement = false

    //     function startDrag (this: Element) {
    //         selectedElement = true
    //         const circle = this.querySelector('circle')
    //         if (circle) {
    //             Ox = circle.cx.baseVal.value
    //             Oy = circle.cy.baseVal.value
    //             console.log(Ox, Oy)
    //         }
    
    
    
    //     }
    //     function drag (evt) {
    //         if (selectedElement) {
    //             evt.preventDefault()
    //             console.log(getMousePosition(evt))
    //             // selectedElement.setAttributeNS(null, "x", dragX);
    //             // selectedElement.setAttributeNS(null, "y", dragY);
    //         }
    
    //     }
    //     function endDrag () {
    //         selectedElement = false
    //     }

    //     function getMousePosition(evt) {
    //         const p = svg.createSVGPoint()
    //         p.x = evt.clientX
    //         p.y = evt.clientY
    //         const ctm = svg.getScreenCTM().inverse()
    //         const result =  p.matrixTransform(ctm)
    //         return result
    //       }
    // } 

        
    
