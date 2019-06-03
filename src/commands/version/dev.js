const {Command} = require('@oclif/command')
const version = require('../../utils/version')

class DevCommand extends Command {
  async run() {
    version.updateVersionString('add')
  }
}

DevCommand.description = `Adds the -dev suffix to version strings`

module.exports = DevCommand
