const db = require('../models')
const Camera = db.cameras
const P = db.P
const Op = db.Sequelize.Op;

// Kernel Function
/**
 * This function records nft_id & camera.id information to P table.
 * If id exists in P table, it will update nft_id and timestamp.
 */
exports.assignNFTToCamera = async (nft_id, camera, success_callback, error_callback) => {
  let table_index = camera.tableid;
  P[table_index].findOne({ where : { id : camera.id } })
    .then((data) => {
      if (data) {
        P[table_index].update(
          { nft_id : nft_id, timestamp : Math.floor(Date.now() / 1000)}, 
          { where : { id : camera.id } }
        ).then((data) => {
          success_callback(data);
        }).catch((err) => {
          console.log('errors occured', err);
          error_callback(err);
        });
      } else {
        P[table_index].create(
          { id : camera.id, nft_id : nft_id, timestamp : Math.floor(Date.now() / 1000)}
        ).then((data) => {
          success_callback(data);
        }).catch((err) => {
          console.log('error occured', err);
          error_callback(err);
        })
      }
    })
    .catch((err) => {
      console.log('errors occured', err);
      error_callback(err);
    });
}

exports.findFreeCamera = async (nft_id) => {
  try {
    // find already assigned video link if it is possible
    for (let i = 0; i < P.length; i++) {
      let pInfo = await P[i].findOne({ where : { nft_id }});
      if (pInfo) {
        let cameraInfo = await Camera.findOne({ where : { id : pInfo.id }});
        if (cameraInfo) {
          return {
            id : cameraInfo.id,
            link : cameraInfo.link,
            orientation : cameraInfo.orientation,
            coordinates : cameraInfo.coordinates,
            tableid : i
          }
        } else {
          console.log(`serious error: cameraInfo not exist with ${pInfo.id} in ${i}th table.`);
          return null;
        }
      } 
    }

    // We dont' find it. We need to find a new free camera.
    for (let i = 0; i < P.length; i++) {
      let column = '$' + P[i].name + '$';
      let timestamp = '$' + P[i].name + '.timestamp$';
      let ans = await Camera.findOne({
        where: {
          [Op.or] : [
            {
              [column] : null
            },
            {
              [timestamp] : {
                // we assume that if the updated timestamp is older than 1 hour, we will assign new NFT.
                [Op.lt] : Math.floor(Date.now() / 1000) - 3600 
              }
            }
          ]
        },
        include: {
          model: P[i],
          as: P[i].name,
          require: false,
        },
        order: [['id', 'ASC']],
      })
      if (ans) {
        return {
          id : ans.id,
          link : ans.link,
          orientation : ans.orientation,
          coordinates : ans.coordinates,
          tableid : i
        };
      }
    }
  } catch (err) {
    console.error('findFreeCamera', err);
  }

  return null;
}

// Restful API
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
  const { link, coordinates, orientation, id } = req.body

  if (
    link === undefined ||
    coordinates === undefined ||
    id === undefined ||
    orientation === undefined
  ) {
    res.send({
      status: 'ERR',
      message: 'Bad request',
    })
    return
  }

  Camera.update({ link, coordinates, orientation }, { where: { id } })
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
            where: { camera_id: id },
          }),
        )
      }

      Promise.all(promiseList)
        .then((values) => {
          res.send({
            status: 'OK',
            message: 'Removed Data Success!',
            camera: data,
            P: values,
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
  const { link, coordinates, orientation } = req.body

  if (
    link === undefined ||
    coordinates === undefined ||
    orientation === undefined
  ) {
    res.send({
      status: 'ERR',
      message: 'Bad request',
    })
    return
  }

  Camera.create({
    link,
    coordinates,
    orientation,
  })
    .then((data) => {
      res.send({
        status: 'OK',
        message: 'Create Success!',
        camera: data,
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

exports.onAddList = (req, res) => {
  const { linkList, coordinatesList, orientationList } = req.body

  if (
    linkList === undefined ||
    coordinatesList === undefined ||
    orientationList === undefined
  ) {
    res.send({
      status: 'ERR',
      message: 'Bad request',
      error: 'some fields are missing',
    })
    return
  }

  if (
    linkList.length != coordinatesList.length ||
    linkList.length != orientationList.length
  ) {
    res.send({
      status: 'ERR',
      message: 'Bad request',
      error: '3 arrays does not match the length.',
    })
    return
  }

  Camera.bulkCreate(
    linkList.map((item, index) => {
      return {
        link: linkList[index],
        coordinates: coordinatesList[index],
        orientation: orientationList[index],
      }
    }),
  )
    .then(() => {
      res.send({
        status: 'OK',
        message: 'Create Success!',
      })
    })
    .catch((err) => {
      console.error('Camera.create failed', err)
      res.send({
        status: 'ERR',
        message: 'onAdd Error!',
      })
    })
}
