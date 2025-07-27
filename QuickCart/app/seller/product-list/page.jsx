'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useAppContext } from '@/context/AppContext'
import Loading from '@/components/Loading'

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

  if (loading) return <Loading />

  return (
    <div className="overflow-x-auto w-full p-4">
      <table className="w-full table-fixed text-sm text-left border-collapse min-w-[1000px]">
        <thead className="bg-gray-100 text-gray-800">
          <tr>
            <th className="px-4 py-3 w-[180px]">Name</th>
            <th className="px-4 py-3 w-[250px]">Image</th>
            <th className="px-4 py-3 w-[140px]">Category</th>
            <th className="px-4 py-3 w-[220px]">Description</th>
            <th className="px-4 py-3 w-[100px]">Price</th>
            <th className="px-4 py-3 w-[120px]">Offer Price</th>
            <th className="px-4 py-3 w-[180px]">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {products.map((product, index) => (
            <tr key={product._id} className="border-t">
              {/* Product Name */}
              <td className="p-3 align-top">
                {editIndex === index ? (
                  <input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    className="border px-2 py-1 rounded text-sm w-full"
                    placeholder="Product Name"
                  />
                ) : (
                  <span className="font-medium text-gray-900">
                    {product.name}
                  </span>
                )}
              </td>

              {/* Images */}
              <td className="p-3 align-top">
                {editIndex === index ? (
                  <div className="grid grid-cols-2 gap-2">
                    {[0, 1, 2, 3].map((i) => (
                      <div key={i} className="flex flex-col items-start gap-1">
                        {product.images[i] && (
                          <img
                            src={`http://localhost:8008/${product.images[i]}`}
                            alt={`product-${i}`}
                            className="w-14 h-14 object-cover rounded border"
                          />
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const files = [...newImages]
                            files[i] = e.target.files[0]
                            setNewImages(files)
                          }}
                          className="text-[10px] w-full"
                        />
                        {newImages[i] && (
                          <img
                            src={URL.createObjectURL(newImages[i])}
                            alt={`new-preview-${i}`}
                            className="w-10 h-10 rounded border object-cover mt-1"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex gap-1 flex-wrap">
                    {product.images.map((image, i) => (
                      <img
                        key={i}
                        src={`http://localhost:8008/${image}`}
                        alt={`product-${i}`}
                        className="w-10 h-10 object-cover rounded border"
                      />
                    ))}
                  </div>
                )}
              </td>

              {/* Category */}
              <td className="p-3 align-top">
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
              <td className="p-3 align-top">
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
              <td className="p-3 align-top">
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
              <td className="p-3 align-top">
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
              <td className="p-3 align-top">
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
