'use client'
import React, { useEffect, useState } from 'react'
import { assets } from '@/assets/assets'
import Image from 'next/image'
import { useAppContext } from '@/context/AppContext'
import Footer from '@/components/seller/Footer'
import Loading from '@/components/Loading'
import axios from 'axios'

const ProductList = () => {
  const { router } = useAppContext()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [editIndex, setEditIndex] = useState()
  const [newImages, setNewImages] = useState([])

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    offerPrice: '',
  })

  const fetchSellerProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:8008/api/Productget`)
      if (res.data.success) {
        setProducts(res.data.products)
      }
    } catch (err) {
      console.error('Error fetching products:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8008/api/Productdelete/${id}`)
      setProducts((prev) => prev.filter((p) => p._id !== id))
    } catch (err) {
      console.error('Delete failed:', err)
    }
  }

  const handleEditClick = (index, product) => {
    setEditIndex(index)
    setFormData({
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      offerPrice: product.offerPrice,
    })
  }

  const handleUpdate = async (id) => {
    try {
      const form = new FormData()
      Object.entries(formData).forEach(([key, value]) =>
        form.append(key, value)
      )

      newImages.forEach((img) => form.append('images', img))

      const res = await axios.put(
        `http://localhost:8008/api/Productupdate/${id}`,
        form,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      )

      if (res.data.success) {
        setProducts((prev) =>
          prev.map((p) => (p._id === id ? res.data.product : p))
        )
        setEditIndex(null)
        setNewImages([])
      }
    } catch (err) {
      console.error('Update failed:', err)
    }
  }

  useEffect(() => {
    fetchSellerProduct()
  }, [])

  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-[900px] w-full text-sm text-left border-collapse">
        <thead className="bg-gray-100 text-gray-800">
          <tr>
            <th className="px-4 py-3 w-60">Name</th>
            <th className="px-4 py-3 w-40">Image</th>

            <th className="px-4 py-3 w-40">Category</th>
            <th className="px-4 py-3 w-72">Description</th>
            <th className="px-4 py-3 w-32">Price</th>
            <th className="px-4 py-3 w-36">Offer Price</th>
            <th className="px-4 py-3 w-44">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {products.map((product, index) => (
            <tr key={product._id} className="border-t">
              {/* Product Name Cell */}
              <td className="p-3">
                {editIndex === index ? (
                  <input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    className="border px-2 py-1 rounded text-sm w-[200px]"
                    placeholder="Product Name"
                  />
                ) : (
                  <span className="font-medium text-gray-900">
                    {product.name}
                  </span>
                )}
              </td>

              {/* Product Images Cell */}
              <td className="p-3">
                <div className="flex gap-2 flex-wrap">
                  {editIndex === index ? (
                    <>
                      {/* Existing Images */}
                      {product.images.map((image, i) => (
                        <div key={i} className="relative group">
                          <img
                            src={`http://localhost:8008/${image}`}
                            alt={`product-${i}`}
                            className="w-12 h-12 object-cover rounded border"
                          />
                        </div>
                      ))}

                      {/* New Image Upload */}
                      <input
                        type="file"
                        multiple
                        onChange={(e) => setNewImages([...e.target.files])}
                        className="text-xs mt-1"
                      />

                      {/* Preview New Images */}
                      {newImages.length > 0 && (
                        <div className="flex gap-1 mt-2 flex-wrap">
                          {Array.from(newImages).map((img, i) => (
                            <img
                              key={i}
                              src={URL.createObjectURL(img)}
                              alt="preview"
                              className="w-10 h-10 object-cover rounded border"
                            />
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    product.images.map((image, i) => (
                      <img
                        key={i}
                        src={`http://localhost:8008/${image}`}
                        alt={`product-${i}`}
                        className="w-12 h-12 object-cover rounded border"
                      />
                    ))
                  )}
                </div>
              </td>

              {/* Category */}
              <td className="px-4 py-3 align-top">
                {editIndex === index ? (
                  <input
                    value={formData.category}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        category: e.target.value,
                      }))
                    }
                    className="border px-2 py-1 rounded text-sm w-full"
                    placeholder="Category"
                  />
                ) : (
                  <span>{product.category}</span>
                )}
              </td>

              {/* Description */}
              <td className="px-4 py-3 align-top">
                {editIndex === index ? (
                  <textarea
                    rows={2}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    className="border px-2 py-1 rounded text-sm w-full resize-none"
                    placeholder="Description"
                  />
                ) : (
                  <p className="line-clamp-2 text-sm">{product.description}</p>
                )}
              </td>

              {/* Price */}
              <td className="px-4 py-3 align-top">
                {editIndex === index ? (
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        price: e.target.value,
                      }))
                    }
                    className="border px-2 py-1 rounded text-sm w-full"
                    placeholder="₹ Price"
                  />
                ) : (
                  <>₹{product.price}</>
                )}
              </td>

              {/* Offer Price */}
              <td className="px-4 py-3 align-top">
                {editIndex === index ? (
                  <input
                    type="number"
                    value={formData.offerPrice}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        offerPrice: e.target.value,
                      }))
                    }
                    className="border px-2 py-1 rounded text-sm w-full"
                    placeholder="₹ Offer Price"
                  />
                ) : (
                  <>₹{product.offerPrice}</>
                )}
              </td>

              {/* Actions */}
              <td className="px-4 py-3 align-top">
                <div className="flex gap-2 flex-wrap">
                  {editIndex === index ? (
                    <button
                      onClick={() => handleUpdate(product._id)}
                      className="bg-green-600 text-white px-2 py-1 rounded text-sm"
                    >
                      💾 Save
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => router.push(`/product/${product._id}`)}
                        className="bg-orange-600 text-white px-2 py-1 rounded text-sm"
                      >
                        🔗 Visit
                      </button>
                      <button
                        onClick={() => handleEditClick(index, product)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded text-sm"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="bg-red-600 text-white px-2 py-1 rounded text-sm"
                      >
                        🗑️ Delete
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProductList
