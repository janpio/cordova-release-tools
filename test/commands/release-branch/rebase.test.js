const {expect, test} = require('@oclif/test')

describe('release-branch:rebase', () => {
  test
  .stdout()
  .command(['release-branch:rebase'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['release-branch:rebase', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
