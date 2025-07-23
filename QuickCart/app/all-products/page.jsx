'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from '../../components/ProductCard' // adjust path if needed
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const AllProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:8008/api/Productget') // Adjust URL
      setProducts(res.data.products || []) // assuming res.data.products is the array
      console.log(res.data.products)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  if (loading) return <p className="text-center">Loading products...</p>

  return (
    <>
      <Navbar />

      <div className="flex flex-col items-start px-6 md:px-16 lg:px-32">
        <div className="flex flex-col items-end pt-12">
          <p className="text-2xl font-medium">All products</p>
          <div className="w-16 h-0.5 bg-orange-600 rounded-full"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-12 pb-14 w-full">
          {' '}
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
