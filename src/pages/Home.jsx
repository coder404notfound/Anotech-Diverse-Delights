import { useEffect } from "react"
import { useProductStore } from "../store/useProductStore"
import ProductCard from "../components/ProductCard"
import { useNavigate } from "react-router-dom"

export default function Home() {
  const { products, fetchData, loading } = useProductStore()
  const navigate = useNavigate()

  useEffect(() => {
    fetchData()
  }, [fetchData])

  if (loading) return <p className="p-6">Loading...</p>

  const featured = products.slice(0, 6)

  return (
    <div className="flex flex-col">

      {/* 🔥 HERO SECTION */}
      <div
        className="h-[75vh] sm:h-[80vh] md:h-[85vh] lg:h-[90vh] bg-cover bg-center relative"
        style={{ backgroundImage: "url('/hero.jpg')" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center px-4">
          
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Welcome to Diverse Delights
          </h1>

          <p className="mt-4 text-gray-200 max-w-xl text-base md:text-lg">
            Your one-stop shop for all things delightful.
          </p>

          <button
            onClick={() => navigate("/products")}
            className="mt-6 bg-yellow-500 text-black px-6 py-2 rounded font-semibold
                       hover:bg-yellow-400 transition"
          >
            Shop Now
          </button>
        </div>
      </div>

      {/* 🌟 FEATURED SECTION */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center text-gray-900">
            Featured Products
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

        </div>
      </div>

    </div>
  )
}