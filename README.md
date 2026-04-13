# CinePink

A modern movie discovery web application built with React and Firebase. Browse trending films, search for your favorites, explore cast & crew, and build your personal watchlist — all in one place.

## Features

- **Movie Discovery** — Browse trending, now playing, and upcoming movies
- **Hero Section** — Highlighted featured movie with backdrop and trailer support
- **Movie Sliders** — Swiper-based carousels for quick browsing
- **Search** — Real-time movie search via TMDB API
- **Movie Details** — Full info including cast, director, genres, runtime, reviews, and trailer
- **Person Pages** — Actor/director profiles with biography and filmography
- **Favorites** — Save and manage favorite movies (requires login)
- **User Authentication** — Register, login, email verification, forgot password, change password
- **User Profile** — Edit display name, manage account

## Tech Stack

| Category        | Technology                  |
| --------------- | --------------------------- |
| UI Framework    | React 19                    |
| Routing         | React Router v7             |
| Styling         | Tailwind CSS v4             |
| Auth & Database | Firebase (Auth + Firestore) |
| Movie Data      | TMDB API                    |
| HTTP Client     | Axios                       |
| Slider          | Swiper                      |
| Icons           | MUI Icons                   |
| Notifications   | Sonner                      |

## Getting Started

### Prerequisites

- Node.js 18+
- A [TMDB API key](https://www.themoviedb.org/settings/api)
- A Firebase project with Authentication and Firestore enabled

### Installation

1. Clone the repository:

```bash
git clone https://github.com/halenurgurel/cinepink.git
cd cinepink
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the project root:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key

VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. Start the development server:

```bash
npm run dev
```

## Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/) and create a new project
2. Enable **Email/Password** authentication under Authentication → Sign-in method
3. Enable **Email verification** (users must verify email before accessing protected routes)
4. Create a **Firestore Database** in test mode (or configure security rules)
5. Copy your Firebase config values to the `.env` file

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── Button.jsx
│   ├── FavoriteButton.jsx
│   ├── FormInput.jsx
│   ├── MovieCard.jsx
│   ├── MovieSlider.jsx
│   ├── UserAvatar.jsx
│   └── ...
├── pages/            # Route-level pages
│   ├── HomePage.jsx
│   ├── MoviesPage.jsx
│   ├── MovieDetailsPage.jsx
│   ├── PersonDetailsPage.jsx
│   ├── SearchResultsPage.jsx
│   ├── FavoritesPage.jsx
│   ├── ProfilePage.jsx
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   └── VerifyEmailPage.jsx
├── hooks/            # Custom React hooks
│   ├── useData.js
│   ├── useFavorites.js
│   └── useAuth.js
├── services/         # External service configs
│   ├── firebase.js
│   ├── movieService.js
│   └── axiosConfig.js
├── context/          # React context
│   ├── AuthProvider.jsx
│   └── authContext.js
├── constants/        # Shared constants
│   └── tmdb.js
└── layout/           # App layout components
    ├── Layout.jsx
    └── Navbar.jsx
```

## Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
```
