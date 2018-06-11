# Altiro-Seed
> Altiro-Seed is the seed project for Yapo Microsites

<!-- Badger start badges -->
[![Status of the build](https://badger.spt-engprod-pro.schibsted.io/badge/travis/Yapo/altiro-seed)](https://travis.schibsted.io/Yapo/altiro-seed) [![Testing Coverage](https://badger.spt-engprod-pro.schibsted.io/badge/coverage/Yapo/altiro-seed)](https://quality-gate.schibsted.io/#/Yapo/altiro-seed?branch=master&type=push&daterange&daterange) [![Style/Linting issues](https://badger.spt-engprod-pro.schibsted.io/badge/issues/Yapo/altiro-seed)](https://quality-gate.schibsted.io/#/Yapo/altiro-seed?branch=master&type=push&daterange&daterange) [![Badger](https://badger.spt-engprod-pro.schibsted.io/badge/flaky_tests/Yapo/altiro-seed)](https://quality-gate.schibsted.io/#/Yapo/altiro-seed) [![Badger](https://badger.spt-engprod-pro.schibsted.io/badge/quality_index/Yapo/altiro-seed)](https://quality-gate.schibsted.io/#/Yapo/altiro-seed) [![Badger](https://badger.spt-engprod-pro.schibsted.io/badge/karma/Yapo/altiro-seed)](https://confluence.schibsted.io/display/EP/KarmaChameleon#KarmaChameleon-WhatarethecurrentBadgesgeneratedbyKarmaChameleon?) [![Badger](https://badger.spt-engprod-pro.schibsted.io/badge/engprod/Yapo/altiro-seed)](https://github.schibsted.io/spt-engprod/badger)
<!-- Badger end badges -->

This repository is only for Container Components, Routing, Data manipulation and Domain.
Presentational components or code that apply styles others than layout should not be pushed nor commited to this repository.

## Getting Started

The following are the necessary steps to create a new repository based on this.

1. Fork this project.
2. Change the name in package.json
3. Change the name in README.md
4. Change the name in .travis.yml
5. Change the name in build/deploy/default.conf

## Build Setup

``` bash
# install dependencies
yarn install

# serve with hot reload at localhost:8080
yarn dev

# build for production with minification
yarn build

# build for production and view the bundle analyzer report
yarn build --report

# run unit tests
yarn unit

# run e2e tests
yarn e2e

# run all tests
yarn test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

We are using standard-release, see https://github.com/conventional-changelog/standard-version for more information.
