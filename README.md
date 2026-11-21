# Chef.fe d’orchestre

Application web pédagogique pour s’entraîner à diriger un orchestre sur **The Hanging Tree**, dans l’arrangement de Juliette Penin interprété par l’Orchestre du Nouveau Monde.

L’application propose un conducteur annoté de 62 mesures, une battue animée à 4 temps, un prompteur de gestes de la main gauche, un accompagnement sonore synthétisé et plusieurs outils d’entraînement à la précision.

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
- **Tap tempo** : tapoter plusieurs fois sur le bouton, ou appuyer sur **Espace**, pour faire suivre la baguette au tempo de l’utilisateur.
- **Clic** : active ou désactive le métronome.
- **Boucle** : répète la section musicale active.
- **MP3/WAV** : charge un enregistrement local pour remplacer le synthétiseur intégré.
- **Barre de mesure, sections et conducteur** : permettent d’aller directement à un endroit du morceau.
- **Guide 4/4** : rappelle les principaux gestes de la battue.
- **Détails** : ouvre une vue de travail consacrée à la nuance, à l’amplitude de la battue, au geste de la main gauche, aux départs et aux pupitres à écouter.
- **Exercice** : mesure automatiquement la précision des taps de l’utilisateur par rapport au tempo cible.
- **Historique** : conserve localement les sessions terminées pour suivre la moyenne, le meilleur tap et le nombre de sessions.

## Parcours conseillé

1. Ouvrir le **Guide 4/4** pour revoir la figure de battue et les rôles respectifs des deux mains.
2. Cliquer sur **Démarrer** et observer la levée, les temps, la mesure active et le mouvement de la baguette.
3. Utiliser **Détails** pour étudier la nuance, l’amplitude recommandée, le geste de la main gauche et les pupitres à préparer.
4. Charger éventuellement un MP3/WAV local. Pendant sa lecture, sa position réelle pilote la mesure et le prompteur via `audio.currentTime`.
5. Utiliser **Tap tempo** si le tempo doit être défini à partir de pulsations jouées par l’utilisateur.
6. Ouvrir **Exercice**, attendre la préparation, puis taper avec la touche Espace ou le bouton prévu. Arrêter la session pour l’enregistrer dans l’historique.

## Corrections récentes

- La **main gauche est maintenant affichée à gauche** et la **main droite avec la baguette à droite**, conformément à la lecture naturelle du chef depuis le point de vue de l’utilisateur.
- La lecture visuelle est maintenant **indépendante de Web Audio** : si le contexte audio est bloqué par un navigateur mobile, une webview ou une permission, la baguette, les mesures et le prompteur continuent malgré tout à défiler.
- Le chargement d’un **MP3/WAV attend ses métadonnées avant de chercher une position**, ce qui évite l’erreur fréquente de `currentTime` sur mobile.
- Les erreurs de décodage, de lecture automatique ou de synchronisation du fichier audio sont isolées : elles ne peuvent plus arrêter la boucle de direction.
- Lorsque le MP3 joue, **`audio.currentTime` devient l’horloge principale** : il pilote la mesure, le temps, la progression de la baguette et le prompteur. L’horloge interne ne sert plus que de repli pendant le chargement ou si la lecture est refusée.
- Les recalages audio automatiques à chaque temps ont été supprimés. Un repositionnement n’est effectué que lors d’un démarrage, d’un reset ou d’un déplacement volontaire vers une mesure.
- Le **Tap tempo** utilise les dernières pulsations, une médiane résistante aux taps accidentels et une plage sécurisée de 40 à 180 BPM. Il ajuste la battue, le métronome, le synthétiseur et la vitesse de l’audio importé.
- La vue détaillée se met à jour avec la mesure active et propose un repère pédagogique distinct pour le geste de la main gauche et l’équilibre des pupitres.
- Le mode exercice attribue une note sur 100, affiche l’écart en millisecondes, le meilleur score et la série de taps réussis. La touche Espace et le bouton d’exercice sont utilisables comme geste de référence.
- L’historique des exercices est stocké uniquement dans le `localStorage` du navigateur. Il affiche les dernières sessions et peut être effacé avec le bouton **Effacer** ; aucune donnée n’est envoyée au serveur.

## Choix techniques

Le projet est volontairement autonome : une seule page HTML contient la structure, les styles et le JavaScript. L’audio de démonstration est généré avec la **Web Audio API** ; aucun fichier audio n’est inclus dans le dépôt. Les fichiers importés par l’utilisateur restent locaux à son navigateur.

La compatibilité audio est progressive : l’application reste utilisable pour travailler les gestes et les indications même si un navigateur refuse le son, si le fichier n’est pas encore prêt ou si le format audio n’est pas décodable.

## Données et confidentialité

Les fichiers MP3/WAV sont lus localement par le navigateur et ne sont pas envoyés au dépôt. Les scores d’exercice sont conservés uniquement dans le `localStorage` du navigateur utilisé ; ils ne suivent pas automatiquement l’utilisateur sur un autre appareil ou un autre navigateur. Le bouton **Effacer** supprime cet historique local.

## Pistes d’amélioration

1. Ajouter un réglage de décalage audio et deux points de calibration pour les fichiers qui commencent par un silence ou dont le tempo diffère de 100 BPM.
2. Prévoir une vue responsive dédiée aux petits écrans et un mode paysage optimisé pour tablette.
3. Ajouter un réglage de volume séparé pour le clic et l’accompagnement synthétisé.
4. Permettre de choisir la mesure de départ de la levée et d’afficher un compte à rebours plus explicite.
5. Ajouter un mode de détection du geste via la caméra ou le microphone, avec accord explicite de l’utilisateur.
6. Découper progressivement les données musicales et le moteur d’interface en modules JavaScript lorsque le prototype s’enrichira.

## Validation actuelle

La version publiée a été vérifiée dans Chromium headless avec un chargement complet de la page et sans erreur JavaScript. Le scénario fonctionnel vérifié couvre l’ouverture de la vue détaillée, le calcul du **Tap tempo** à 120 BPM, le démarrage d’un exercice, le calcul d’une note et l’enregistrement d’une session dans l’historique local.

## Crédits et droits

- Œuvre travaillée : *The Hanging Tree*.
- Arrangement : Juliette Penin.
- Interprétation et ressources de référence : Orchestre du Nouveau Monde.
- Ce dépôt contient un outil pédagogique prototype ; vérifier les conditions de partage et d’utilisation des partitions et enregistrements auprès de leurs ayants droit.
