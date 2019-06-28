const {Command} = require('@oclif/command')
const utils = require('../../utils/utils')
const git = require('../../utils/git')

class VotetagCommand extends Command {
  async run() {
    const pkg = utils.readPkg()
    const currentVersion = pkg.version
    git.tag(currentVersion)
  }
}

VotetagCommand.description = 'Tag current commit with current version'

module.exports = VotetagCommand
