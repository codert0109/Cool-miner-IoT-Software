const db = require('../models')
const Camera = db.cameras
const P = db.P

exports.onGet = (req, res) => {
  Camera.findAll()
    .then((data) => {
      res.send({
        status: 'OK',
        message: {
          data,
        },
      })
    })
    .catch((err) => {
      console.error('Camera.onGet failed', err)
      res.send({
        status: 'ERR',
        message: 'Bad request',
      })
    })
}

exports.onUpdate = (req, res) => {
  const { link, coordinates, id } = req.body

  if (link === undefined || coordinates === undefined || id === undefined) {
    res.send({
      status: 'ERR',
      message: 'Bad request',
    })
    return
  }

  Camera.update({ link, coordinates }, { where: { id } })
    .then((data) => {
      res.send({
        status: 'OK',
        message: 'Update Success!',
        data: data,
      })
    })
    .catch((err) => {
      console.log('Camera.onUpdate failed', err)
      res.send({
        status: 'ERR',
        message: 'Update Failed',
      })
    })
}

exports.onRemove = (req, res) => {
  const { id } = req.body

  if (id === undefined) {
    res.send({
      status: 'ERR',
      message: 'Bad request',
    })
    return
  }

  Camera.destroy({ where: { id } })
    .then((data) => {
      let promiseList = []

      for (let i = 0; i < P.length; i++) {
        promiseList.push(
          P[i].destroy({
            where : { camera_id: id },
          }),
        )
      }

      Promise.all(promiseList)
        .then((values) => {
          res.send({
            status: 'OK',
            message: 'Removed Data Success!',
            camera : data,
            P : values
          })
        })
        .catch((err) => {
          console.error('Camera.remove failed', err)
          res.send({
            status: 'ERR',
            message: 'Remove Error!',
          })
        })      
    })
    .catch((err) => {
      console.error('Camera.destroy failed', err)
      res.send({
        status: 'ERR',
        message: 'Remove Failed!',
      })
    })
}

exports.onAdd = (req, res) => {
  const { link, coordinates } = req.body

  if (link === undefined || coordinates === undefined) {
    res.send({
      status: 'ERR',
      message: 'Bad request',
    })
    return
  }

  Camera.create({
    link,
    coordinates,
  })
    .then((data) => {
      let promiseList = []

      for (let i = 0; i < P.length; i++) {
        promiseList.push(
          P[i].create({
            camera_id: data.id,
          }),
        )
      }

      Promise.all(promiseList)
        .then((values) => {
          res.send({
            status: 'OK',
            message: 'Create Success!',
            camera: data,
            P: values,
          })
        })
        .catch((err) => {
          console.error('Camera.create failed', err)
          res.send({
            status: 'ERR',
            message: 'onAdd Error!',
          })
        })
    })
    .catch((err) => {
      console.error('Camera.create failed', err)
      res.send({
        status: 'ERR',
        message: 'Cannot create',
      })
    })
}
