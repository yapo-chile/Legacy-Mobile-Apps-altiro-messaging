const _ = require('lodash');
const sv = require('../support/shared');

let url = 'http://localhost:8080/altiro-seed/generic';
beforeEach(() => {
    const envUrl = Cypress.env('BASE_URL');
    url = _.isEmpty(envUrl) ? url : envUrl;
    cy.visit(url);
    sv.checkHead('altiro-seed', 'title');
});

describe('feature/generic', () => {
    it('I want to check that all elements are visible', () => {
        sv.checkElementWithClassAndText('title', 'Bienvenido a sitio genérico');
        sv.checkElementWithClass('generic-input');
        sv.checkElementWithClass('generic-button');
        sv.checkElementWithClass('generic-result');
    });

    it('Interact with generic website', () => {
        const textToValidate = 'this is a test';
        sv.enterTextToElementByClass(textToValidate, 'generic-input');
        sv.checkElementWithClassAndText('generic-result', 'resultado: hola');
        sv.clickElementWithClass('generic-button');
        sv.checkElementWithClassAndText('generic-result', `resultado: ${textToValidate}`);
    });
});