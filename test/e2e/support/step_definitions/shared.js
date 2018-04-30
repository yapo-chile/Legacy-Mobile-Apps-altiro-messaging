/* eslint-disable no-undef */
const { then, given } = require('cypress-cucumber-preprocessor');



given('I open {string} page', (url) => {
  cy.visit(url);
});
