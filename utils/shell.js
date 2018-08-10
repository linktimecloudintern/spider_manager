const {exec} = require('shelljs')

module.exports = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, {silent: false}, (code, stdout, stderr) => {
      resolve({code, stdout, stderr})
    })
  })
}