'use client'
import React, { useState, useMemo } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { assets } from '@/assets/assets' // ✅ Import your placeholder image

const AddProduct = () => {
  const [files, setFiles] = useState([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('Earphone')
  const [price, setPrice] = useState('')
  const [offerPrice, setOfferPrice] = useState('')
  const [video, setVideo] = useState(null)
  const [loading, setLoading] = useState(false)

  const videoPreviewUrl = useMemo(() => {
    return video ? URL.createObjectURL(video) : null
  }, [video])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const numericPrice = parseFloat(price)
    const numericOfferPrice = parseFloat(offerPrice)

    if (numericOfferPrice >= numericPrice) {
      alert('Offer price should be less than the actual product price.')
      return
    }

    const discount =
      numericPrice && numericOfferPrice
        ? Math.round(((numericPrice - numericOfferPrice) / numericPrice) * 100)
        : 0

    const formData = new FormData()
    files.forEach((file) => formData.append('images', file))
    formData.append('name', name)
    formData.append('description', description)
    formData.append('category', category)
    formData.append('price', price)
    formData.append('offerPrice', offerPrice)
    formData.append('discount', discount)
    if (video) {
      formData.append('video', video)
    }

    try {
      setLoading(true)
      const res = await axios.post(
        'http://localhost:8008/api/Product',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      )

      if (res.data.success) {
        alert('Product added successfully')
        setFiles([])
        setName('')
        setDescription('')
        setCategory('Earphone')
        setPrice('')
        setOfferPrice('')
        setVideo(null)
      } else {
        alert('Failed to add product')
      }
    } catch (err) {
      console.error('Error uploading product:', err)
      alert('Something went wrong!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between">
      <form onSubmit={handleSubmit} className="md:p-10 p-4 space-y-5 max-w-lg">
        <div>
          <p className="text-base font-medium">Product Image</p>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {[...Array(4)].map((_, index) => (
              <label key={index} htmlFor={`image${index}`}>
                <input
                  onChange={(e) => {
                    const updatedFiles = [...files]
                    updatedFiles[index] = e.target.files[0]
                    setFiles(updatedFiles)
                  }}
                  type="file"
                  id={`image${index}`}
                  hidden
                />
                <Image
                  className="max-w-24 cursor-pointer rounded border"
                  src={
                    files[index]
                      ? URL.createObjectURL(files[index])
                      : assets.upload_area
                  }
                  alt={`Upload image ${index + 1}`}
                  width={100}
                  height={100}
                />
              </label>
            ))}
          </div>
        </div>

        <div>
          <p className="text-base font-medium">Product Video (optional)</p>
          <label htmlFor="productVideo">
            <input
              type="file"
              id="productVideo"
              accept="video/*"
              hidden
              onChange={(e) => setVideo(e.target.files[0])}
            />
            <div className="mt-2 border rounded p-2 cursor-pointer w-max">
              {videoPreviewUrl ? (
                <video
                  src={videoPreviewUrl}
                  controls
                  className="max-w-xs max-h-40 rounded"
                />
              ) : (
                <p className="text-sm text-gray-500">Click to upload a video</p>
              )}
            </div>
          </label>
        </div>

        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="product-name">
            Product Name
          </label>
          <input
            id="product-name"
            type="text"
            placeholder="Type here"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </div>

        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="product-description">
            Product Description
          </label>
          <textarea
            id="product-description"
            rows={4}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
            placeholder="Type here"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          ></textarea>
        </div>

        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              <option value="Earphone">Earphone</option>
              <option value="Headphone">Headphone</option>
              <option value="Watch">Watch</option>
              <option value="Smartphone">Smartphone</option>
              <option value="Laptop">Laptop</option>
              <option value="Camera">Camera</option>
              <option value="Accessories">Accessories</option>
              <option value="Combo">Combo</option>
            </select>
          </div>

          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="product-price">
              Product Price
            </label>
            <input
              id="product-price"
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              required
            />
          </div>

          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="offer-price">
              Offer Price
            </label>
            <input
              id="offer-price"
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              onChange={(e) => setOfferPrice(e.target.value)}
              value={offerPrice}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className={`px-8 py-2.5 text-white font-medium rounded ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600'
          }`}
          disabled={loading}
        >
          {loading ? 'Uploading, please wait...' : 'ADD'}
        </button>
      </form>
    </div>
  )
}

export default AddProduct
