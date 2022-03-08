import { Point } from '../elements/points/Point'
import { Figure } from '../Figure'

export function addButtons (figure: Figure) {
  const body = document.querySelector('body')
  const btnDrag = document.createElement('button')
  btnDrag.innerHTML = 'Drag'
  const btnNewPoint = document.createElement('button')
  btnNewPoint.innerHTML = 'Nouveau point'
  const btnNewSegment = document.createElement('button')
  btnNewSegment.innerHTML = 'Segment'
  const btnNewPerpendicular = document.createElement('button')
  btnNewPerpendicular.innerHTML = 'Perpendicular'
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
  if (body) {
    body.appendChild(btnDrag)
    body.appendChild(btnNewPoint)
    body.appendChild(btnNewSegment)
    body.appendChild(btnNewPerpendicular)
    body.appendChild(btnRed)
    body.appendChild(btnGreen)
    body.appendChild(btnZoomMinus)
    body.appendChild(btnZoomPlus)
  }

  btnDrag.addEventListener('click', () => {
    figure.pointerAction = 'drag'
    figure.message('')
  })
  btnNewPoint.addEventListener('click', () => {
    figure.pointerAction = 'newPoint'
    figure.message('')
  })
  btnNewSegment.addEventListener('click', () => {
    figure.pointerAction = 'newSegment'
    if ([...figure.set].filter(element => element instanceof Point).length < 2) {
      figure.message('Il faut au moins deux points pour tracer un segment')
    } else figure.message('Cliquer sur les deux extrémités du segment')
  })
  btnNewPerpendicular.addEventListener('click', () => {
    figure.pointerAction = 'newPerpendicular'
    figure.message('Cliquer sur une droite et sur un point')
  })
  btnZoomPlus.addEventListener('click', () => {
    figure.pixelsPerUnit += 10
    for (const e of figure.set) {
      e.update()
    }
  })
  btnRed.addEventListener('click', () => {
    figure.message('Cliquer sur l\'élément que vous souhaitez mettre en couleur')
    figure.pointerAction = 'setColor'
    figure.pointerSetOptions.color = 'red'
  })
  btnGreen.addEventListener('click', () => {
    figure.message('Cliquer sur l\'élément que vous souhaitez mettre en couleur')
    figure.pointerAction = 'setColor'
    figure.pointerSetOptions.color = 'green'
  })
}
