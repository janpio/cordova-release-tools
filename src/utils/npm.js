'use strict'
const execa = require('execa')

exports.pack = async () => execa.stdout('npm', ['pack'])

exports.publish = async (filePath, otp) => {
  let command = ['publish', filePath]
  if (otp) {
    command = command.concat(['--otp', otp])
  }
  return execa.stdout('npm', command)
}
