const urlGen = (url: string): string => `http://localhost:3000${url}`;

describe('Navigation', () => {
  it('should show home page', () => {
    cy.visit('/');
    cy.url().should('eq', urlGen('/'));

    cy.get('h1').contains('Home');
  });
});
