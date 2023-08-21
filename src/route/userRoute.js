const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const UserModel = require('../model/userModel')
const jwt = require('jsonwebtoken')

userRouter.post('/signup', async (req, res) => {
    const { email, password } = req.body
    const already = await UserModel.find({ email })
    if (already.length > 0) {
        res.status(200).send({ msg: 'this user alredy registered plese login' })
    } else {
        try {
            bcrypt.hash(password, 5, async (err, hash) => {
                if (err) {
                    res.status(400).send({ err: err })
                } else {
                    const user = new UserModel({ email, password: hash })
                    await user.save()
                    res.status(200).send({ msg: 'user successfully registered' })
                }
            })
        } catch (error) {
            res.status(400).send({ err: error })
        }
    }

})

userRouter.post('/login', async (req, res) => {
    const { email, password } = req.body
    const user = await UserModel.find({ email })
    if (!user) {
        res.status(400).send({ msg: 'please registed' })
    } else {
        try {
            bcrypt.compare(user[0].password, password, async (err, result) => {
                if (err) {
                    res.status(400).send({ err: err })
                } else {
                    token = jwt.sign({ userId: user[0]._id }, 'doctor')
                    res.status(200).send({ msg: 'user successfully loggedin', token, token })
                }
            })
        } catch (error) {
            res.status(400).send({ err: error })
        }
    }
})

module.exports = userRouter