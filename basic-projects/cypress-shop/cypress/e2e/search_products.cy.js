describe('Pretraga proizvoda', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('po defaultu prikazuje 4/4 proizvoda', () => {
    cy.getByCy('product-count').should('contain.text', 'Showing 4 / 4');
    cy.getByCy('product-grid')
      .find('[data-cy^="product-"]')
      .should('have.length', 4);
  });

  it('filtrira po nazivu (npr. "Blue")', () => {
    cy.getByCy('search-input').type('Blue');
    cy.getByCy('product-count').should('contain.text', 'Showing 1 / 4');
    cy.getByCy('product-grid')
      .find('[data-cy^="product-"]')
      .should('have.length', 1)
      .first()
      .contains('Blue Mug');
  });

  it('filtrira po tagu (npr. "home")', () => {
    cy.getByCy('search-input').type('home');
    cy.getByCy('product-count').should('contain.text', 'Showing 2 / 4');
    cy.getByCy('product-grid')
      .find('[data-cy^="product-"]')
      .should('have.length', 2);
  });

  it('prikazuje "No products." kada nema rezultata', () => {
    cy.getByCy('search-input').type('zzz-not-found');
    cy.contains('No products.').should('be.visible');
  });

  it('Clear dugme čisti pretragu i vraća sve proizvode', () => {
    cy.getByCy('search-input').type('Red');
    cy.getByCy('search-clear').click();
    cy.getByCy('search-input').should('have.value', '');
    cy.getByCy('product-count').should('contain.text', 'Showing 4 / 4');
  });
});
