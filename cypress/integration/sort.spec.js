describe('Sort Quotes', () => {
  before(() => {
    cy.visit('/');
  });

  it('sorts new to old by default', () => {
    cy.get('#sort-select')
      .should('have.value', 'id&_order=desc');
  });

  it('sorts old to new', () => {
    cy.get('#sort-select')
    .select('id&_order=asc');

    cy.get('.sort-button')
      .click();

    cy.get('.quote')
      .first()
      .should('have.id', 'quote-1')
  });

  it('sorts author a-z', () => {
    cy.get('#sort-select')
    .select('author&_order=asc');

    cy.get('.sort-button')
      .click();

    cy.get('.quote-author').should(($author) => {
      expect($author.get(0).innerText).to.contain('- A')
    });
  });

  it('sorts author z-a', () => {
    cy.get('#sort-select')
    .select('author&_order=desc');

    cy.get('.sort-button')
      .click();

    cy.get('.quote-author').should(($author) => {
      expect($author.get(0).innerText).to.contain('- Z')
    });
  });

  it('sorts new to old again', () => {
    cy.get('#sort-select')
      .select('id&_order=desc');

    cy.get('.sort-button')
      .click();

    cy.get('.quote')
      .first()
      .not('have.id', 'quote-1')
  });
});