const {Command} = require('@oclif/command')
const version = require('../../utils/version')

class BumpCommand extends Command {
  async run() {
    version.bumpVersionString()
  }
}

BumpCommand.description = `Bump all version strings`

module.exports = BumpCommand
