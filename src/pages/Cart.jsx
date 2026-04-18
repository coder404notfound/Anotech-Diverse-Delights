import { useNavigate } from "react-router-dom"
import { useCartStore } from "../store/useCartStore"
import toast from "react-hot-toast" // ✅ ADD

export default function Cart() {
  const navigate = useNavigate()

  const { cart, removeFromCart, updateQuantity, clearCart } =
    useCartStore()

  const total = cart.reduce(
    (s, i) => s + i.price * i.quantity,
    0
  )

  return (
    <div className="p-6 bg-gray-50 min-h-screen max-w-5xl mx-auto">

      <h1 className="text-2xl font-bold mb-6">
        Your Cart
      </h1>

      {cart.length === 0 ? (
        <div className="text-center mt-16 space-y-4">
          <p className="text-gray-500">
            Your cart is empty.
          </p>
          <button
            onClick={() => navigate("/products")}
            className="bg-yellow-500 text-black px-4 py-2 rounded
                       hover:bg-yellow-400 transition"
          >
            Browse Products
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((i) => (
              <div
                key={i.id}
                className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm"
              >
                <img
                  src={i.image}
                  alt={i.title}
                  className="h-20 w-20 object-contain"
                />

                <div className="flex-1 space-y-1">
                  <p className="font-medium line-clamp-1">
                    {i.title}
                  </p>

                  <p className="text-yellow-600 font-semibold">
                    ${i.price}
                  </p>

                  <p className="text-sm text-gray-500">
                    ${(i.price * i.quantity).toFixed(2)}
                  </p>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateQuantity(
                          i.id,
                          Math.max(1, i.quantity - 1)
                        )
                      }
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                    >
                      -
                    </button>

                    <span className="w-8 text-center">
                      {i.quantity}
                    </span>

                    <button
                      onClick={() =>
                        updateQuantity(i.id, i.quantity + 1)
                      }
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* REMOVE */}
                <button
                  onClick={() => {
                    removeFromCart(i.id)
                    toast("Item removed") // ✅ HERE
                  }}
                  className="px-3 py-1 text-sm text-red-600 border border-red-200 rounded-md
                             hover:bg-red-50 transition"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-white p-4 rounded-lg shadow-sm space-y-4">

            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">
                Total
              </h2>

              <h2 className="text-xl font-bold text-yellow-600">
                ${total.toFixed(2)}
              </h2>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  clearCart()
                  toast.success("Cart cleared") // ✅ HERE
                }}
                className="flex-1 border border-gray-300 py-2 rounded
                           hover:bg-gray-100 transition"
              >
                Clear Cart
              </button>

              <button
                onClick={() => navigate("/checkout")}
                className="flex-1 bg-green-600 text-white py-2 rounded
                           hover:bg-green-700 transition"
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}