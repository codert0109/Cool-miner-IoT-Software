const nounce_length = 40;

function randomString(length) {
  let chars = 'abcdefghijklmnopqrstuvwxyz'
  let ret = ''

  for (let i = 0; i < length; i++)
    ret += chars[~~(Math.random() * chars.length)]
    
  return ret
}

function getRandomNounce() {
  return randomString(nounce_length)
}

function getRandomSessionID() {
  return randomString(nounce_length)
}

module.exports = {
  randomString,
  getRandomNounce,
  getRandomSessionID,
  nounce_length
};