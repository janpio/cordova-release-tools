const {Command} = require('@oclif/command')
const utils = require('../../utils/utils');
const git = require('../../utils/git');

class CommitCommand extends Command {
  async run() {
    const pkg = utils.readPkg();
    const currentVersion = pkg.version

    const commitMessage = `chore(release): release notes for ${currentVersion}`
    git.addAndCommit(commitMessage, ['RELEASENOTES.md'])

    const commitMessage2 = `chore(release): ${currentVersion} (version string)`
    git.addAndCommit(commitMessage2)
  }
}

CommitCommand.description = `Commit release changes (commits and tag)`

module.exports = CommitCommand
