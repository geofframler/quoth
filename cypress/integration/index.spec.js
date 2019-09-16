describe('visit quoth', () => {
  before(() => {
    cy.visit('/');
    cy.pause();
  });

  it('renders nav', () => {
    cy.get('.uk-navbar-left')
      .should('exist');
  });

  it('renders new quote form', () => {
    cy.get('.input-form-wrapper')
      .should('exist');
  });

  it('renders sort bar', () => {
    cy.get('.sort-bar')
      .should('exist');
  });

  it('renders quotes', () => {
    cy.get('#quote-list')
      .find('.quote')
      .should('exist');
  })

});