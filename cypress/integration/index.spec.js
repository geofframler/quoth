describe('Visit Quotes', () => {
  before(() => {
    cy.visit('http://localhost:3000');
  });

  it('Renders', () => {
    cy.get('h1').contains('Quotes');
  });

  it('GETs quote list from server', () => {
    cy.request('GET', 'http://localhost:3001/quotes?_sort=id&_order=desc');
  });

  it('Renders list of quotes', () => {
    cy.get('ul');
  })

});