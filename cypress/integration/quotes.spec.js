describe('crud quotes', () => {
  const quoteBody       = 'This is a test.'
  const quoteAuthor     = 'Cypress'
  const quoteSource     = 'https://cypress.com'
  const quoteBodyEdit   = 'This is a Cypress test.'
  const quoteAuthorEdit = 'Cypress Tester'
  const quoteSourceEdit = 'https://cypress.io'

  before(() => {
    cy.visit('/');
  });

  context('creates quote', function() {
    it('focuses quote body textarea on load', () => {
      cy.focused()
        .should('have.class', 'input-form-body');
    });
  
    it('body accepts input', () => {
      cy.get('.post-body')
        .type(quoteBody)
        .should('have.value', quoteBody);
    });
  
    it('author accepts input', () => {
      cy.get('.post-author')
        .type(quoteAuthor)
        .should('have.value', quoteAuthor);
    });
  
    it('has citation link', () => {
      cy.get('.source-link')
        .should('contain', 'Add Citation');
    });
  
    it('shows source input on click', () => {
      cy.get('.post-source')
        .not('be.visible');
  
      cy.get('.source-link')
        .click();
  
      cy.get('.source-link')
        .not('be.visible');
  
      cy.get('.post-source')
        .should('be.visible');
    });
  
    it('source accepts input', () => {
      cy.get('.post-source')
        .type(quoteSource)
        .should('have.value', quoteSource);
    });
  
    it('successfully posts a quote', () => {
      cy.get('form')
        .find('button')
        .contains('Add A Quote')
        .click('');
  
      cy.server();
      cy.route('POST', 'http://localhost:3001/quotes', {
        body: quoteBody,
        author: quoteAuthor,
        source: quoteSource
      })
    });
  });


  context('reads quote', function() {
    it('displays posted quote on homepage', () => {
      cy.wait(500)
        .get('.quote')
        .first()
        .find('.quote-body')
        .contains(quoteBody);
    });
  });


  context('updates quote', function() {
    it('ensures edit modal of posted quote is invisible', () => {
      cy.get('.uk-modal')
      .last()
      .not('be.visible');
    });

    it('opens edit modal of posted quote', () => {
      cy.get('.quote')
        .first()
        .find('.edit-link')
        .click();

      cy.get('.uk-modal')
        .last()
        .should('be.visible')
        .should('contain', 'Edit this ' + quoteAuthor + ' quote:');
    });

    it('edits posted quote body', () => {
      cy.get('.edit-body')
        .last()
        .should('have.value', quoteBody)
        .clear()
        .type(quoteBodyEdit)
        .should('have.value', quoteBodyEdit);
    });
  
    it('edits posted quote author', () => {
      cy.get('.edit-author')
        .last()
        .should('have.value', quoteAuthor)
        .clear()
        .type(quoteAuthorEdit)
        .should('have.value', quoteAuthorEdit);

        cy.get('.uk-modal')
        .last()
        .should('contain', 'Edit this ' + quoteAuthorEdit + ' quote:');
    });

    it('edits posted quote source', () => {
      cy.get('.edit-source')
        .last()
        .should('have.value', quoteSource)
        .clear()
        .type(quoteSourceEdit)
        .should('have.value', quoteSourceEdit);
    });

    it('submits updates and closes modal', () => {
      cy.get('.edit-submit')
        .last()
        .click();
      
      cy.get('.edit-close')
        .last()
        .click();
    });

    it('displays updated quote on homepage', () => {
      cy.get('.quote').first().contains(quoteBodyEdit);
    });
  });


  context('deletes posted quote', function() {
    it('checks that delete drop of posted quote is hidden', () => {
      cy.get('.quote')
        .first()
        .find('.delete-drop')
        .not('be.visible');
    });

    it('opens delete drop of posted quote', () => {
      cy.get('.quote')
        .first()
        .find('.delete-link')
        .click();

      cy.get('.quote')
        .first()
        .find('.delete-drop')
        .should('be.visible');
    });

    it('destroys posted quote', () => {
      cy.get('.quote')
        .first()
        .find('.delete-button')
        .contains('Yes')
        .click({ force: true });

      cy.get('.quote')
        .contains(quoteBodyEdit)
        .should('not.exist');
    });
  });
});