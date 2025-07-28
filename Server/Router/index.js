const express = require('express')
const Router = express.Router()
const multer = require('multer')



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

const {
  addProduct,
  getAllProducts,
  getProductsByCategory,
  deleteProduct,
  updateProduct,
  getProductbyid,
} = require('../Controller/productController')
const { upload } = require('../config/config')

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

//product

Router.post('/Product', upload.fields([
  { name: 'images', maxCount: 4 },
  { name: 'video', maxCount: 1 }
]), addProduct);
Router.get('/Productget/:id', getProductbyid)
Router.get('/Productget', getAllProducts)
Router.get('/Productget/category/:category', getProductsByCategory)
Router.delete('/Productdelete/:id', deleteProduct)
Router.put('/Productupdate/:id', upload.array('images', 4), updateProduct)

module.exports = Router
