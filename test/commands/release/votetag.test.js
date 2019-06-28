const {expect, test} = require('@oclif/test')

describe('release:votetag', () => {
  test
  .stdout()
  .command(['release:votetag'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['release:votetag', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
