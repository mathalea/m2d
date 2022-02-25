import { Figure } from '../../Figure'
import { Element2D } from '../Element2D'

export abstract class Measure {
    parentFigure: Figure
    value: number
    dependencies: (Element2D | Measure)[]
    constructor (parentFigure) {
      this.parentFigure = parentFigure
      this.dependencies = []
    }

    abstract update ():void

    addDependency (dependency: Element2D | Measure) {
      this.dependencies.push(dependency)
    }

    notifyAllDependencies () {
      for (const element of this.dependencies) {
        element.update()
      }
    }
}
