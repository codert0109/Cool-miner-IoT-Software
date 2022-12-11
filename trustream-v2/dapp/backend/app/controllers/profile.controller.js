const db = require('../models')
const Profile = db.profiles
const email_auth = require('./email_auth.controller')

exports.getProfile = (req, res) => {
  const address = req.get('address')

  if (address == undefined) {
    res.send({
      status: 'ERR',
      message: 'Bad request',
    })
    return
  }

  Profile.findOne({ where: { address } })
    .then((data) => {
      if (data == null) {
        res.send({
          status: 'OK',
          address,
          email: '',
          setting: '{}',
        })
      } else {
        res.send({
          status: 'OK',
          address,
          email: data.email,
          setting: data.setting,
        })
      }
    })
    .catch((err) => {
      console.error(err)
      res.send({
        status: 'ERR',
        message: 'Internal Server Error',
      })
    })
}

exports.updateEmail = (req, res) => {
  const address = req.get('address')
  const { email, code } = req.body

  if (address == null || email == null || code == null) {
    res.send({
      status: 'ERR',
      message: 'Bad request',
    })
    return
  }

  const processFunction = () => {
    Profile.findOne({ where: { address } })
      .then((data) => {
        if (data == null) {
          Profile.create({ address, email }, { where: { address } })
            .then((data) => {
              res.send({
                status: 'OK',
                message: 'Create Success',
              })
            })
            .catch((err) => {
              console.error(err)
              res.send({
                status: 'ERR',
                message: 'Internal Server Error',
              })
            })
        } else {
          Profile.update({ address, email }, { where: { address } })
            .then((data) => {
              res.send({
                status: 'OK',
                message: 'Update Success',
              })
            })
            .catch((err) => {
              console.error(err)
              res.send({
                status: 'ERR',
                message: 'Internal Server Error',
              })
            })
        }
      })
      .catch((err) => {
        console.error(err)
        res.send({
          status: 'ERR',
          message: 'Internal Server Error',
        })
      })
  }

  if (email == '') {
    processFunction()
  } else {
    email_auth.verifyCode(email, code, (status) => {
      if (status == false) {
        res.send({
          status: 'ERR',
          message: 'Email Verification Failed',
        })
      } else {
        processFunction()
      }
    })
  }
}

exports.updateSetting = (req, res) => {
  const address = req.get('address')
  const { setting } = req.body

  if (address == null || setting == null) {
    res.send({
      status: 'ERR',
      message: 'Bad request',
    })
    return
  }

  Profile.findOne({ where: { address } })
    .then((data) => {
      if (data == null) {
        Profile.create({ address, setting }, { where: { address } })
          .then((data) => {
            res.send({
              status: 'OK',
              message: 'Create Success',
            })
          })
          .catch((err) => {
            console.error(err)
            res.send({
              status: 'ERR',
              message: 'Internal Server Error',
            })
          })
      } else {
        Profile.update({ address, setting }, { where: { address } })
          .then((data) => {
            res.send({
              status: 'OK',
              message: 'Update Success',
            })
          })
          .catch((err) => {
            console.error(err)
            res.send({
              status: 'ERR',
              message: 'Internal Server Error',
            })
          })
      }
    })
    .catch((err) => {
      console.error(err)
      res.send({
        status: 'ERR',
        message: 'Internal Server Error',
      })
    })
}
