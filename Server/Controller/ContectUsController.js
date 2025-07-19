const Contectus = require('../Modal/ContectusModal')

const ContectDataFunction = async (req, res) => {
  console.log(req.body)
  try {
    const { name, mail, number, date, msg } = req.body
    const data = new Contectus({ name, mail, number, date, msg })
    await data.save()
    res.status(200).json({ message: 'Message received' })
  } catch (err) {
    console.error(err)
  }
}

const getContectData = async (req, res) => {
  try {
    const data = await Contectus.find({})
    res.status(200).json(data, { message: 'data received' })
  } catch (err) {
    console.log(err, 'error to get data')
  }
}

const DeleteContectusData = async (req, res) => {
  const { id } = req.params
  try {
    const data = await Contectus.findByIdAndDelete(id)
    res.status(200).json(data, { message: 'successfully deleted' })
  } catch (err) {
    console.log(err, 'failed to delete data')
  }
}

const UpdateContectDetails = async (req, res) => {
  const { id } = req.params
  const updateData = req.body
  try {
    const data = await Contectus.findByIdAndUpdate(id, updateData)
    if (!data) {
      return res.status(404).json({ message: 'data not found' })
    }
    res.status(200).json(data)
  } catch (err) {
    console.error(err, 'failed to update data')
  }
}

module.exports = {
  ContectDataFunction,
  getContectData,
  DeleteContectusData,
  UpdateContectDetails,
}
