describe('Post a Quote', () => {
    before(() => {
      cy.visit('/');
    });

    it('Posts a quote', () => {
      cy.get('[name="body"]').type('This is a test.');
      cy.get('[name="author"]').type('Cypress');
      cy.get('[name="source"]').type('https://cypress.io');
      cy.get('form').contains('Add Quote').click('');
    });

    it('Checks server for quote', () => {
      cy.request('POST', 'http://localhost:3001/quotes', {
      body: 'This is a test.',
      author: 'Cypress',
      source: 'https://cypress.io'
      });
    });

    it('Renders quote on homepage', () => {
      cy.get('li').first().contains('This is a test.');
    });

  });
  