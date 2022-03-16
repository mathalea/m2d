# m2d - MathALEA 2D

MathALEA 2D doit permettre de générer toutes les figures de géométrie utiles à l'enseignement des mathématiques avec un export svg, un export LaTeX et une version interactive.

# Licence

Ce programma a été développé par Rémi Angot et Jean-Claude Lhote à partir de février 2021 sous licence AGPL pour reconstruire le travail fait sous MathALEA2D avec l'interactivité en plus et une programmation davantage orienté objet.

## Pour le tester en local

- Récupérer le dépôt
- `pnpm install`
- `pnpm start` pour lancer la compilation et le serveur de ViteJs

Le fichier `src/main.ts` permet de faire des tests de constructions/

## Principes de fonctionnement

### Principe général

On créé un objet `figure` instance de la classe `Figure` qui stockera toutes les information sur le container SVG (width, height, xMin, yMin...) et les éléments de ce SVG (sauvegardés dans `figure.set` pour ceux qui ont besoin d'un tracé). `figure` a notamment 2 propriétés `figure.svg` et `figure.latex` qui permettent de récupérer le code SVG ou TikZ de la figure.

Le objets graphiques sont des instances d'objets d'une sous classe de `Element2D` qui ont un paramètre `g` qui sera un groupe SVG ou un simple élément qui est automatiquement ajouté au svg de la figure.


```
const figure = new Figure()
const A = figure.point(x, y) // ou const A = new Point(figure, x, y)
const B = figure.point(x, y)
const sAB = figure.segment(A, B) // ou const sAB = new Segment(A, B)
```

Les objets `Element2D` peuvent être stylisés
- color : pour changer la couleur
- thickness : pour changer l'épaisseur
- dashed: booléen pour les pointillés
- size : pour la taille des points
- fill : couleur de remplissage
- opacity : pour l'opacité de tout le groupe
- fillOpacity : pour l'opacité du remplissage

#### ToDo

- AngleMark
- ~PointByOrthongonalProjection~
- Bspline
- ~Mediatrice~
- ~Bissectrice~
- SegmentCode
- Cube
- ~DemiDroite (Ray)~
- ~Grille aimantée pour placer les points~
- ~Vecteur avec flèche~
- ~Arc de cercle défini par 3 points~
- Codage segment
- Codage arc
- Texte le long d'un segment
- Repère
- Courbe représentative de fonctions
- Calculs d'aires
- Ajouter le type Algebraic pour les arguments de PointByRotation(), PointBySimilitude(), PointOnLineAtD(), Vector(), Angle(), ...
- ...





#### Les dépendances

```
childs: {element: Element2D, type: string}[]
```

Exemple : 
- Quand on créé un segment [AB], on prévient A que le segment dépend de lui avec `A.addChild(this)`.
- Lorsque `A` est déplacé, il exécute après son déplacement `notifyAllChilds()` qui parcourt la liste de ces dépendances.
- Comme le segment est dans sa liste de dépendance on appelle la méthode `update()`  du segment.

Avec un fonctionnement en cascade chaque objet prévient ses dépendances pour qu'elles se mettent à jour. Dans chaque objet, la il y a la méthode `update` pour calculer les nouvelles coordonnées et la liste des paramètres nécessaires à ce nouveau calcul (l'antécédent de la transformation, les éléments caractéristiques de la transformation...)


### Les coordonnées

Il y a 3 systèmes de coordonnées donc la convention suivante est utilisée en interne : 
- les coordonnées par rapport à la fenêtre (notamment celles de la souris) 
- les coordonnées à l'intérieur du SVG (avec l'axe y du haut vers le bas) sont préfixées avec `s` : `sx`, `sy` ...
- les coordonnées dans notre repère personnalisée ne sont pas préfixées `x` : `x1`, `x2` ... (Un type `Coords = { x: number, y: number}` est défini pour manipuler des littéraux adaptés aux calculs et aux transformations sans avoir à créer des points intermédiaires)

Le paramètre `pixelsPerUnit` (par défaut à 30) permet de déterminer la conversion des coordonnées du repère vers celle du SVG. Pour la sortie LaTeX, l'unité correspondra à 1 cm.

#### Les arrondis

On travaille avec les décimaux de JS. Pour l'affichage LaTeX dans `Figure.ts > get latex` on arrondit à 3 chiffres après la virgule.
Dans textByPosition.ts, on arrondit à un chiffre après la virgule.


### Measures

Un objet enfant de `Element2D` peut dépendre d'un autre objet enfant de `Element2D` ou enfant de `Measure` qui est une classe abstraite pour des valeurs numériques dynamiques.
Parmi les enfant de `Measure` on trouve l'objet `Algebraic` qui peut avoir ses dépendances. Un point peut être défini par homothétie en utilisant un rapport de type `number` ou `Algebraic`. Dans ce dernier cas, on pourra faire varier le rapport d'homothétie dynamiquement avec, par exemple, l'attribut algebraic d'un objet `Cursor`.
Cette bivalence `number | Algebraic` devrait être ajoutée dans d'autres objet comme `PointByRotation`...++