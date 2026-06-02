describe('Layout i responzivnost', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('desktop: grid ima oba stuba sadržaja', () => {
    cy.viewport(1366, 900);
    cy.contains('Counter').should('be.visible');
    cy.contains('Products').should('be.visible');
    // ne testiramo tačno grid-col broj, ali proveravamo da su sekcije vidljive
  });

  it('mobile: elementi su i dalje dostupni i čitljivi', () => {
    cy.viewport(390, 844);
    cy.contains('Welcome').should('be.visible');
    cy.getByCy('product-grid').should('be.visible');
    cy.getByCy('todo').should('be.visible');
  });
});
