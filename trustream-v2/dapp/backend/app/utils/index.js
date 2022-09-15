const nounce_length = 40;

module.exports.randomString = function(length) {
  let chars = 'abcdefghijklmnopqrstuvwxyz'
  let ret = ''

  for (let i = 0; i < length; i++)
    ret += chars[~~(Math.random() * chars.length)]
    
  return ret
}

module.exports.getRandomNounce = function() {
  return randomString(nounce_length)
}

module.exports.getRandomSessionID = function() {
  return randomString(nounce_length)
}