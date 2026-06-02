describe('Counter komponenta', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.getByCy('counter').should('exist');
  });

  it('startuje na 0', () => {
    cy.getByCy('counter').find('[data-cy="value"]').should('have.text', '0');
  });

  it('povećava i smanjuje vrednost', () => {
    cy.getByCy('counter').find('[data-cy="inc"]').click().click();
    cy.getByCy('counter').find('[data-cy="value"]').should('have.text', '2');

    cy.getByCy('counter').find('[data-cy="dec"]').click();
    cy.getByCy('counter').find('[data-cy="value"]').should('have.text', '1');
  });

  it('reset vraća na 0', () => {
    cy.getByCy('counter').find('[data-cy="inc"]').click().click().click();
    cy.getByCy('counter').find('[data-cy="reset"]').click();
    cy.getByCy('counter').find('[data-cy="value"]').should('have.text', '0');
  });
});
