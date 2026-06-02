describe('Newsletter forma', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.getByCy('newsletter-form').should('exist');
  });

  it('odbijanje nevalidnog emaila', () => {
    cy.getByCy('newsletter-input').type('not-an-email');
    cy.getByCy('newsletter-submit').click();
    cy.getByCy('newsletter-status').should(
      'contain.text',
      'Please enter a valid email.'
    );
  });

  it('uspešna pretplata resetuje input i prikazuje poruku', () => {
    cy.getByCy('newsletter-input').type('user@example.com');
    cy.getByCy('newsletter-submit').click();
    cy.getByCy('newsletter-status').should('contain.text', 'Subscribed!');
    cy.getByCy('newsletter-input').should('have.value', '');
  });
});
