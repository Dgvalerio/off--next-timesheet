const urlGen = (url: string): string => `http://localhost:3000${url}`;

describe('Navigation', () => {
  it('should show home page', () => {
    cy.visit('/');

    cy.get('h1').contains('Welcome to Next.js!');

    cy.url().should('eq', urlGen('/'));
  });
});
