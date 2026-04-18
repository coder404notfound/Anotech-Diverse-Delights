import React from "react"
import { Link } from "react-router-dom"

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white p-4 rounded shadow flex flex-col h-full">
      
      {/* Image (fixed height) */}
      <div className="h-32 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full object-contain"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow mt-3">
        
        {/* Title (fixed space via line clamp) */}
        <h3 className="text-sm line-clamp-2 min-h-[40px]">
          {product.title}
        </h3>

        {/* Price */}
        <p className="text-yellow-600 font-bold mt-2">
          ${product.price}
        </p>

        {/* Push button to bottom */}
        <div className="mt-auto">
          <Link
  to={`/product/${product.id}`}
  className="block mt-3 bg-gray-900 text-white text-center py-1 rounded 
hover:bg-gray-700 hover:shadow-sm transition"
>
  View
</Link>
        </div>

      </div>
    </div>
  )
}

export default React.memo(ProductCard)