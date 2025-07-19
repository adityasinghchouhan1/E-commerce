const SliderData = require('../Modal/SliderModel')

const SliderDataController = async (req, res) => {
  try {
    console.log('Request Body:', req.body)
    console.log('Uploaded File:', req.file)

    const title = req.body.title
    const description = req.body.description

    // Safely get the uploaded image filename
    const image = req.file?.filename || null

    if (!image || !title || !description) {
      return res.status(400).json({
        status: false,
        message: 'Missing required fields (image, title, or description)',
      })
    }
    const sliderData = new SliderData({
      image: req.file.filename, // Save as "Image" in DB
      title,
      description,
    })

    await sliderData.save() // Save to MongoDB

    res.status(200).json({
      status: true,
      message: 'Slider data saved successfully',
      data: sliderData,
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

const getSliderData = async (req, res) => {
  try {
    const sliderData = await SliderData.find()
    res.status(200).json({
      status: true,
      message: 'Slider data retrieved successfully',
      data: sliderData,
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
    const { title, description } = req.body

    const updatedSlider = await SliderData.findByIdAndUpdate(
      id,
      { title, description },
      { new: true } // return the updated document
    )

    if (!updatedSlider) {
      return res.status(404).json({ message: 'Slider data not found' })
    }

    res
      .status(200)
      .json({
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
