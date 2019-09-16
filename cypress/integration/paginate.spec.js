describe('Paginate Quotes', () => {
  const timeout = 100;

  before(() => {
    cy.visit('/');
  });

  it('displays 20 quotes per page by default', () => {
    cy.get('#per-page-select')
      .should('have.value', '20');
  });

  it('displays 50 quotes per page', () => {
    cy.get('#per-page-select')
      .select('50')
      .wait(timeout);

    cy.get('#quote-list')
      .find('.quote')
      .its('length')
      .should('be.lte', 50);
  });

  it('displays 20 quotes per page again', () => {
    cy.get('#per-page-select')
      .select('20')
      .wait(timeout);

    cy.get('#quote-list')
      .find('.quote')
      .its('length')
      .should('be.lte', 20);
  });

  it('displays 10 quotes per page', () => {
    cy.get('#per-page-select')
      .select('10')
      .wait(timeout);

    cy.get('#quote-list')
      .find('.quote')
      .its('length')
      .should('be.lte', 10);
  });

  it('displays proper page number in label', () => {
    cy.get('.page-label')
      .contains('Page 1');

    cy.get('#page-link-2 > button').first()
      .click()
      .get('.page-label')
      .contains('Page 2');
    
    cy.get('#page-link-1 > button').first()
      .click()
      .get('.page-label')
      .contains('Page 1');
  });

  it('clicks through each page link', () => {
    cy.get('#next-icon').first()
      .prevUntil('#page-link-1')
      .find('button')
      .each(function ($link) {
        cy.wrap($link)
          .click()
          .wait(timeout);
      });
  });

  it('clicks through all pages using previous icon', () => {
    cy.get('#page-links').first()
      .find('li').last()
      .prevUntil('#previous-icon')
      .each(function () {
        cy.get('#previous-icon > button').first()
          .click()
          .wait(timeout);
      });
  });

  it('clicks through all pages using next icon', () => {
    cy.get('#page-links').first()
      .find('#next-icon')
      .prevUntil('#page-link-1')
      .each(function () {
        cy.get('#next-icon > button').first()
          .click()
          .wait(timeout);
      });
  });
});