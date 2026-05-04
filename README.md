# CookingBook — Frontend

Interface utilisateur pour une application de gestion et partage de recettes culinaires.  
React 18 · TypeScript · Styled Components · Material-UI

> Backend : [cookingbookAL](../cookingbookAL)

---

## Stack

| | |
|---|---|
| **Framework** | React 18 |
| **Langage** | TypeScript |
| **Routing** | React Router v7 |
| **HTTP** | Axios (intercepteur JWT automatique) |
| **UI** | Material-UI v6, Styled Components |
| **Build** | Create React App |

---

## Lancer le projet

### Prérequis
- Node.js 18+
- Le backend doit tourner sur `http://localhost:8080`

```bash
cd cookingbookreact
npm install
npm start      # http://localhost:3000
```

---

## Pages

| Route | Description | Auth |
|-------|-------------|:----:|
| `/` | Landing page | |
| `/listeRecette` | Liste paginée avec recherche et filtres | |
| `/recette/:id` | Détail d'une recette | |
| `/recetteForm` | Créer une recette | ✓ |
| `/recetteForm/:id` | Modifier une recette | ✓ owner |
| `/login` | Connexion | |
| `/register` | Inscription | |
| `/profil` | Page profil | ✓ |

---

## Fonctionnalités

- **Liste paginée** — 9 recettes par page, navigation par numéro de page
- **Recherche** par nom avec debounce 300 ms (côté serveur)
- **Tri** — plus récentes ou mieux notées
- **Filtrage par tags** — sélection multiple (logique AND)
- **Notation** — étoiles interactives 1-5 (uniquement si authentifié et non-auteur)
- **Portions ajustables** — les quantités se recalculent en temps réel
- **Upload d'image** avec recadrage intégré (crop modal)
- **CRUD complet** — créer, modifier, supprimer ses propres recettes
- **Confirmation de suppression** — dialog MUI au lieu d'un `window.confirm`
- **Validation de formulaire** — erreurs inline par champ avant envoi
- **Toasts** — feedback utilisateur via Snackbar MUI (succès, erreur, avertissement)

---

## Structure

```
src/
├── api/
│   └── axiosInstance.ts        → Axios avec intercepteur Authorization: Bearer
├── components/
│   ├── AppLayout.tsx            → Header sticky, menu avatar avec dropdown
│   ├── LandingPage.tsx          → Page d'accueil avec sections animées
│   ├── RecetteList.tsx          → Liste + pagination + recherche + tri + tags
│   ├── RecettePage.tsx          → Page détail + notation + boutons owner
│   ├── RecetteFormComponents/   → Formulaire création/édition
│   │   ├── RecetteForm.tsx
│   │   ├── ImageCropModal.tsx
│   │   ├── ingredients/
│   │   ├── steps/
│   │   └── tags/
│   └── auth/
│       ├── LoginPage.tsx
│       ├── RegisterPage.tsx
│       └── ProfilPage.tsx
├── context/
│   └── AuthContext.tsx          → État global auth (user, isAuthenticated, logout)
├── routes/
│   └── Routes.js                → BrowserRouter + ProtectedRoute
└── styles/
    └── styleComponents/         → Styled components par page
```

---

## Authentification

Le token JWT est stocké en `localStorage` et injecté automatiquement dans chaque requête via l'intercepteur Axios :

```ts
// api/axiosInstance.ts
instance.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});
```

Les routes protégées redirigent vers `/login` si l'utilisateur n'est pas authentifié (`ProtectedRoute`).

---

## Variables d'environnement

```env
# cookingbookreact/.env
REACT_APP_API_URL=http://localhost:8080/api/v1
```
