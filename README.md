# m2d - MathALEA 2D

MathALEA 2D doit permettre de générer toutes les figures de géométrie utiles à l'enseignement des mathématiques avec un export svg, un export LaTeX et une version interactive.

### Pour le tester en local

- Récupérer le dépôt
- `pnpm install`
- `pnpm start` pour lancer la compilation et le serveur de ViteJs

### Principes de fonctionnement

### Principe général

On créé un objet `figure` instance de la classe `Figure` qui stockera toutes les information sur le container SVG (width, height, xMin, yMin...) et les éléments de ce SVG (sauvegardés dans list pour ceux qui ont besoin d'un tracé). `figure` a notamment 2 propriétés `figure.svg` et `figure.latex` qui permettent de récupérer le code SVG ou TikZ de la figure.

On créé un objet graphique avec `figure.element(...params, ?config)` qui renvoie un objet d'une sous classe de `Element2D` qui a un paramètre `g` qui sera un groupe SVG ou un simple élément que l'on pourra insérer dans le DOM


```
const figure = new Figure()
const A = figure.point(x, y, {labelPosition: 'above left', style: 'x'})
A.move(x, y)
const B = figure.point(x, y)
const sAB = figure.segment(A, B)
```

Les objets `Element2D` devront avoir plusieurs set/get : 
- color : pour changer la couleur
- thickness : pour changer l'épaisseur
- size : pour la taille des points

Les points et les cercles ont : 
- moveTo(x, y) : pour les déplacer
- translation, rotation, homothétie, similitude qui créeront un nouveau point (sauf si on met l'option `clone: false`)
- fill : pour colorier
- label des points avec un positionnement


ToDo : 
- mark : pour ajouter un codage
- pointilles
- modifier les actions du clic (au lieu du drag-n-drop on pourrait changer la couleur et l'épaisseur des éléments cliqués)


```
const figure = new Figure()
const A = figure.point(x, y, {labelPosition: 'above left', style: 'x'})
const B = A.translation(x, y)
const C = A.symetrie(B)
```

#### Feuille de route

- AngleMark
- ~PointByOrthongonalProjection~
- Bspline
- ~Mediatrice~
- ~Bissectrice~
- SegmentCode
- Cube
- ~DemiDroite (Ray)~
- Grille aimantée pour placer les points





#### Les dépendances

```
dependencies: {element: Element2D, type: string}[]
```

Chaque objet a la liste des autres objets qui dépendent de lui. Par exemple si le point est l'extrémité d'un segment ou si un point est le centre d'un cercle.

À la création d'un segment, on utilise `addDependency(A, 'end1)` pour prévenir A que c'est la première extrémité d'un segment et qu'il faudra la modifier si A bouge.



#### Les coordonnées

Il y a 3 systèmes de coordonnées donc la convention suivante est utilisée en interne : 
- les coordonnées par rapport à la fenêtre (notamment celles de la souris) 
- les coordonnées à l'intérieur du SVG (avec l'axe y du haut vers le bas) sont préfixées avec `s` : `sx`, `sy` ...
- les coordonnées dans notre repère personnalisée ne sont pas préfixées `x` : `x1`, `x2` ...

Le paramètre `pixelsPerUnit` permet de déterminer la conversion des coordonnées du repère vers celle du SVG.

#### Les arrondis

On travaille avec les décimaux de JS. Pour l'affichage LaTeX dans `Figure.ts > get latex` on arrondit à 3 chiffres après la virgule.

Dans textByPosition.ts, on arrondit à un chiffre après la virgule.
