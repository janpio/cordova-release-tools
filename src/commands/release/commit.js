const {Command} = require('@oclif/command')
const utils = require('../../utils/utils');
const git = require('../../utils/git');

class CommitCommand extends Command {
  async run() {
    const pkg = utils.readPkg();
    const currentVersion = pkg.version

    const commitMessage = `chore(release): ${currentVersion} (version string + release notes)`
    git.addAndCommit(commitMessage)
  }
}

CommitCommand.description = `Commit release changes (commits and tag)`

module.exports = CommitCommand
