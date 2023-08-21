const DoctorModel = require('../model/doctorModel')

const doctorRouter = require('express').Router()


doctorRouter.post('/appointments', async (req, res) => {
    const { name, image, specialization, experience, location, date, slots, fee } = req.body
    try {
        const appoint = new DoctorModel({ name, image, specialization, experience, location, date, slots, fee })
        await appoint.save()
        res.status(200).send({ msg: 'successfull' })
    } catch (error) {
        res.status(400).send({ err: error })
    }
})

doctorRouter.get('/appointments', async (req, res) => {
    const { filter, search, sort } = req.query
    const query = {}
    try {
        if (filter) {
            query.specialization = filter
        } else if (search) {
            query.name = search
        }
        if (sort) {
            const data = await DoctorModel.find(query).sort({createdAt:sort})
            res.status(200).send({ data })
        } else {
            const data = await DoctorModel.find(query)
            res.status(200).send({ data })
        }
    } catch (error) {
        res.status(400).send({ err: error })
    }
})


// doctorRouter.get('/sort', async (req, res) => {
//     const { sort } = req.query
//     try {
//         const data = await DoctorModel.find().sort({ : sort })
//         res.status(200).send({ data })
//     } catch (error) {
//         res.status(400).send({ err: error })
//     }
// })

doctorRouter.patch('/appointments/:id', async (req, res) => {
    const { id } = req.params
    try {
        const data = await DoctorModel.findByIdAndUpdate(id , req.body,{new:true})
        res.status(200).send({ data })
    } catch (error) {
        res.status(400).send({ err: error })
    }
})

doctorRouter.delete('/appointments/:id', async (req, res) => {
    const { id } = req.params
    try {
        const data = await DoctorModel.findByIdAndDelete(id,{new:true})
        res.status(200).send({ data })
    } catch (error) {
        res.status(400).send({ err: error })
    }
})



module.exports = doctorRouter