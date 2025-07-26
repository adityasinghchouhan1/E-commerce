'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from '../../components/ProductCard'
import Navbar2 from '@/components/content/Nav'
import Footer from '@/components/content/Footer'
import { useSearchParams } from 'next/navigation'

const AllProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const searchParams = useSearchParams()
  const category = searchParams.get('category') || 'Combo' // fallback

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8008/api/Productget/category/${category}`
      )
      setProducts(res.data.products || [])
      console.log('data', res.data.products)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [category])

  if (loading) return <p className="text-center">Loading products...</p>

  console.log('products', products)
  return (
    <>
      <Navbar2 />
      <div className="flex flex-col items-start px-6 md:px-16 lg:px-16">
        <div className="flex flex-col items-end pt-12">
          <p className="text-4xl font-semibold">{category}</p>
          <div className="w-16 h-0.5 bg-[#2B4C3F] rounded-full"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-12 pb-14 w-full">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default AllProducts
