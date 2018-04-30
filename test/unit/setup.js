import Vue from 'vue';

Vue.config.productionTip = false;

global.fetch = require('jest-fetch-mock');

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
// process.on('unhandledRejection', (err) => {
//   throw err;
// });
