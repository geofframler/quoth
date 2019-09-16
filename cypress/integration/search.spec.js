describe('Search Quotes', () => {
  const badSearch  = 'foobarbaz'
  const goodSearch = 'Einstein'

  before(() => {
    cy.visit('/');
  });

  it('search accepts input', () => {
    cy.get('.uk-search-input')
      .type(badSearch)
      .should('have.value', badSearch)
      .wait(500);;
  });

  it('returns no search results', () => {
    cy.get('.uk-search > .uk-button')
      .click();

    cy.get('#search-results')
      .should('contain', 'There are no results containing "foobarbaz".')
      .wait(500);
  });

  it('returns correct search results', () => {
    cy.get('.uk-search-input')
      .should('have.value', badSearch)
      .clear()
      .wait(200)
      .type(goodSearch)
      .wait(500);;

    cy.get('.uk-search > .uk-button')
      .click();

    cy.get('#search-results')
      .should('contain', goodSearch);

    cy.get('.quote')
      .should('contain', goodSearch)
      .wait(1000);
  });

  it('clears search', () => {
    cy.get('button')
      .contains('clear search')
      .click();

    cy.get('#search-results')
      .should('not.exist');
  });
});