import '../../setup';

describe('Accessibility Results Reports', () => {
  afterEach(function() {
    const fileName = 'accessibility_results_2.json';

    cy.accessibility().then(violations => {
      cy.readFile(fileName).then(data => {
        cy.writeFile(fileName, {
          ...data,
          [this.currentTest?.title ?? '']: violations,
        });
      });
    });
  });

  // Sign In
  it('Sign In page', () => {
    cy.visit('/signin');
    cy.injectAxe();
    cy.wait(2000);
  });

  //Sign Up
  it('Sign Up page', () =>{
    cy.visit('/signup');
    cy.injectAxe();
    cy.wait(2000);
  });

  //Password
  it('Forgot password page', () =>{
    cy.visit('/forgot-password');
    cy.injectAxe();
    cy.wait(2000);
  });

  it('Reset password page', () =>{
    cy.visit('/reset-password-submit');
    cy.injectAxe();
    cy.wait(2000);
  });

  it('Confirm Email page', () =>{
    cy.visit('/confirm-email');
    cy.injectAxe();
    cy.wait(2000);
  });

  it('Sign Up Approval page', () =>{
    cy.visit('/signup-approval');
    cy.injectAxe();
    cy.wait(2000);
  });

  it.skip('Collaborator Sign Up page', () =>{
    cy.visit('/signup-as-collaborator');
    cy.injectAxe();
    cy.wait(2000);
  });
});
