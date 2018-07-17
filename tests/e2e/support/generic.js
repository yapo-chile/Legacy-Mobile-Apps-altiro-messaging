const { then, given } = require('cypress-cucumber-preprocessor');

then('has a {string} title', (title) => {
  cy.get('.title')
    .should('contain', title);
});
