const {Command} = require('@oclif/command')
const utils = require('../../utils/utils');
const git = require('../../utils/git');

class TagCommand extends Command {
  async run() {
    const pkg = utils.readPkg();
    const currentVersion = pkg.version
    git.tag(currentVersion)
  }
}

TagCommand.description = `Tag current commit with current version`

module.exports = TagCommand
