# Studio de direction — *The Hanging Tree*

Application web pédagogique pour s’entraîner à diriger l’arrangement de *The Hanging Tree* interprété par l’Orchestre du Nouveau Monde.

## Organisation des fichiers

Le projet a été réorganisé en plusieurs fichiers pour améliorer la lisibilité et la maintenabilité. L’unique fichier `index.html` de plus de 3 500 lignes a été découpé en 19 fichiers modulaires :

```
Chef.fe_Orchestre/
├── index.html                # HTML uniquement (structure, pas de CSS ni de JS inline)
├── README.md
├── css/
│   ├── 01-variables.css      # Variables CSS (couleurs, espacements), reset, boutons communs
│   ├── 02-header.css         # Header, barre de transport, pilules de section, curseur de mesure
│   ├── 03-hands.css          # Panneau des deux mains, canvas de battue, prompteur
│   ├── 04-score.css          # Conducteur annoté et lignes de mesure
│   ├── 05-modals.css         # Modales de base (backdrop, boîte, guide 4/4)
│   ├── 06-detail.css         # Modale détail et modale exercice
│   ├── 07-orchestra.css      # Section orchestre / simulation des pupitres
│   └── 08-toast.css          # Toast de notification et médias queries finales
└── js/
    ├── state.js              # État global (state, exercise, simulation)
    ├── refs.js               # Références DOM, initDOMRefs(), showToast()
    ├── data.js               # Données de la partition (62 mesures, pupitres, cues, accords)
    ├── audio.js              # Moteur audio Web Audio API (synthé, métronome, MP3/WAV)
    ├── playback.js           # Contrôle de lecture, timing, animationLoop
    ├── ui.js                 # Rendu interface (pilules, liste des mesures, détail)
    ├── canvas.js             # Dessin animé de la battue à 4 temps (main droite)
    ├── simulation.js         # Simulation des pupitres d'orchestre (répétition)
    ├── exercise.js           # Exercice de battue en temps réel
    └── main.js               # Initialisation et event listeners
```

### Rôle de chaque dossier

- **`css/`** : toutes les feuilles de styles, découpées par zone fonctionnelle (header, mains, score, modales, orchestre, toast). Les numéros préfixés garantissent l'ordre de chargement.
- **`js/`** : tous les scripts JavaScript, organisés par responsabilité. L'ordre de chargement dans `index.html` respecte les dépendances entre modules.

## Lancer l’application

- Version publiée : <https://cecilesauder.github.io/Chef.fe_Orchestre/>

Ouvrez simplement `index.html` dans un navigateur moderne. Aucun serveur n'est requis.

## Fonctionnalités

- **Battue** : animation de direction à 4 temps, levée de préparation, choix du tempo (70 %, 85 % ou 100 %), métronome et boucle de section.
- **Conducteur** : 62 mesures annotées. Cliquer sur une mesure du conducteur ou déplacer le curseur pour s’y rendre.
- **Orchestre et répétition** : plan de scène affiché à côté du conducteur, avec les 29 pupitres de la partition. La carte distingue les pupitres qui jouent dans la mesure, ceux silencieux sur toute la mesure et ceux à appeler. Faites glisser un pupitre vers la poubelle (ou sélectionnez-le puis appuyez sur Suppr) pour le retirer de l’effectif ; le bouton voisin rétablit tous les pupitres. Les entrées sont annoncées jusqu’à une mesure à l’avance ; touchez ou cliquez les pupitres dorés avant leur départ. Les pupitres retirés sont exclus des objectifs et du score.
- **États des pupitres** : calculés mesure par mesure à partir des notes et silences de la partition ; « joue » signifie qu’il y a des notes dans la mesure, même si elle contient aussi de courts silences. Les appels combinent les entrées après une mesure entière de silence et les repères pédagogiques du conducteur ; ils ne décrivent pas chaque attaque ou nuance de chaque partie.
- **Audio** : clic de métronome et accompagnement synthétisé intégrés. Le bouton **Tester le son** joue un bref signal de vérification. Pour travailler avec l’enregistrement, télécharger le [MP3 de l’ONM](https://drive.google.com/uc?export=download&id=11zXnqzXyFb5kRrhbbxSbqv2-OLB6wqT0), puis le charger avec **MP3/WAV** dans l’application. La [partition PDF](https://drive.google.com/file/d/1L3KpcF_tF96cqktVMI78gtgKVVE-FxXz/view?usp=sharing) est également disponible dans Google Drive.
- **Guide et détails** : rappel des gestes de battue et vue de la nuance, de l’action à préparer et des pupitres à écouter pour la mesure active.
- **Exercice de précision** : taper avec le bouton ou la barre d’espace pour recevoir un retour sur le placement rythmique. L’historique des sessions est conservé dans le navigateur.

## Audio et données locales

L’application ne contient pas l’enregistrement. Les fichiers MP3/WAV sélectionnés sont lus localement dans le navigateur ; ils ne sont pas téléversés. L’audio peut nécessiter un premier clic sur **Tester le son** ou **Démarrer**, selon les réglages du navigateur. Les scores de l’exercice sont enregistrés dans le stockage local du navigateur et peuvent être effacés depuis l’historique.

## Crédits

- Œuvre : *The Hanging Tree*. J.N Howard
- Arrangement : Juliette Penin.
- Partition et enregistrement de référence : Orchestre du Nouveau Monde.

La partition et l’enregistrement sont hébergés sur Google Drive ; vérifier les conditions d’utilisation et de partage auprès de leurs ayants droit.
