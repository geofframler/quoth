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
    cy.get('.post-body')
      .type(quoteBody);
    cy.get('.post-author')
      .type(quoteAuthor);
    cy.get('form')
      .contains('Add A Quote').click('');
  
    cy.server()
    cy.route('POST', 'http://localhost:3001/quotes', {
      body: quoteBody,
      author: quoteAuthor,
      source: quoteSource
    })
  })

  it('displays quote on homepage', () => {
    cy.get('.quote').first().contains(quoteBody);
  })
})