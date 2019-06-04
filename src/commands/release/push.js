const {Command} = require('@oclif/command')
const git = require('../../utils/git');

class PushCommand extends Command {
  async run() {
    // TODO Check that there are not other commits than release commit and the new tag
    // TODO Check that we are on the correct branch
    git.push()
  }
}

PushCommand.description = `Push release commit and tag`

module.exports = PushCommand
