const {expect, test} = require('@oclif/test')

describe('update-release-notes', () => {
  test
  .stdout()
  .command(['update-release-notes'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['update-release-notes', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
