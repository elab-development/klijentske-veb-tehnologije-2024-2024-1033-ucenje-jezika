describe('Dodavanje u korpu', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('klik na Add to cart povećava broj u badge-u', () => {
    cy.getByCy('cart-count').should('have.text', '0');
    // dodamo prvi proizvod
    cy.getByCy('product-grid').find('[data-cy^="add-"]').first().click();
    cy.getByCy('cart-count').should('have.text', '1');

    // dodamo još jedan (može i drugi proizvod)
    cy.getByCy('product-grid').find('[data-cy^="add-"]').eq(1).click();
    cy.getByCy('cart-count').should('have.text', '2');
  });

  it('dodavanje radi i posle filtriranja', () => {
    cy.getByCy('search-input').type('Green');
    cy.getByCy('product-grid')
      .find('[data-cy^="add-"]')
      .should('have.length', 1)
      .click();
    cy.getByCy('cart-count').should('have.text', '1');
  });
});
