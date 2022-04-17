import { Figure } from '../Figure'
import { ClickedElements } from './handlePointerAction'

export function erase (clickedElements: ClickedElements) {
  for (const e of clickedElements.all) {
    e.erase()
  }
}

export function actionErasetMessage (figure: Figure) {
  figure.displayMessage('Cliquer sur l\'objet à supprimer')
}
