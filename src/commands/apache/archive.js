const {Command} = require('@oclif/command')
const utils = require('../../utils/utils');
const git = require('../../utils/git');
const gpg = require('../../utils/gpg');
const npm = require('../../utils/npm');
const fs = require('fs')

class ArchiveCommand extends Command {
  async run() {
    // TODO: make sure gpg is available
    // TODO: is current commit also a tag?
    // TODO: is current tag of current release?
    // TODO: no pending changes?

    // archive
    const version = utils.readPkg().version
    // TODO await git.latestTag()
    const pkgName = utils.readPkg().name
    const tgzName = pkgName + '-' + version + '.tgz';
    console.log("tgzName", tgzName)

    // executil.ARGS('npm pack'), 1, false
    const filename = await npm.pack()
    // TODO Copy file to some tmp directory or create there directly
    console.log("filename", filename)

    // TODO delete previously existing .asc file
    // executil.ARGS('gpg --armor --detach-sig --output', outPath + '.asc', outPath), false, false
    console.log("gpg.armor", await gpg.armor(filename))

    // fs.writeFileSync(outPath + '.sha512', (yield computeHash(outPath, 'SHA512')) + '\n');
    const hash = await computeHash(filename, 'SHA512')
    console.log("hash", hash)
    fs.writeFileSync(filename + '.sha512', hash)

    console.log('done.')
  }
}

ArchiveCommand.description = `Creates an archive (.tar.gz, .asc, .sha) for the "current tag"`

module.exports = ArchiveCommand

const computeHash = async (path, algo) => {
  console.log('Computing ' + algo + ' for: ' + path);
  var result = await gpg.print_md(path, algo)
  return extractHashFromOutput(result);
}

function extractHashFromOutput(output) {
  return output.slice(output.lastIndexOf(':') + 1).replace(/\s*/g, '').toLowerCase();
}
