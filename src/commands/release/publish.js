const {Command} = require('@oclif/command')

const configfolder = require('../../utils/configfolder')
const npm = require('../../utils/npm')

const path = require('path')
const fs = require('fs')

class PublishCommand extends Command {
  async run() {
    const {args} = this.parse(PublishCommand)
    const releaseName = args.releaseName
    const otp = args.otp || null
    this.log(`Publishing ${releaseName} from dist-release to npm (with otp: '${otp}'):`)

    // update svn repo
    const distReleasePath = await configfolder.makeSureDistIsCheckedOutAndUpdated('release')

    // check if files for releaseName exists in dist/release
    // check if folder for releaseName exists in dist/dev
    const releaseArchive = releaseName + '.tgz'
    const releaseArchivePath = path.join(distReleasePath, 'plugins', releaseArchive)
    if (!fs.existsSync(releaseArchivePath)) {
      this.error(`The releaseName ${releaseName} you want to publish does not exist at ${releaseArchivePath}`)
    }

    // call npm publish for releaseName.tgz
    await npm.publish(releaseArchivePath, otp)
  }
}

PublishCommand.description = 'Publish the defined release to npm (from dist/release)'

PublishCommand.args = [
  {
    name: 'releaseName',
    required: true,
    description: 'name of release to publish',
  },
  {
    name: 'otp',
    required: false,
    description: 'otp token for npm publish (if required)',
  },
]

module.exports = PublishCommand
