import { create } from "zustand"

export const useCartStore = create((set, get) => ({
  cart: JSON.parse(localStorage.getItem("cart")) || [],

  saveCart: (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart))
    set({ cart })
  },

  addToCart: (product) => {
    const cart = get().cart
    const existing = cart.find((i) => i.id === product.id)

    let updated

    if (existing) {
      updated = cart.map((i) =>
        i.id === product.id
          ? { ...i, quantity: i.quantity + 1 }
          : i
      )
    } else {
      updated = [...cart, { ...product, quantity: 1 }]
    }

    get().saveCart(updated)
  },

  removeFromCart: (id) => {
    const updated = get().cart.filter((i) => i.id !== id)
    get().saveCart(updated)
  },

  updateQuantity: (id, qty) => {
    const updated = get().cart.map((i) =>
      i.id === id ? { ...i, quantity: qty } : i
    )
    get().saveCart(updated)
  },

  // 👇 ADD THIS
  clearCart: () => {
    localStorage.removeItem("cart")
    set({ cart: [] })
  }
}))