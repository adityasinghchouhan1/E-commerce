const express = require('express')
const Router = express.Router()
const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/') // Make sure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  },
})

const upload = multer({ storage: storage })

const {
  ContectDataFunction,
  getContectData,
  DeleteContectusData,
  UpdateContectDetails,
} = require('../Controller/ContectUsController')

const {
  SliderDataController,
  getSliderData,
  deleteSliderData,
  SliderdataUpdate,
} = require('../Controller/SliderDataController')

// Contect Us Route
Router.post('/contectus', ContectDataFunction)
Router.get('/getcontectus', getContectData)
Router.delete('/deleteContect/:id', DeleteContectusData)
Router.put('/updateContectdata/:id', UpdateContectDetails)

// Slider Route
Router.post('/sliderdata', upload.single('image'), SliderDataController)
Router.get('/getsliderdata', getSliderData)
Router.delete('/deleteslider/:id', deleteSliderData)
Router.put('/updateslider/:id', upload.single('image'), SliderdataUpdate)

module.exports = Router
