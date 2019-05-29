const {Command, flags} = require('@oclif/command')
const git = require('../utils/git');
const utils = require('../utils/utils');
const fs = require('fs')

class UpdateReleaseNotesCommand extends Command {
  static description = `Update the project's \`RELEASENOTES.md\` with the relevant commits`
  async run() {
    exports.updateReleaseNotes()
  }
}

module.exports = UpdateReleaseNotesCommand

exports.updateReleaseNotes = async () => {
  // get latest tag
  const latestTag = await git.latestTag()
  // get commits
  const log = await git.commitLogFromRevision(latestTag);
  // link pullrequests and issues
  const releaseNotes = utils.createReleaseNotes(log);
  // get version
  const version = utils.readPkg().version
  // get date
  const dateArray = new Date().toDateString().split(' ');
  const date = dateArray[1] + ' ' + dateArray[2] + ', ' + dateArray[3]
  // construct string
  const markdown = `### ${version} (${date})

${releaseNotes}`
  
  // read current file
  const currentReleasenotes = fs.readFileSync('RELEASENOTES.md', 'utf8')
  // add markdown above first ### headline
  const headlinePosition = currentReleasenotes.indexOf('### ')
  const updatedReleaseNotes = currentReleasenotes.substr(0, headlinePosition) + markdown + '\n\n' + currentReleasenotes.substr(headlinePosition)
  // write file back
  fs.writeFileSync('RELEASENOTES.md', updatedReleaseNotes)

  console.log("`RELEASENOTES.md` successfully updated.")
  console.log("You can manually curate the entries now.")
}