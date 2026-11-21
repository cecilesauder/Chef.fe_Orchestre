# Chef.fe d’orchestre

Application web pédagogique pour s’entraîner à diriger un orchestre sur **The Hanging Tree**, dans l’arrangement de Juliette Penin interprété par l’Orchestre du Nouveau Monde.

Le prototype propose un conducteur annoté de 62 mesures, une battue animée à 4 temps, un prompteur de gestes de la main gauche et un accompagnement sonore synthétisé à 100 BPM.

## Utiliser l’application

Aucune installation n’est nécessaire : ouvrir [`index.html`](./index.html) dans un navigateur moderne.

Pour la tester depuis un serveur local :

```bash
python3 -m http.server 8000
```

Puis ouvrir <http://localhost:8000>.

### Commandes disponibles

- **Démarrer / Pause / Reprendre** : lance la levée de préparation puis la battue synchronisée.
- **Réinitialiser** : revient à la mesure 1.
- **70 %, 85 %, 100 %** : modifie le tempo et l’affichage du BPM.
- **Clic** : active ou désactive le métronome.
- **Boucle** : répète la section musicale active.
- **MP3/WAV** : charge un enregistrement local pour remplacer le synthétiseur intégré.
- **Barre de mesure, sections et conducteur** : permettent d’aller directement à un endroit du morceau.
- **Guide 4/4** : rappelle les principaux gestes de la battue.

## Corrections récentes

- La **main gauche est maintenant affichée à gauche** et la **main droite avec la baguette à droite**, conformément à la lecture naturelle du chef depuis le point de vue de l’utilisateur.
- La lecture visuelle est maintenant **indépendante de Web Audio** : si le contexte audio est bloqué par un navigateur mobile, une webview ou une permission, la baguette, les mesures et le prompteur continuent malgré tout à défiler.
- Le chargement d’un **MP3/WAV attend ses métadonnées avant de chercher une position**, ce qui évite l’erreur fréquente de `currentTime` sur mobile.
- Les erreurs de décodage, de lecture automatique ou de synchronisation du fichier audio sont isolées : elles ne peuvent plus arrêter la boucle de direction.
- L’audio importé reste synchronisé par mesure lorsqu’il est disponible, tandis que le conducteur conserve sa propre horloge de battue.

## Choix techniques

Le projet est volontairement autonome : une seule page HTML contient la structure, les styles et le JavaScript. L’audio de démonstration est généré avec la **Web Audio API** ; aucun fichier audio n’est inclus dans le dépôt. Les fichiers importés par l’utilisateur restent locaux à son navigateur.

La compatibilité audio est progressive : l’application reste utilisable pour travailler les gestes et les indications même si un navigateur refuse le son, si le fichier n’est pas encore prêt ou si le format audio n’est pas décodable.

## Pistes d’amélioration

1. Ajouter une vraie horloge audio de référence pour synchroniser encore plus précisément un MP3 long, notamment entre deux mesures.
2. Prévoir une vue responsive dédiée aux petits écrans et un mode paysage optimisé pour tablette.
3. Ajouter un réglage de volume séparé pour le clic et l’accompagnement synthétisé.
4. Permettre de choisir la mesure de départ de la levée et d’afficher un compte à rebours plus explicite.
5. Ajouter un mode d’entraînement avec suivi du tempo réel de l’utilisateur via le microphone ou un bouton de tap tempo.
6. Découper progressivement les données musicales et le moteur d’interface en modules JavaScript lorsque le prototype s’enrichira.

## Crédits et droits

- Œuvre travaillée : *The Hanging Tree*.
- Arrangement : Juliette Penin.
- Interprétation et ressources de référence : Orchestre du Nouveau Monde.
- Ce dépôt contient un outil pédagogique prototype ; vérifier les conditions de partage et d’utilisation des partitions et enregistrements auprès de leurs ayants droit.
