/*
 * Created by Angot Rémi and Lhote Jean-Claude on 15/02/2022.
 *
 * MathALEA 2D : Software for animating online dynamic mathematics figures
 * https://coopmaths.fr
 * @Author Angot Rémi and Lhote Jean-Claude (contact@coopmaths.fr)
 * @License: GNU AGPLv3 https://www.gnu.org/licenses/agpl-3.0.html
 */

import { Figure } from '../../Figure'
import { Element2D } from '../Element2D'

export abstract class Measure {
    parentFigure: Figure
    id: number
    private _value: number
    childs: (Element2D | Measure)[]
    parents: (Element2D | Measure)[]
    private _exist: boolean
    constructor (parentFigure: Figure) {
      this.parentFigure = parentFigure
      this.id = this.parentFigure.lastId++
      this.childs = []
      this.parents = []
      this._value = 0
      this._exist = true
      parentFigure.setMeasures.add(this)
    }

    save () {
    }

    set value (x) {
      this._value = x
    }

    get value () {
      return this._value
    }

    abstract update ():void

    addChild (child: Element2D | Measure) {
      this.childs.push(child)
      child.parents.push(this)
    }

    notifyAllChilds () {
      for (const element of this.childs) {
        element.update()
      }
    }

    erase () {
      this.exist = false
    }

    set exist (arg: boolean) {
      try {
        let allParentsExist = true
        for (const parent of this.parents) {
          if (!parent.exist) {
            allParentsExist = false
            break
          }
        }
        this._exist = arg && allParentsExist
        for (const e of this.childs) {
          e.exist = this._exist && e.exist
          if (e instanceof Element2D && e.isVisible) this._exist ? e.show(false) : e.hide(false)
        }
      } catch (error) {
        console.log('Erreur dans Measure.exist', error)
      }
    }

    get exist () {
      return this._exist
    }
}
