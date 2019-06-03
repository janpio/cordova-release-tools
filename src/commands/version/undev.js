const {Command} = require('@oclif/command')
const version = require('../../utils/version')

class UndevCommand extends Command {
  async run() {
    version.updateVersionString('remove')
  }
}

UndevCommand.description = `Removes the -dev suffix from version strings`

module.exports = UndevCommand
