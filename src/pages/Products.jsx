import { useEffect, useState, useMemo } from "react"
import { useProductStore } from "../store/useProductStore"
import ProductCard from "../components/ProductCard"
import { debounce } from "../utils/debounce"

export default function Products() {
  const { products, categories, fetchData, loading, error } =
    useProductStore()

  const [search, setSearch] = useState("")
  const [cat, setCat] = useState("")
  const [page, setPage] = useState(1)

  const ITEMS_PER_PAGE = 8

  useEffect(() => {
    fetchData()
  }, [fetchData])

  // debounce search
  const handleSearch = useMemo(
    () => debounce((v) => setSearch(v), 300),
    []
  )

  // cleanup debounce
  useEffect(() => {
    return () => handleSearch.cancel?.()
  }, [handleSearch])

  // 🎯 Filter
  const filtered = useMemo(() => {
    return products.filter(
      (p) =>
        p.title.toLowerCase().includes(search.toLowerCase()) &&
        (!cat || p.category === cat)
    )
  }, [products, search, cat])

  // 📄 Pagination
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)

  const paginated = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE
    return filtered.slice(start, start + ITEMS_PER_PAGE)
  }, [filtered, page, ITEMS_PER_PAGE])

  // reset page on filter change
  useEffect(() => {
    setPage(1)
  }, [search, cat])

  // scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [page])

  // 🔢 Page range (fixes bug)
  const MAX_VISIBLE = 5
  const startPage = Math.max(1, page - 2)
  const endPage = Math.min(totalPages, startPage + MAX_VISIBLE - 1)

  const pages = []
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }

  // 🎯 Button styles
  const filterBtnBase =
    "px-3 py-1 rounded-md text-sm font-medium border transition"

  const filterBtnActive =
    "bg-yellow-500 text-black border-yellow-500 shadow-sm"

  const filterBtnInactive =
    "bg-gray-900 text-gray-200 border-gray-700 hover:bg-gray-800"

  // 🚨 STATES
  if (loading) return <p className="p-6">Loading...</p>

  if (error)
    return <p className="p-6 text-red-500">Failed to load products</p>

  return (
    <div className="p-6 space-y-6">

      {/* SEARCH */}
      <input
        className="border p-2 w-full rounded-md"
        placeholder="Search products..."
        onChange={(e) => handleSearch(e.target.value)}
      />

      {/* FILTERS */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setCat("")}
          className={`${filterBtnBase} ${
            cat === "" ? filterBtnActive : filterBtnInactive
          }`}
        >
          All
        </button>

        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`${filterBtnBase} ${
              cat === c ? filterBtnActive : filterBtnInactive
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* EMPTY */}
      {!filtered.length ? (
        <p className="text-center text-gray-500 mt-10">
          No products found.
        </p>
      ) : (
        <>
          {/* GRID */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {paginated.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          {/* PAGINATION */}
          <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">

            {/* PREV */}
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>

            {/* PAGE NUMBERS */}
            {pages.map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`px-3 py-1 border rounded ${
                  page === p
                    ? "bg-yellow-500 text-black border-yellow-500"
                    : "bg-gray-900 text-gray-200 border-gray-700 hover:bg-gray-800"
                }`}
              >
                {p}
              </button>
            ))}

            {/* NEXT */}
            <button
              onClick={() =>
                setPage((p) => Math.min(totalPages, p + 1))
              }
              disabled={page === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>

          </div>
        </>
      )}
    </div>
  )
}