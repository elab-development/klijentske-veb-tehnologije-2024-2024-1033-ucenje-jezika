describe('Todo lista', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.getByCy('todo').should('exist');
  });

  it('ima placeholder i početnu poruku', () => {
    cy.getByCy('todo-input').should('have.attr', 'placeholder', 'Add task…');
    cy.contains('No tasks yet.').should('be.visible');
  });

  it('ne dodaje prazne/whitespace unose', () => {
    cy.getByCy('todo-input').type('   ');
    cy.getByCy('todo-add').click();
    cy.getByCy('todo-list').find('li').should('have.length', 1); // i dalje samo "No tasks yet."
    cy.contains('No tasks yet.').should('be.visible');
  });

  it('dodaje novi zadatak i čisti input', () => {
    cy.getByCy('todo-input').type('Buy milk');
    cy.getByCy('todo-add').click();
    cy.getByCy('todo-input').should('have.value', '');
    cy.getByCy('todo-list').find('li').should('have.length', 1);
    cy.getByCy('todo-list').contains('Buy milk').should('exist');
  });

  it('toggle checkbox menja klasu done', () => {
    cy.getByCy('todo-input').type('Task A');
    cy.getByCy('todo-add').click();
    // jedini li je novi task
    cy.getByCy('todo-list').find('li').as('item');
    cy.get('@item').should('not.have.class', 'done');
    cy.get('@item').find('input[type="checkbox"]').check({ force: true });
    cy.get('@item').should('have.class', 'done');
    cy.get('@item').find('input[type="checkbox"]').uncheck({ force: true });
    cy.get('@item').should('not.have.class', 'done');
  });

  it('briše zadatak', () => {
    // dodaj dva
    cy.getByCy('todo-input').type('X');
    cy.getByCy('todo-add').click();
    cy.getByCy('todo-input').type('Y');
    cy.getByCy('todo-add').click();

    cy.getByCy('todo-list').find('li').should('have.length', 2);
    cy.getByCy('todo-list').contains('X').parent().find('button.link').click();
    cy.getByCy('todo-list').find('li').should('have.length', 1);
    cy.getByCy('todo-list').contains('Y').should('exist');
  });
});
