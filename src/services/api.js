import axios from "axios"

const BASE = "https://fakestoreapi.com"

export const getProducts = async () => {
  const res = await axios.get(`${BASE}/products`)
  return res.data
}

export const getCategories = async () => {
  const res = await axios.get(`${BASE}/products/categories`)
  return res.data
}

export const getProductById = async (id) => {
  const res = await axios.get(`${BASE}/products/${id}`)
  return res.data
}