const {expect, test} = require('@oclif/test')

describe('release:commit', () => {
  test
  .stdout()
  .command(['release:commit'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['release:commit', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
