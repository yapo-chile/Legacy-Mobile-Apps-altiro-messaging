# Altiro-Seed
> Altiro-Seed is the seed project for Yapo Microsites

<!-- Badger start badges -->
[![Status of the build](https://badger.spt-engprod-pro.schibsted.io/badge/travis/Yapo/altiro-seed)](https://travis.schibsted.io/Yapo/altiro-seed) [![Testing Coverage](https://badger.spt-engprod-pro.schibsted.io/badge/coverage/Yapo/altiro-seed)](https://quality-gate.schibsted.io/#/Yapo/altiro-seed?branch=master&type=push&daterange&daterange) [![Style/Linting issues](https://badger.spt-engprod-pro.schibsted.io/badge/issues/Yapo/altiro-seed)](https://quality-gate.schibsted.io/#/Yapo/altiro-seed?branch=master&type=push&daterange&daterange) [![Badger](https://badger.spt-engprod-pro.schibsted.io/badge/flaky_tests/Yapo/altiro-seed)](https://quality-gate.schibsted.io/#/Yapo/altiro-seed) [![Badger](https://badger.spt-engprod-pro.schibsted.io/badge/quality_index/Yapo/altiro-seed)](https://quality-gate.schibsted.io/#/Yapo/altiro-seed) [![Badger](https://badger.spt-engprod-pro.schibsted.io/badge/engprod/Yapo/altiro-seed)](https://github.schibsted.io/spt-engprod/badger)
<!-- Badger end badges -->

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

# mock

to use mock you have to execute in the shell the next command:
`docker run -t -p 8089:8080 -v "$(pwd)/mock/pacts/:/app/pacts" pactfoundation/pact-stub-server -p 8080 -d pacts`