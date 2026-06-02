describe('App smoke tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('renderuje root i glavne sekcije', () => {
    cy.getByCy('app-root').should('exist');
    cy.getByCy('header').should('exist');
    cy.contains('Welcome').should('be.visible');
    cy.contains('Products').should('be.visible');
    cy.getByCy('footer').should('be.visible');
  });

  it('ima sticky header (vizuelno ne testiramo CSS, ali element postoji)', () => {
    cy.getByCy('header').should('be.visible');
  });

  it('navigacija ima Home/About/Contact dugmad', () => {
    cy.get('[data-cy="nav-home"]')
      .should('contain.text', 'Home')
      .and('have.attr', 'aria-current', 'page');
    cy.get('[data-cy="nav-about"]').should('contain.text', 'About');
    cy.get('[data-cy="nav-contact"]').should('contain.text', 'Contact');
  });
});
