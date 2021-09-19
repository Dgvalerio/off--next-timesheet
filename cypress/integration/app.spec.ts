import routes from '../../utils/routes';

const urlGen = (url: string): string => `http://localhost:3000${url}`;

describe('Authentication', () => {
  it('should authenticate with valid credentials', () => {
    cy.visit(routes.signIn());

    cy.get('#email').type('the.static.test@mail.com');
    cy.get('#password').type('myPassword');

    cy.intercept('**/identitytoolkit/v3/relyingparty/verifyPassword?key=**').as(
      'authUser'
    );

    cy.intercept('**/identitytoolkit/v3/relyingparty/getAccountInfo?key=**').as(
      'getUser'
    );

    cy.intercept('**/_next/static/chunks/pages/**').as('next');

    cy.get('[data-cy=submit]').click();

    cy.wait('@authUser').then(({ response }) => {
      expect(response?.statusCode).be.eq(200);
      expect(response?.body).has.property('idToken');
      expect(response?.body.idToken).is.not.null;
    });

    cy.wait('@getUser').then(({ response }) => {
      expect(response?.statusCode).be.eq(200);
      expect(response?.body).has.property('users');
      expect(response?.body.users[0]).has.property('localId');
      expect(response?.body.users[0].localId).is.not.null;
    });

    cy.wait('@next');

    cy.url()
      .should('eq', urlGen('/'))
      .then(() => {
        // persist:toTimesheet
        const local = localStorage.getItem('persist:nextTimesheet');

        expect(local).is.not.null;
        if (!local) return;

        expect(JSON.parse(JSON.parse(local).profile).token).be.not.empty;
        expect(JSON.parse(JSON.parse(local).profile).user).is.not.null;
      });
  });

  it('should not authenticate with invalid credentials', () => {
    cy.visit(routes.signIn());

    cy.get('#email').type('invalid@mail.com');
    cy.get('#password').type('invalid');

    cy.intercept('**/identitytoolkit/v3/relyingparty/verifyPassword?key=**').as(
      'authUser'
    );

    cy.intercept('**/identitytoolkit/v3/relyingparty/getAccountInfo?key=**').as(
      'getUser'
    );

    cy.get('[data-cy=submit]').click();

    cy.wait('@authUser').then(({ response }) => {
      expect(response?.statusCode).be.eq(400);
      expect(response?.body).has.property('error');
      expect(response?.body.error).is.not.null;
    });

    cy.wait('@getUser').then(({ response }) => {
      // persist:toTimesheet
      const local = localStorage.getItem('persist:nextTimesheet');

      expect(local).is.not.null;
      if (!local) return;

      expect(JSON.parse(local)).has.property('profile');
      expect(JSON.parse(JSON.parse(local).profile)).has.property('token');
      expect(JSON.parse(JSON.parse(local).profile).token).be.eq('');
      expect(JSON.parse(JSON.parse(local).profile)).has.property('user');
      expect(JSON.parse(JSON.parse(local).profile).user).is.null;
    });

    cy.url().should('eq', urlGen(routes.signIn()));
  });
});

describe('Navigation', () => {
  it('should show sign-in page', () => {
    cy.visit(routes.signIn());
    cy.url().should('eq', urlGen(routes.signIn()));

    cy.get('h1').contains('Login');
  });

  it('should redirect to sign-in if not authenticated', () => {
    cy.intercept('**/_next/static/chunks/pages/sign-in.js').as('next');
    cy.visit(routes.home());

    cy.url().should('eq', urlGen(routes.home()));

    cy.get('#clock').should('have.attr', 'aria-label', 'Loading');

    cy.wait('@next');

    cy.url().should('eq', urlGen(routes.signIn()));

    cy.get('h1').contains('Login');
  });

  it('should show home page if authenticated', () => {
    const persistNextTimesheet = {
      profile:
        '{"user":{"uid":"2a5HzJ7x6fVsGKNSfhLqNhpfRfc2","email":"the.static.test@mail.com","displayName":null,"photoURL":null,"phoneNumber":null},"token":"eyJhbGciOiJSUzI1NiIsImtpZCI6ImFlNTJiOGQ4NTk4N2U1OWRjYWM2MmJlNzg2YzcwZTAyMDcxN2I0MTEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdG90aW1lc2hlZXQiLCJhdWQiOiJ0b3RpbWVzaGVldCIsImF1dGhfdGltZSI6MTYzMjAxNDUzMCwidXNlcl9pZCI6IjJhNUh6Sjd4NmZWc0dLTlNmaExxTmhwZlJmYzIiLCJzdWIiOiIyYTVIeko3eDZmVnNHS05TZmhMcU5ocGZSZmMyIiwiaWF0IjoxNjMyMDE0NTMwLCJleHAiOjE2MzIwMTgxMzAsImVtYWlsIjoidGhlLnN0YXRpYy50ZXN0QG1haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInRoZS5zdGF0aWMudGVzdEBtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.xiIWeiH8GlReiGZ0DiqcgGE44MuOvNZ70u0V6Pp5j7kLEzbXDQOR9yplQZHwlp7ytRSfVkUpk8yxKip-M-u95At9MmKU7Nt_2xeCQZMVW_X7-0PZDqp0wCXOBjQJ1xIcL358TZwGjrL1gJS4ws22qMGciSYyutKWsPD6WiC2oXhmZrsYUpWU5GVGHAbAZQSVnIcj5RASTPFSHdVQkjLOUVUju4dSrEepE8yJpvitGnIJal4COtp3PbIHQ8_cuFSuBL705ubWlIa2s0gubOAc2SMacp9teaCP1xCC8PzOp2To1v3PmwNlv9l1kRsEqBBVqsnX_cg38K-RInQV-pFJOw","settings":{"startOfWork":"07:30","workingHours":"06:00"}}',
      _persist: '{"version":-1,"rehydrated":true}',
    };

    localStorage.setItem(
      'persist:nextTimesheet',
      JSON.stringify(persistNextTimesheet)
    );

    cy.visit('/');
    cy.url().should('eq', urlGen(routes.home()));

    cy.get('h1').contains('Home');
  });

  it('should redirect to home if authenticated', () => {
    cy.intercept('**/_next/static/chunks/pages/index.js').as('next');
    const persistNextTimesheet = {
      profile:
        '{"user":{"uid":"2a5HzJ7x6fVsGKNSfhLqNhpfRfc2","email":"the.static.test@mail.com","displayName":null,"photoURL":null,"phoneNumber":null},"token":"eyJhbGciOiJSUzI1NiIsImtpZCI6ImFlNTJiOGQ4NTk4N2U1OWRjYWM2MmJlNzg2YzcwZTAyMDcxN2I0MTEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdG90aW1lc2hlZXQiLCJhdWQiOiJ0b3RpbWVzaGVldCIsImF1dGhfdGltZSI6MTYzMjAxNDUzMCwidXNlcl9pZCI6IjJhNUh6Sjd4NmZWc0dLTlNmaExxTmhwZlJmYzIiLCJzdWIiOiIyYTVIeko3eDZmVnNHS05TZmhMcU5ocGZSZmMyIiwiaWF0IjoxNjMyMDE0NTMwLCJleHAiOjE2MzIwMTgxMzAsImVtYWlsIjoidGhlLnN0YXRpYy50ZXN0QG1haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInRoZS5zdGF0aWMudGVzdEBtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.xiIWeiH8GlReiGZ0DiqcgGE44MuOvNZ70u0V6Pp5j7kLEzbXDQOR9yplQZHwlp7ytRSfVkUpk8yxKip-M-u95At9MmKU7Nt_2xeCQZMVW_X7-0PZDqp0wCXOBjQJ1xIcL358TZwGjrL1gJS4ws22qMGciSYyutKWsPD6WiC2oXhmZrsYUpWU5GVGHAbAZQSVnIcj5RASTPFSHdVQkjLOUVUju4dSrEepE8yJpvitGnIJal4COtp3PbIHQ8_cuFSuBL705ubWlIa2s0gubOAc2SMacp9teaCP1xCC8PzOp2To1v3PmwNlv9l1kRsEqBBVqsnX_cg38K-RInQV-pFJOw","settings":{"startOfWork":"07:30","workingHours":"06:00"}}',
      _persist: '{"version":-1,"rehydrated":true}',
    };

    localStorage.setItem(
      'persist:nextTimesheet',
      JSON.stringify(persistNextTimesheet)
    );

    cy.visit(routes.signIn());

    cy.url().should('eq', urlGen(routes.signIn()));

    cy.get('#clock').should('have.attr', 'aria-label', 'Loading');
    cy.wait('@next');

    cy.url().should('eq', urlGen(routes.home()));

    cy.get('h1').contains('Home');
  });
});
