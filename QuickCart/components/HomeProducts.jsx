import React from 'react'
import ProductCard from './ProductCard'
import { useAppContext } from '@/context/AppContext'
import bg from '@/public/pc4.png'
const HomeProducts = () => {
  const { products, router } = useAppContext()

  return (
    <div className="flex flex-col items-center pt-14">
      <p className="text-4xl font-medium text-left w-full ps-5">
        Popular products
      </p>
      <div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 flex-col items-center gap-10 mt-6 pb-14 w-full p-6"
        style={{
          backgroundImage: `url(${bg.src})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      >
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
      <button
        onClick={() => {
          router.push('/all-products')
        }}
        className="px-12 py-2.5 border rounded text-gray-500/70 hover:bg-slate-50/90 transition"
      >
        See more
      </button>
    </div>
  )
}

export default HomeProducts
