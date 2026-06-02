# 🐱 CatCaffe App

A modern React + TypeScript + TailwindCSS web application for discovering and reserving cat cafés around the world.

---

## ✨ About the App

CatCaffe App is a single-page application where users can:

- Search cat cafés by city using **Google Places API**
- See basic info for each café (name, address, rating, photo)
- Click on a café to open a dedicated page with:
  - Google Map embed with the location
  - Opening hours (with accordion toggle)
  - Reservation system (date & time) saved to **localStorage**
  - Photos of the café (or fallback cat images from **The Cat API** if no photos are available)
- Sort cafés by rating or name
- Responsive layout with navigation and footer

---

## 🛠️ Tech Stack

- [React](https://react.dev/) + [Vite](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/) for styling
- [Google Places API](https://developers.google.com/maps/documentation/places/web-service/overview) for café data
- [The Cat API](https://thecatapi.com/) for fallback cat images
- Local storage for reservations (via a custom `ReservationManager` class)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/elab-development/klijentske-veb-tehnologije-2024-2023-0422-cat-caffee
cd catcaffe-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment variables

Create a .env file in the project root with your Google Maps API key:

VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
VITE_CAT_API_KEY=your_cat_api_key

### 4. Run the development server

```bash
npm run dev
```
