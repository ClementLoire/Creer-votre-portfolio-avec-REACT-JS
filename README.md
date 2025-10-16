# Portfolio John Doe - Développeur Web Full Stack

## 📋 Description du projet

Portfolio professionnel de John Doe, développeur web full stack en formation au CEF (Centre Européen de Formation). Ce site présente ses compétences, services et réalisations dans le domaine du développement web.

Le projet est développé en **HTML5**, **CSS3** et **Bootstrap 5**

### Objectifs du projet

- Créer une vitrine professionnelle pour la recherche d'alternance
- Démontrer les compétences en développement front-end
- Offrir une expérience utilisateur optimale sur tous les appareils

---

##  Fonctionnalités

### Pages disponibles

1. ** Accueil** - Présentation, compétences et modale GitHub
2. ** Services** - Offre de services (UX/UI Design, Développement Web, SEO)
3. ** Réalisations** - Portfolio de 6 projets web
4. ** Contact** - Formulaire de contact avec validation + Google Maps
5. ** Mentions légales** - Informations légales (éditeur, hébergeur, crédits)

### Fonctionnalités techniques

-  **Design responsive** (mobile, tablette, desktop)
-  **Navigation active** avec indicateur visuel
-  **Modale GitHub** avec fetch API
-  **Formulaire de contact** avec validation JavaScript
-  **Effets hover CSS** sur cards, boutons et liens
-  **Accordéon Bootstrap** pour les mentions légales
-  **SEO optimisé** (meta tags, alt, semantic HTML)
-  **Accessibilité** (ARIA labels, navigation clavier)
-  **Performance** (lazy loading images, CDN)

---

### Front-end
- **HTML5** - Structure sémantique
- **CSS3** - Styles personnalisés et animations
- **JavaScript** - Interactivité et validation

### Frameworks & Bibliothèques
- **Bootstrap 5.2.3** - Framework CSS responsive
- **Bootstrap Icons** - Bibliothèque d'icônes
- **Google Fonts** - Police Nunito Sans

### Outils
- **Git/GitHub** - Versioning et hébergement du code
- **Visual Studio Code** - Éditeur de code

---

## Prérequis

Aucune installation complexe n'est requise ! Ce projet utilise uniquement des technologies front-end.

### Logiciels nécessaires

- **Navigateur web moderne** (Chrome, Firefox, Safari, Edge)
- **Éditeur de code**
- **Git** - Pour cloner le repository - *optionnel*

### Connaissances recommandées

- HTML5 / CSS3
- Bootstrap 5
- JavaScript (bases)
- Git (bases)

---

## Installation et lancement

### Option 1 : Clone avec Git

# Cloner le repository
git clone https://github.com/votre-username/portfolio-john-doe.git

# Accéder au dossier
cd portfolio-john-doe

# Ouvrir index.html dans votre navigateur
# - Double-clic sur le fichier
# - Ou clic droit > Ouvrir avec > Navigateur

### Option 2 : Téléchargement direct

1. Cliquez sur le bouton **Code** puis **Download ZIP**
2. Extrayez le fichier ZIP dans un dossier
3. Ouvrez `index.html` dans votre navigateur

### Option 3 : Utilisation d'un serveur local

# Avec Python 3
python -m http.server 8000

# Avec Node.js (http-server)
npx http-server

# Avec PHP
php -S localhost:8000

# Puis accéder à : http://localhost:8000
---

##  Charte graphique

### Police
- **Nunito Sans** (Google Fonts)
  - Poids 400 : Corps de texte
  - Poids 600 : Titres et éléments `<strong>`

### Couleurs (Bootstrap 5 par défaut)
- **Primary** : `#0d6efd` (Bleu Bootstrap)
- **Dark** : `#212529` (Gris foncé)
- **Light Gray** : `#efefef` (Hover cards)
- **Success** : `#198754`
- **Danger** : `#dc3545`
- **Warning** : `#ffc107`
- **Info** : `#0dcaf0`

### Icônes
- **Bootstrap Icons** v1.10.0

---

## Effets graphiques

### Navigation
-  Liens en **MAJUSCULES** (via CSS)
-  Lien actif : **gras + souligné**
-  Hover : **souligné**

### Cards (Services & Portfolio)
-  Hover : fond `#efefef` + ombre + translation
-  Images : zoom léger (scale 1.05)

### Boutons
-  Primary : s'assombrit au survol
-  Outline : s'éclaircit au survol

### Footer
-  Icônes : deviennent blanches au survol
-  Liens : en gras + déplacement au survol

---

### Optimisations mobiles

- Navigation hamburger responsive
- Images adaptatives (`img-fluid`)
- Tailles de texte ajustées
- Espacement réduit sur petits écrans

---

## Accessibilité

- Balises sémantiques HTML5
-  Attributs `alt` sur toutes les images
-  Attributs `aria-label` sur les liens/boutons
-  Navigation au clavier optimisée
-  Contrastes de couleurs respectés
-  Focus visible sur les éléments interactifs
