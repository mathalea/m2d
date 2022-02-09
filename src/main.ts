import { M2d } from './M2d'

/**
 * Script qui permet de tester M2D 
 */

// On créé un espace de travail avec les réglages par défaut
const m2d = new M2d()

// On créé des points à partir de leur coordonnées



// On insère les objets créé dans l'instance de m2d en modifiant la liste des objets
// Les points doivent être en dernier pour les zones d'effet des clics (à automatiser)


const body = document.querySelector('body')
if (body) body.appendChild(m2d.svgElement)

const A = m2d.point(2,2)
const B = m2d.point(-1,4)
const C = m2d.point(5,1)
const s = m2d.segment(A, B)
const sBC = m2d.segment(B,C)
s.svgElement.setAttribute('stroke', 'blue')
setTimeout(() => { A.moveTo(0, 4) }, 2000);
setTimeout(() => { B.moveTo(0.5,4.5) }, 4000);
setTimeout(() => { C.moveTo(-3,4.5) }, 5000);



console.log(A.x)
//s.moveTranslation(3,1)


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

        
    
