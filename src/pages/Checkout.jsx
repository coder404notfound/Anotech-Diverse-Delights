import { useNavigate } from "react-router-dom"
import { useCartStore } from "../store/useCartStore"
import toast from "react-hot-toast" // ✅ ADD

export default function Checkout() {
  const navigate = useNavigate()
  const { cart, clearCart } = useCartStore()

  const total = cart.reduce(
    (s, i) => s + i.price * i.quantity,
    0
  )

  const handleConfirm = () => {
    clearCart()

    toast.success("Order placed successfully!") // ✅ REPLACE ALERT

    navigate("/")
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">

      <h1 className="text-2xl font-bold">
        Checkout
      </h1>

      {cart.length === 0 ? (
        <div className="text-gray-500 space-y-3">
          <p>No items to checkout.</p>

          {/* small UX improvement */}
          <button
            onClick={() => navigate("/products")}
            className="text-yellow-600 hover:underline"
          >
            Browse products
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between bg-white p-3 rounded shadow-sm"
              >
                <div>
                  <p className="font-medium">
                    {item.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity}
                  </p>
                </div>

                <p className="font-semibold text-yellow-600">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-between font-bold text-lg border-t pt-4">
            <span>Total</span>
            <span className="text-yellow-600">
              ${total.toFixed(2)}
            </span>
          </div>

          <button
            onClick={handleConfirm}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Confirm Order
          </button>
        </>
      )}
    </div>
  )
}