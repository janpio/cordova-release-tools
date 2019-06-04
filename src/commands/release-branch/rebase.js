const {Command} = require('@oclif/command')
const git = require('../../utils/git');

class RebaseCommand extends Command {
  async run() {
    // TODO: Really release branch checked out?
    // TODO: Is this a good idea?
    git.rebase()
  }
}

RebaseCommand.description = `Rebases the currently checked out release branch onto master`

module.exports = RebaseCommand
