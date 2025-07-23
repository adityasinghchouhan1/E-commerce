const SliderData = require('../Modal/SliderModel')

const SliderDataController = async (req, res) => {
  try {
    const { filename } = req.file

    const newSlider = new SliderData({
      image: filename,
    })

    await newSlider.save()

    res
      .status(201)
      .json({ status: true, message: 'Image uploaded', data: newSlider })
  } catch (error) {
    console.error('Error uploading slider image:', error)
    res.status(500).json({ status: false, message: 'Server error' })
  }
}

const getSliderData = async (req, res) => {
  try {
    const data = await SliderData.find()
    res.status(200).json({
      status: true,
      data,
      message: 'Slider data retrieved successfully',
    })
  } catch (error) {
    console.error('Error fetching slider data:', error)
    res.status(500).json({ status: false, message: 'Server error' })
  }
}

const deleteSliderData = async (req, res) => {
  try {
    const { id } = req.params
    const deletedSlider = await SliderData.findByIdAndDelete(id)

    if (!deletedSlider) {
      return res.status(404).json({
        status: false,
        message: 'Slider data not found',
      })
    }

    res.status(200).json({
      status: true,
      message: 'Slider data deleted successfully',
      data: deletedSlider,
    })
  } catch (error) {
    console.error('Server error:', error)
    res.status(500).json({
      status: false,
      message: 'Internal server error',
      error: error.message,
    })
  }
}

const SliderdataUpdate = async (req, res) => {
  try {
    const { id } = req.params

    const updateData = {}
    if (req.file) {
      updateData.image = req.file.filename
    }

    const updatedSlider = await SliderData.findByIdAndUpdate(id, updateData, {
      new: true,
    })

    if (!updatedSlider) {
      return res.status(404).json({ message: 'Slider data not found' })
    }

    res.status(200).json({
      message: 'Slider data updated successfully',
      data: updatedSlider,
    })
  } catch (err) {
    console.error('Update error:', err)
    res.status(500).json({ message: 'Internal server error' })
  }
}

module.exports = {
  SliderDataController,
  getSliderData,
  deleteSliderData,
  SliderdataUpdate,
}
