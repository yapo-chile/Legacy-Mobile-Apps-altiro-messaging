# Altiro-Seed
> Altiro-Seed is the seed project for Yapo Microsites

This repository is only for Container Components, Routing, Data manipulation and Domain.
Presentational components or code that apply styles others than layout should not be pushed nor commited to this repository.

## Getting Started

The following are the necessary steps to create a new repository based on this.

1. Download this project as a zip.
1. Remove .git folder
1. Change the name in package.json
1. Change the name in README.md
1. Change the name in .travis.yml
1. Change the name in build/deploy/default.conf

## Build Setup

``` bash
# install dependencies
yarn add

# serve with hot reload at localhost:8080
yarn serve

# build for production with minification
yarn build

# build for production and view the bundle analyzer report
yarn build --report

# run tslint
yarn lint

# run tslint and fix issues
yarn lint --fix

# run unit tests
yarn test:unit

# run e2e tests
yarn test:e2e
```

For detailed explanation on how things work, checkout the [guide](https://cli.vuejs.org/).

We are using standard-release, see https://github.com/conventional-changelog/standard-version for more information.
