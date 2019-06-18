const {Command, flags} = require('@oclif/command')
const utils = require('../../utils/utils')
const git = require('../../utils/git')

class PreparecommitCommand extends Command {
  async run() {
    const pkg = utils.readPkg()
    const currentVersion = pkg.version

    const commitMessage2 = `chore(release): ${currentVersion}`
    git.addAndCommit(commitMessage2)
  }
}

PreparecommitCommand.description = `Commit prepare changes (after release)`

module.exports = PreparecommitCommand
