const {Command} = require('@oclif/command')
const utils = require('../../utils/utils');
const git = require('../../utils/git');

class CheckoutCommand extends Command {
  async run() {
    const pkg = utils.readPkg();
    const currentVersion = pkg.version

    // TODO: Extract
    const versionParts = currentVersion.split('.')
    versionParts[2] = 'x'
    const releaseBranch = versionParts.join('.')

    console.log("Checking out release branch:", releaseBranch)
    git.checkout(releaseBranch)
  }
}

CheckoutCommand.description = `Checks out the release branch for the current version`

module.exports = CheckoutCommand
