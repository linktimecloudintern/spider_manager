const {exec} = require('shelljs')

module.exports = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, {silent: false, timeout: 10*60*1000}, (code, stdout, stderr) => {
      resolve({code, stdout, stderr})
    })
  })
}