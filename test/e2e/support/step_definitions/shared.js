/* eslint-disable no-undef */
const { then, given } = require('cypress-cucumber-preprocessor');


given('I open {string} page', (url) => {
  cy.visit(url);
});

given('user sees {string} in the head {string} tag', (title, tag) => {
  cy.get(`head ${tag}`)
    .should('contain', title);
});

then('has an element with the class {string}', (cssName) => {
  cy.get(`.${cssName}`)
    .should('be.visible');
});

then('has an element with the class {string} and the text {string}', (cssName, text) => {
  cy.get(`.${cssName}`)
    .should('contain', text);
});

then('i want to enter {string} in the input class {string}', (text, cssName) => {
  cy.get(`.${cssName}`)
    .type(text);
});

then('i click the element with the class {string}', (cssName) => {
  cy.get(`.${cssName}`)
    .click();
});

then('i see {string} in the element with the {string} class', (text, cssName) => {
  cy.get(`.${cssName}`)
    .should('contain', `resultado: ${text}`);
});