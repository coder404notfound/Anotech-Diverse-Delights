# 🛍️ Diverse Delights – E-commerce Product Explorer

A clean, responsive, and user-focused frontend application built with React.
This project demonstrates practical frontend engineering skills, including state management, API handling, and thoughtful UI/UX design.

---

## 🚀 Live Demo

> *(Add your deployed link here – Vercel / Netlify)*

---

## 📌 Project Overview

Diverse Delights is a lightweight e-commerce product explorer that allows users to:

* Browse products from a real API
* Search and filter products
* View detailed product information
* Add and manage items in a cart
* Complete a simple checkout flow

The goal of this project was to build a **simple, well-structured, and scalable frontend system** rather than an over-engineered UI demo.

---

## 🧱 Tech Stack

* **Frontend:** React (Vite)
* **Styling:** Tailwind CSS
* **State Management:** Zustand
* **Routing:** React Router
* **Notifications:** react-hot-toast
* **API:** Fake Store API

---

## 📂 Project Structure

```
/src
  /components   → Reusable UI components (Navbar, ProductCard, etc.)
  /pages        → Page-level components (Home, Products, Cart, etc.)
  /services     → API handling layer
  /store        → Zustand state stores
  /utils        → Utility functions (e.g., debounce)
```

---

## 🔑 Features

### 🔐 Authentication

* Basic login (no backend validation)
* Session persisted using localStorage
* Protected and public routes

---

### 🛒 Product Listing

* Fetches products from API
* Responsive grid layout
* Clean product cards (image, title, price)

---

### 🔍 Search & Filter

* Search by product title
* Filter by category
* Debounced input for performance

---

### 📄 Product Details

* Full product information
* Quantity selector
* Add to cart functionality

---

### 🧺 Cart Management

* Add, remove, and update quantity
* Total price calculation
* Persisted using localStorage

---

### 💳 Checkout

* Order summary
* Cart reset after confirmation
* Toast feedback on actions

---

### 📊 Data Handling

* Client-side pagination
* Optimized rendering using `useMemo`
* Smooth UX across interactions

---

### 🔔 UX Enhancements

* Toast notifications for key actions:

  * Login / Logout
  * Add to cart
  * Remove item
  * Clear cart
  * Checkout
* Clear empty, loading, and error states

---

## 🧠 Key Decisions

### 1. **Zustand for State Management**

Chosen for its simplicity and minimal boilerplate compared to Redux.
It allows clean separation of logic without unnecessary complexity.

---

### 2. **Client-side Pagination**

Implemented on the Products page to improve usability and performance while keeping the solution simple and effective.

---

### 3. **Debounced Search**

Prevents unnecessary re-renders and improves perceived performance during typing.

---

### 4. **Service Layer for API Calls**

All API interactions are centralized, avoiding repeated logic and improving maintainability.

---

### 5. **Consistent UI/UX Approach**

Focus was placed on:

* Clear feedback (toasts)
* Predictable interactions
* Clean layout over visual complexity

---

## ⚙️ Setup Instructions

```bash
# Clone the repository
git clone <your-repo-link>

# Navigate into the project
cd diverse-delights

# Install dependencies
npm install

# Run development server
npm run dev
```

---

## 🌐 API Used

* https://fakestoreapi.com/products
* https://fakestoreapi.com/products/categories

---

## 📱 Responsiveness

The application is fully responsive and works across:

* Desktop
* Tablet
* Mobile

---

## 📈 Possible Improvements

* Dark mode support
* Skeleton loaders for better loading UX
* Server-side pagination
* Enhanced accessibility (ARIA roles, keyboard navigation)
* Code splitting for improved performance

---

## 🧾 Final Notes

This project focuses on:

* Clean architecture
* Practical implementation
* Thoughtful UX decisions

The goal was not to overbuild, but to deliver a **simple, scalable, and maintainable frontend system**.

---

## 👤 Author

**Irfan Ahmad**

---