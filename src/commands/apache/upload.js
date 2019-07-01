const {Command} = require('@oclif/command')

const utils = require('../../utils/utils')
const configfolder = require('../../utils/configfolder')

const path = require('path')
const fs = require('fs')

class UploadCommand extends Command {
  async run() {
    const distCheckoutpath = await configfolder.makeSureDistIsCheckedOutAndUpdated()

    const version = utils.readPkg().version
    const pkgName = utils.readPkg().name
    const releaseName = pkgName + '-' + version
    const tgzName = releaseName + '.tgz'

    // copy files to correct location
    const targetPath = path.join(distCheckoutpath, releaseName)
    if (!fs.existsSync(targetPath)) fs.mkdirSync(targetPath)
    fs.copyFileSync(tgzName, path.join(targetPath, tgzName))
    fs.copyFileSync(tgzName + '.sha512', path.join(targetPath, tgzName + '.sha512'))
    fs.copyFileSync(tgzName + '.asc', path.join(targetPath, tgzName + '.asc'))
    // TODO remove files after they were copied
    await configfolder.addFolderToDist(releaseName)
    await configfolder.commitDist(`Uploading release candidates for plugins release (${releaseName})`)
  }
}

UploadCommand.description = 'Upload archive to Apache SVN dist/dev'

module.exports = UploadCommand
