'use client'
import { useEffect, useState } from 'react'
import { assets } from '@/assets/assets'
import ProductCard from '@/components/ProductCard'
import Navbar2 from '@/components/content/Nav'
import Footer from '@/components/content/Footer'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import Loading from '@/components/Loading'
import { useAppContext } from '@/context/AppContext'
import React from 'react'
import axios from 'axios'

const Product = () => {
  const { id } = useParams()

  const { products, router, addToCart } = useAppContext()
  const [loading, setLoading] = useState(true)

  const [mainImage, setMainImage] = useState(null)
  const [productData, setProductData] = useState(null)

  const fetchProductData = async () => {
    try {
      // Try from context first
      setLoading(true) // ✅ Now this will work

      let product = products.find((p) => p._id === id)

      // Fallback to API if not found
      if (!product) {
        const res = await axios.get(
          `http://localhost:8008/api/Productget/${id}`
        )
        product = res.data.product

        console.log('res', res)
        product.image = product.image?.map((img) => img.replace(/\\/g, '/'))
      }
      console.log(product)

      setProductData(product)
      setMainImage(product?.image?.[0] || '')
    } catch (error) {
      console.error('Failed to fetch product:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProductData()
  }, [id, products.length])

  return productData ? (
    <>
      <Navbar2 />
      <div className="px-6 md:px-16 lg:px-32 pt-14 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="px-5 lg:px-16 xl:px-20">
            <div className="rounded-lg overflow-hidden bg-gray-500/10 mb-4">
              <Image
                src={
                  mainImage ||
                  `http://localhost:8008/${productData?.images?.[0]}` ||
                  '/default.jpg'
                }
                alt="alt"
                className="w-full h-auto object-cover mix-blend-multiply"
                width={1280}
                height={720}
              />
            </div>

            <div className="grid grid-cols-4 gap-4">
              {productData.images.map((image, index) => (
                <div
                  key={index}
                  onClick={() =>
                    setMainImage(
                      `http://localhost:8008/${image.replace(/\\/g, '/')}`
                    )
                  }
                  className="cursor-pointer rounded-lg overflow-hidden bg-gray-500/10 w-full aspect-square"
                >
                  <Image
                    src={`http://localhost:8008/${image.replace(/\\/g, '/')}`}
                    alt={`Product ${index + 1}`}
                    width={200}
                    height={200}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <h1 className="text-3xl font-medium text-gray-800/90 mb-4">
              {productData.name}
            </h1>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                <Image
                  className="h-4 w-4"
                  src={assets.star_icon}
                  alt="star_icon"
                />
                <Image
                  className="h-4 w-4"
                  src={assets.star_icon}
                  alt="star_icon"
                />
                <Image
                  className="h-4 w-4"
                  src={assets.star_icon}
                  alt="star_icon"
                />
                <Image
                  className="h-4 w-4"
                  src={assets.star_icon}
                  alt="star_icon"
                />
                <Image
                  className="h-4 w-4"
                  src={assets.star_dull_icon}
                  alt="star_dull_icon"
                />
              </div>
              <p>(4.5)</p>
            </div>
            <p className="text-gray-600 mt-3">{productData.description}</p>
            <p className="text-3xl font-medium mt-6">
              ₹{productData.offerPrice}
              <span className="text-base font-normal text-gray-800/60 line-through ml-2">
                ₹{productData.price}
              </span>
            </p>
            {productData.discount > 0 && (
              <div className="w-[15%] bg-red-600 text-white text-xs font-bold px-2 py-1 rounded shadow-md">
                {productData.discount}% OFF
              </div>
            )}
            <hr className="bg-green-600 my-6" />
            <div className="overflow-x-auto">
              <table className="table-auto border-collapse w-full max-w-72">
                <tbody>
                  <tr>
                    <td className="text-gray-600 font-medium">Brand</td>
                    <td className="text-gray-800/50 ">Generic</td>
                  </tr>
                  <tr>
                    <td className="text-gray-600 font-medium">Color</td>
                    <td className="text-gray-800/50 ">Multi</td>
                  </tr>
                  <tr>
                    <td className="text-gray-600 font-medium">Category</td>
                    <td className="text-gray-800/50">{productData.category}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex items-center mt-10 gap-4">
              <button
                onClick={() => addToCart(productData._id)}
                className="w-full py-3.5 bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition"
              >
                Add to Cart
              </button>
              <button
                onClick={() => {
                  addToCart(productData._id)
                  router.push('/cart')
                }}
                className="w-full py-3.5 bg-[#2B4C3F] hover:bg-[#1f3a30] text-white transition"
              >
                Buy now
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center mb-4 mt-16">
            <p className="text-3xl font-medium">
              Featured{' '}
              <span className="font-medium text-green-600">Products</span>
            </p>
            <div className="w-28 h-0.5 bg-[#2B4C3F] hover:bg-[#1f3a30] mt-2"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 pb-14 w-full">
            {products.slice(0, 5).map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
          <button className="px-8 py-2 mb-16 border rounded text-gray-500/70 hover:bg-slate-50/90 transition">
            See more
          </button>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <Loading />
  )
}

export default Product
