describe('Authentication', () => {
  beforeEach(() => {
    cy.visit('/login'); // Navigate to the login page
  });

  it('Should display the login form', () => {
    cy.get('input#username').should('be.visible');
    cy.get('p-password input').should('be.visible'); // Adjusted for PrimeNG
    cy.get('button').contains('Sign In').should('be.visible');
  });


  it('Should show an error for invalid credentials', () => {
    cy.get('input#username').type('wronguser');

    cy.get('p-password input').should('be.visible').type('wrongpassword{enter}');

    cy.get('.alert.alert-danger', { timeout: 5000 })
      .should('be.visible')
      .and('contain', 'Login failed. Please try again');
  });


  it('Should log in successfully with valid credentials', () => {
    cy.intercept('GET', '**/auth/login*', {
      statusCode: 200,
      body: { id: '123', token: 'fakeToken123' },
    }).as('loginRequest');

    cy.visit('/login');

    cy.get('input#username').type('correctuser');

    cy.get('p-password input').should('be.visible').type('correctpassword{enter}');

    cy.wait('@loginRequest')
      .its('response.statusCode')
      .should('eq', 200);

    cy.url().should('not.include', '/login'); // Should be redirected
    cy.window().then((win) => {
      expect(win.localStorage.getItem('token')).to.eq('fakeToken123');
    });
  });


  it('Should redirect to login if accessing a protected route when not logged in', () => {
    cy.visit('/');
    cy.url().should('include', '/login');
  });

  it('Should allow access to a protected route after login', () => {
    cy.window().then((win) => {
      win.localStorage.setItem('token', 'fakeToken123');
    });

    cy.visit('/');
    cy.url().should('not.include', '/login');
  });

  it('Should log out and remove token', () => {
    cy.window().then((win) => {
      win.localStorage.setItem('token', 'fakeToken123');
    });

    cy.visit('/');
    cy.get('button').contains('Logout').click(); // Ensure there’s a logout button
    cy.window().then((win) => {
      expect(win.localStorage.getItem('token')).to.be.null;
    });

    cy.url().should('include', '/login');
  });
});
