describe('Header i cart badge', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('cart badge startuje na 0', () => {
    cy.getByCy('cart-badge').within(() => {
      cy.getByCy('cart-count').should('have.text', '0');
    });
  });

  it('nav ima aria-current samo na Home', () => {
    cy.get('[data-cy="nav-home"]').should('have.attr', 'aria-current', 'page');
    cy.get('[data-cy="nav-about"]').should(
      'not.have.attr',
      'aria-current',
      'page'
    );
    cy.get('[data-cy="nav-contact"]').should(
      'not.have.attr',
      'aria-current',
      'page'
    );
  });
});
