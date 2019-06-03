const utils = require('./utils');
const fs = require('fs')
const chalk = require('chalk');

exports.updateVersionString = (action) => {
  const pkg = utils.readPkg();
  const currentVersion = pkg.version

  // remove/add -dev
  const updatedVersion = manipulateVersion(action, currentVersion)

  // exit if already removed/added
  if(currentVersion == updatedVersion) {
    throw Error('version string is already correct for action `' + action + '`: ' + currentVersion)
  }

  exports.writeVersionString(currentVersion, updatedVersion)
}

manipulateVersion = (action, version) => {
  version = version.replace('-dev', '')
  if(action == 'add')
    return version + '-dev'
  return version
}

exports.writeVersionString = (currentVersion, updatedVersion) => {
  // distribute over files
  // TODO Replace by parsing json, xml files instead of dumb string replacement
  {
    const packageType = utils.extractPackageTypeFromPackageName(utils.readPkg().name)
    if(packageType == 'plugin') {
      //
      replaceStringInFile('package.json', currentVersion, updatedVersion)
      replaceStringInFile('plugin.xml', currentVersion, updatedVersion)
      replaceStringInFile('tests/package.json', currentVersion, updatedVersion)
      replaceStringInFile('tests/plugin.xml', currentVersion, updatedVersion)
    }
  }
  // TODO Replace in first headline, that should include or be "similar enough"
  replaceStringInFile('RELEASENOTES.md', '### ' + currentVersion, '### ' + updatedVersion)
}

replaceStringInFile = (file, needle, haystack) => {
  try {
    const content = fs.readFileSync(file, 'utf8')
    const updatedContent = content.replace(needle, haystack)
    if(updatedContent == content)
      return console.warn(chalk.yellow(`- Could not replace '${needle}' with '${haystack}' in '${file}'. Please fix this file manually. Content:\n`),
        content)
    fs.writeFileSync(file, updatedContent)
    console.log(`- Replaced '${needle}' with '${haystack}' in '${file}'.`)
  } catch(ENOENT) {
    console.error(chalk.red(`- File '${file}' does not exist.`))
  }
}
