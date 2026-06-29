# ShopEase – E-Commerce Web Client

A fully functional e-commerce web client built with React, Tailwind CSS, Axios, and TanStack Query, consuming the [Platzi Fake Store API](https://api.escuelajs.co/api/v1).

## Tech Stack

| Tool | Purpose |
|---|---|
| React 19 + Vite | UI framework and build tool |
| React Router v7 | Client-side routing |
| TanStack Query v5 | Server state management |
| Axios | HTTP client (centralized instance) |
| Tailwind CSS v4 | Utility-first styling |
| react-hot-toast | User feedback toasts |
| lucide-react | Icons |

## Setup

```bash
npm install
npm run dev
```

Create a `.env` file (already included, not committed):
```
VITE_API_BASE_URL=https://api.escuelajs.co/api/v1
```

## Features

- **Product catalog** – search (debounced), category filter, pagination
- **Product detail** – image gallery, add to cart / buy now
- **Cart** – add, update quantity, remove, running total — persists across page refresh via localStorage
- **Checkout** – form validation, simulated order submission
- **Order confirmation** – per-order detail view
- **Order history** – all past orders

## API Notes

The assignment brief references the "E-Comus API" (`ecomus-api.vercel.app`) which returned a 404 at time of development. The Platzi Fake Store API (`api.escuelajs.co/api/v1`) was used instead — it is a well-known, live REST API used widely for front-end assignments and provides the same resource set (products, categories, filtering, pagination). This discrepancy is noted here per the assignment instructions ("if something does not match the documentation, note the discrepancy in your README and adapt").

The Platzi API has no cart or orders endpoints, so those are managed client-side with localStorage + React Context/useReducer. This is the correct approach: cart and order data are treated as **local UI state** (not server state), so they live outside the TanStack Query cache.

## Architecture

```
src/
  api/
    client.js          # Centralized Axios instance with interceptors
    products.js        # API call functions (no hooks here)
  components/
    Navbar.jsx         # Sticky nav with cart badge
    Button.jsx         # Shared button variants
    Input.jsx          # Shared labeled input
    Spinner.jsx        # Loading state
    ErrorMessage.jsx   # Error state
  context/
    CartContext.jsx    # useReducer + localStorage for cart
    OrdersContext.jsx  # useState + localStorage for orders
  features/
    products/
      useProducts.js   # TanStack Query hooks (useQuery wrappers)
      ProductCard.jsx  # Reusable product card
  pages/
    ProductsPage.jsx
    ProductDetailPage.jsx
    CartPage.jsx
    CheckoutPage.jsx
    OrderConfirmationPage.jsx
    OrderHistoryPage.jsx
```

## State Management

- **Server state** (products, categories) → lives only in TanStack Query cache via `useQuery`. Never copied into `useState`.
- **UI state** (search input, active image index, form fields, modal visibility) → local `useState` inside components.
- **Persistent client state** (cart, orders) → `useReducer`/`useState` + `localStorage` inside Context providers. These have no server backing, so TanStack Query is not involved.

## Screenshots

> Add screenshots here after running the app.

## Live Demo

> Add Vercel/Netlify URL here after deployment.
