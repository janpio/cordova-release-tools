const {Command} = require('@oclif/command')
const git = require('../../utils/git')

class PushCommand extends Command {
  async run() {
    // TODO Check that there are no other commits than release commit and the new tag
    // TODO Check that we are on the correct branch
    await git.push()
    await git.pushTags()
  }
}

PushCommand.description = 'Push release commit and tag'

module.exports = PushCommand
