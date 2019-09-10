describe('Post a Quote', () => {
  const quoteBody = 'This is a test.'
  const quoteAuthor = 'Cypress'
  const quoteSource = 'https://cypress.io'

  beforeEach(() => {
    cy.visit('/');
  });

  it('focuses quote body textarea on load', () => {
    cy.focused()
      .should('have.class', 'quote-form-body')
  });

  it('accepts input', () => {
    cy.get('.quote-form-body')
    .type(quoteBody)
    .should('have.value', quoteBody)
  });

  it('successfully posts a quote to server', () => {
    cy.get('.quote-form-body')
      .type(quoteBody);
    cy.get('.quote-form-author')
      .type(quoteAuthor);
    cy.get('.quote-form-source')
      .type(quoteSource);
    cy.get('form')
      .contains('Add Quote').click('');
  
    cy.server()
    cy.route('POST', 'http://localhost:3001/quotes', {
      body: quoteBody,
      author: quoteAuthor,
      source: quoteSource
    })
  })

  it('displays quote on homepage', () => {
    cy.get('li').first().contains(quoteBody);
  })
})