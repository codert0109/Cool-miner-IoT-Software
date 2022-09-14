const mode = 'test';   // 'prod' or 'test'
module.exports = require(`./env.${mode}`);