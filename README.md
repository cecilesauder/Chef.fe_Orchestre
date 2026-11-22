# Studio de direction — *The Hanging Tree*

Application web pédagogique pour s’entraîner à diriger l’arrangement de *The Hanging Tree* interprété par l’Orchestre du Nouveau Monde.

## Lancer l’application

- Version publiée : <https://cecilesauder.github.io/Chef.fe_Orchestre/>
- En local : ouvrir [`index.html`](./index.html) dans un navigateur récent, ou démarrer un serveur avec `python3 -m http.server 8000`, puis ouvrir <http://localhost:8000>.

## Fonctionnalités

- **Battue** : animation de direction à 4 temps, levée de préparation, choix du tempo, tap tempo, métronome et boucle de section.
- **Conducteur** : 62 mesures annotées. Cliquer sur une mesure du conducteur ou déplacer le curseur pour s’y rendre.
- **Orchestre et répétition** : plan de scène affiché à côté du conducteur, avec les 29 pupitres de la partition. Cocher les pupitres absents, déplacer les pupitres sur le plan, puis lancer la répétition. Les entrées sélectionnées sont signalées à l’avance ; toucher ou cliquer les pupitres attendus pour donner leur départ. Les pupitres absents sont retirés des objectifs et du score.
- **Repères d’entrée** : le plan suit la mesure active et met en évidence les pupitres concernés par les annotations de l’application. Ces repères pédagogiques ne constituent pas une transcription exhaustive de toutes les entrées de la partition.
- **Audio** : clic de métronome et accompagnement synthétisé intégrés. Le bouton **Tester le son** joue un bref signal de vérification. Pour travailler avec l’enregistrement, télécharger le [MP3 de l’ONM](https://drive.google.com/uc?export=download&id=11zXnqzXyFb5kRrhbbxSbqv2-OLB6wqT0), puis le charger avec **MP3/WAV** dans l’application. La [partition PDF](https://drive.google.com/file/d/1L3KpcF_tF96cqktVMI78gtgKVVE-FxXz/view?usp=sharing) est également disponible dans Google Drive.
- **Guide et détails** : rappel des gestes de battue et vue de la nuance, de l’action à préparer et des pupitres à écouter pour la mesure active.
- **Exercice de précision** : taper avec le bouton ou la barre d’espace pour recevoir un retour sur le placement rythmique. L’historique des sessions est conservé dans le navigateur.

## Audio et données locales

L’application ne contient pas l’enregistrement. Les fichiers MP3/WAV sélectionnés sont lus localement dans le navigateur ; ils ne sont pas téléversés. L’audio peut nécessiter un premier clic sur **Tester le son** ou **Démarrer**, selon les réglages du navigateur. Les scores de l’exercice sont enregistrés dans le stockage local du navigateur et peuvent être effacés depuis l’historique.

## Crédits

- Œuvre : *The Hanging Tree*.
- Arrangement : Juliette Penin.
- Partition et enregistrement de référence : Orchestre du Nouveau Monde.

La partition et l’enregistrement sont hébergés sur Google Drive ; vérifier les conditions d’utilisation et de partage auprès de leurs ayants droit.
