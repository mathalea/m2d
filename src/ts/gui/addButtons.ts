export function addButtons (figure) {
  const body = document.querySelector('body')
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
  if (body) {
    body.appendChild(btnDrag)
    body.appendChild(btnNewPoint)
    body.appendChild(btnNewSegment)
    body.appendChild(btnRed)
    body.appendChild(btnGreen)
    body.appendChild(btnZoomMinus)
    body.appendChild(btnZoomPlus)
  }

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
}
