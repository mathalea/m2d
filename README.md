# m2d - MathALEA 2D

MathALEA 2D doit permettre de générer toutes les figures de géométrie utiles à l'enseignement des mathématiques avec un export svg, un export LaTeX et une version interactive.

### Pour le tester en local

- Récupérer le dépôt
- `pnpm install`
- `pnpm start` pour lancer la compilation et le serveur de ViteJs

### Principes de fonctionnement

### Principe général

On créé un objet `figure` instance de la classe `Figure` qui stockera toutes les information sur le container SVG et les éléments de ce SVG.

On créé un objet graphique avec `figure.element(...params, ?config)` qui renvoie un objet d'une sous classe de `Element2D` qui a pour paramètre `this.g` qui sera un groupe SVG que l'on pourra insérer dans le DOM


```
const figure = new Figure()
const A = figure.point(x, y, {labelPosition: 'above left', style: 'x'})
A.move(x, y)
const B = figure.point(x, y)
const sAB = figure.segment(A, B)
```

Les objets `Element2D` devront avoir plusieurs méthodes : 
- color : pour changer la couleur
- thickness : pour changer l'épaisseur
- size : pour la taille des points

Les points ont : 
- moveTo(x, y) : pour les déplacer
- translation, rotation, homothétie, similitude qui créeront un nouveau point (sauf si on met l'option `clone: false`)


ToDO : 
- fill : pour colorier
- mark : pour ajouter un codage


```
const figure = new Figure()
const A = figure.point(x, y, {labelPosition: 'above left', style: 'x'})
const B = A.translation(x, y)
const C = A.symetrie(B)
```

#### Temp

Pour les constructions on a souvent besoin de points intermédiaires, mais ceux-ci ne sont pas affichés et n'ont pas d'interactivité. Un objet créé avec le paramètre d'options `temp: true` ne sera pas ajouté à la figure. 


#### Les dépendances

```
dependencies: {element: Element2D, type: string}[]
```

Chaque objet a la liste des autres objets qui dépendent de lui. Par exemple si le point est l'extrémité d'un segment ou si un point est le centre d'un cercle.

À la création d'un segment, on utilise `notifyDependence(A, 'end1)` pour prévenir A que c'est la première extrémité d'un segment et qu'il faudra la modifier si A bouge.



#### Les coordonnées

Il y a 3 systèmes de coordonnées donc la convention suivante est utilisée en interne : 
- les coordonnées par rapport à la fenêtre (notamment celles de la souris) 
- les coordonnées à l'intérieur du SVG (avec l'axe y du haut vers le bas) sont préfixées avec `s` : `sx`, `sy` ...
- les coordonnées dans notre repère personnalisée ne sont pas préfixées `x` : `x1`, `x2` ...

Le paramètre `pixelsPerUnit` permet de déterminer la conversion des coordonnées du repère vers celle du SVG.

#### Réflexions

- Les polygones sont un ensemble de segments. Facile à manipuler pour les déplacements de points mais l'inconvénient, c'est la jonction entre 2 segments qui n'est pas belle notamment quand l'épaisseur est importante. C'est plus joli avec polyline mais il faudrait recalculer toute la liste de x y 
