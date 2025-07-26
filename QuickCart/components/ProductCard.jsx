import React from 'react'
import { assets } from '@/assets/assets'
import Image from 'next/image'
import { useAppContext } from '@/context/AppContext'

const ProductCard = ({ product }) => {
  const { currency, router } = useAppContext()
  const normalizedImagePath =
    product?.images?.[0]?.replace(/\\/g, '/') || 'default.jpg'

  return (
    // 1a2e25
    <div
      onClick={() => {
        router.push('/product/' + product._id)
        scrollTo(0, 0)
      }}
      className="flex flex-col items-start gap-2 w-full max-w-[350px] cursor-pointer bg-[#115737] rounded-2xl p-0 shadow-md hover:shadow-lg border border-[#2e7d5d] transition-all duration-300 overflow-hidden"
    >
      {/* Product Image */}
      <div className="group relative bg-black/20  w-full h-52 overflow-hidden flex items-center justify-center">
        <Image
          src={`http://localhost:8008/${normalizedImagePath}`}
          alt={product.name}
          width={800}
          height={800}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
        {/* Heart Icon (optional) */}
        {/* <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md">
          <Image className="h-3 w-3" src={assets.heart_icon} alt="heart_icon" />
        </button> */}
      </div>

      {/* Product Info */}
      <div className="w-full p-2">
        <p className="text-white font-semibold text-lg truncate">
          {product.name}
        </p>
        <p className="text-sm text-gray-400 truncate">{product.description}</p>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-1">
          <p className="text-xs text-green-400">{4.5}</p>
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, index) => (
              <Image
                key={index}
                className="h-3 w-3"
                src={
                  index < Math.floor(4)
                    ? assets.star_icon
                    : assets.star_dull_icon
                }
                alt="star_icon"
              />
            ))}
          </div>
        </div>

        {/* Price & Buy Button */}
        <div className="flex items-center justify-between mt-3">
          <p className="text-white text-base font-semibold">
            {currency}
            {product.offerPrice}
          </p>
          <button className="px-4 py-1.5 bg-[#2e7d5d] hover:bg-[#256e50] rounded-full text-xs text-white shadow-sm transition-all duration-200">
            Buy now
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
