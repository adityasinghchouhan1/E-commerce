'use client'
import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

const SliderManager = () => {
  const [images, setImages] = useState([])
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [updatingId, setUpdatingId] = useState(null)
  const fileInputRef = useRef(null)
  const updateFileInputs = useRef({})

  const fetchImages = async () => {
    try {
      const res = await axios.get('http://localhost:8008/api/getsliderdata')
      setImages(res.data.data)
    } catch (err) {
      console.error('Error fetching slider images:', err)
      toast.error('Failed to fetch slider images')
    }
  }

  useEffect(() => {
    fetchImages()
  }, [])

  const handleUpload = async () => {
    if (!file) return toast.error('Please select an image')

    const formData = new FormData()
    formData.append('image', file)

    try {
      setUploading(true)

      if (updatingId) {
        await axios.put(
          `http://localhost:8008/api/updateslider/${updatingId}`,
          formData
        )
        toast.success('Image updated successfully')
        setUpdatingId(null)
      } else {
        await axios.post('http://localhost:8008/api/sliderdata', formData)
        toast.success('Image uploaded successfully')
      }

      setFile(null)
      fetchImages()
    } catch (err) {
      console.error('Upload failed:', err)
      toast.error('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8008/api/deleteslider/${id}`)
      fetchImages()
      toast.success('Image deleted successfully')
    } catch (err) {
      console.error('Delete failed:', err)
      toast.error('Delete failed')
    }
  }

  const handleUpdateImage = (id, selectedFile) => {
    if (!selectedFile) return toast.error('Please select an image')

    const formData = new FormData()
    formData.append('image', selectedFile)

    setUploading(true)
    axios
      .put(`http://localhost:8008/api/updateslider/${id}`, formData)
      .then(() => {
        fetchImages()
        toast.success('Image updated successfully')
      })
      .catch((err) => {
        console.error('Update failed:', err)
        toast.error('Image update failed')
      })
      .finally(() => {
        setUploading(false)
      })
  }

  const triggerUpdateFileInput = (id) => {
    if (updateFileInputs.current[id]) {
      updateFileInputs.current[id].click()
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Slider Image Manager</h2>

      <div className="flex gap-4 items-center mb-6">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <button
          onClick={handleUpload}
          disabled={uploading}
          className="px-8 py-2.5 bg-orange-600 text-white font-medium rounded disabled:opacity-50"
        >
          {updatingId ? 'Update' : 'Upload'}
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-md">
        <table className="w-full text-left table-auto border border-gray-300">
          <thead className="bg-blue-800 text-white">
            <tr>
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border">Image</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {images.map((img, index) => (
              <tr key={img._id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">
                  <img
                    src={`http://localhost:8008/uploads/${img.image}`}
                    alt="slider"
                    className="w-32 h-20 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2 border">
                  <div className="flex gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      ref={(el) => (updateFileInputs.current[img._id] = el)}
                      style={{ display: 'none' }}
                      onChange={(e) =>
                        handleUpdateImage(img._id, e.target.files?.[0])
                      }
                    />
                    <button
                      onClick={() => triggerUpdateFileInput(img._id)}
                      className="px-4 py-1 bg-blue-600 text-white rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(img._id)}
                      className="px-4 py-1 bg-red-600 text-white rounded"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {images.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-500">
                  No slider images found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SliderManager
