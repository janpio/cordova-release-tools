const {Command} = require('@oclif/command')

const configfolder = require('../../utils/configfolder')

const path = require('path')
const fs = require('fs')
const fse = require('fs-extra')
const got = require('got')

class MoveCommand extends Command {
  async run() {
    const {args} = this.parse(MoveCommand)
    const releaseName = args.releaseName
    this.log(`Moving ${releaseName} from dist-dev to dist-release:`)

    // update svn repos
    const distDevPath = await configfolder.makeSureDistIsCheckedOutAndUpdated('dev')
    const distReleasePath = await configfolder.makeSureDistIsCheckedOutAndUpdated('release')

    // check if folder for releaseName exists in dist/dev
    const sourcePath = path.join(distDevPath, releaseName)
    if (!fs.existsSync(sourcePath)) {
      this.error(`The releaseName ${releaseName} you want to move does not exist at ${sourcePath}`)
    }

    // TODO check if there are files, and if they are all named with releaseName
    // releaseName + '.tgz'
    // releaseName + '.tgz.sha512'
    // releaseName + '.tgz.'

    // remove previous released version (extract from releaseName somehow) from dist-release/plugins
    const projectName = releaseName.replace(releaseName.substring(releaseName.lastIndexOf('-')), '')
    const pathToDelete = path.join('plugins', projectName + '*') // files
    try {
      await configfolder.removePathfromDist('release', pathToDelete)
    } catch (error) {
      if (error.stderr.includes('*\' is not under version control')) {
        // no files for path (=> no previous releases), do nothing
      } else {
        this.error(error)
      }
    }
    // TODO output what files were removed

    // move folder from dist-dev to dist-release/plugins
    const targetPath = path.join(distReleasePath, 'plugins')
    this.log('copy files: ', sourcePath, targetPath)
    fse.copySync(sourcePath, targetPath)
    // TODO output how many and which files were copied

    // svn add + commit
    await configfolder.addPathToDist('release', path.join(targetPath, projectName + '*')) // ...dist/release/project-name*
    await configfolder.commitDist('release', `Published plugins release to dist-release (${releaseName})`)

    // check if release exists on the web view of dist-release
    const url = configfolder.getDistRepoUrl('release') + 'plugins/' // trailing slash is important!
    this.log('requesting url ', url)
    const response = await got(url)
    if (response.body.includes(releaseName + '.tgz')) {
      this.log(`${releaseName + '.tgz'} is listed on ${url}`)
    } else {
      this.error(`${releaseName + '.tgz'} is not listed on ${url}. You should check what went wrong.`)
    }

    // remove published release from dist-dev
    await configfolder.makeSureDistIsCheckedOutAndUpdated('dev')
    const pathToDelete2 = releaseName // folder
    this.log('removing folder from dist-dev: ', pathToDelete2)
    await configfolder.removePathfromDist('dev', pathToDelete2)
    await configfolder.commitDist('dev', `Removing release candidates from dist-dev (${releaseName})`)
  }
}

MoveCommand.description = 'Move uploaded archive from Apache SVN dist/dev to dist/release'

MoveCommand.args = [
  {
    name: 'releaseName',
    required: true,
    description: 'name of release to move',
  },
]

module.exports = MoveCommand
