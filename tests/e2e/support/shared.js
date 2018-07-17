/* eslint-disable no-undef */

/**
 *
 * @param cssName
 */
export const clickElementWithClass = (cssName) => {
    cy.log(`Clicking: element with class ${cssName}`);
    cy.get(`.${cssName}`)
        .click();
};

export const checkHead = (title, tag) => {
    cy.log(`Validating: head tag ${tag} has the title ${title}`);
    cy.get(`head ${tag}`)
        .should('contain', title);
};

export const checkElementWithClass = (cssName) => {
    cy.log(`Validating: element with class ${cssName} is visible`);
    cy.get(`.${cssName}`)
        .should('be.visible');
};

export const checkElementWithClassAndText = (cssName, text) => {
    cy.log(`Validating: element with class ${cssName} contain the text ${text}`);
    cy.get(`.${cssName}`)
        .should('contain', text);
};


export const enterTextToElementByClass = (text, cssName) => {
    cy.log(`Typing: text ${text} to input with class ${cssName}`);
    cy.get(`.${cssName}`)
        .type(text);
};

export default {
    clickElementWithClass,
    checkHead,
    checkElementWithClass,
    checkElementWithClassAndText,
    enterTextToElementByClass,
};