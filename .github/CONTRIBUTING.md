# Contributing

**IMPORTANT** This repository is only for Smart/Containers/Layout components. Should NOT have styling data such as "colors, fonts, etc".

## Usage

```bash
# Install dependencies
npm install

# Build 
npm run build

# Run development server with storybook
npm run storybook

# Run all tests with lint/jest
npm run test

# Run test in watch mode
npm run test:watch

# Update test snapshot
npm run test:update

# Run linter
npm run lint

# Run linter with auto fix
npm run lint:fix

# Commit files with commitizen (use this instead of git commit)
npm run cz
```
## Workflow

- Create a component in the src/components folder
- Add tests in the test/unit/ folder
- Write stories which use your component as a template in stories/index.stories.js
- Run `npm run storybook` to author your components by having a development environment
- Run lint and tests before commiting anything
- Commit using [Commit Convention](.github/COMMIT_CONVENTION.md) and push to github
- If deployment is setup correctly(see next section), your components will be available on npm and release on github :)

## Deployment

Every Pull Request should have a Link to a User Story in JIRA that backups the reason why we are pushing this changes.
To deploy, this repository needs 2 github approve from others devs and 1 of anyone on the QA Team.

DON'T FORGET TO UPDATE JIRA!

####THIS SECTION IS A DRAFT

When a PR is generated, we should create a new git Tag with the tentative version of this package (ex. 1.3.0-test, 1.3.0-rc, 1.3.0).
Git tags are bound to commits, so you can create various tags for the same commit.
If a bug is found in your code, remember to upgrade the number of the fix version. This allows us to track how many fixes happens to this Release Candidate.

If you are releasing a new feature, you should increase the minor number.
If you are releasing a fix, you should increase by 1 the fix number of the tag you are based. (ie. version to fix 1.4.3, you should add 1.4.4-test, 1.4.4-rc, etc).
If a bug is found in your fix, you should fix them and increase the number of your fix.

Only final versions must be published in releases on Yapo.cl

