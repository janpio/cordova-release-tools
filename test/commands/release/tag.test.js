const {expect, test} = require('@oclif/test')

describe('release:tag', () => {
  test
  .stdout()
  .command(['release:tag'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['release:tag', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
