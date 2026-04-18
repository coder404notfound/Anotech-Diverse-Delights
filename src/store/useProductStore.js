import { create } from "zustand"
import { getProducts, getCategories } from "../services/api"

export const useProductStore = create((set) => ({
  products: [],
  categories: [],
  loading: false,
  error: null,

  fetchData: async () => {
    try {
      set({ loading: true, error: null })

      const [products, categories] = await Promise.all([
        getProducts(),
        getCategories()
      ])

      set({ products, categories, loading: false })
    } catch {
      set({ error: "Failed to load data", loading: false })
    }
  }
}))