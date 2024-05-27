import '../setup';
import Chance from 'chance';

const chance = new Chance();

describe('Organization Feature', () => {
  const activeOrgTitle = `E2E ${chance.company()}`;
  const activeOrgDomain = `${chance.domain()}`;
  const draftOrgTitle = `E2E ${chance.company()}`;
  const draftOrgDomain = `${chance.domain()}`;
  const editOrgTitle = `E2E edit ${chance.company()}`;
  const inviteUserName = `${chance.name().replace(/\s/g,'')
    .toLowerCase()}`;

  const inviteUserEmail = `${inviteUserName}${'@'}${activeOrgDomain}`;

  beforeEach(() => {
    cy.visit('/');

    cy.signIn({
      login: Cypress.env('adminEmail'),
      password: Cypress.env('adminPassword'),
      acceptCookies: true,
    });
  });

  it('C4252 - Ensure that the Admin is able to create the organization', () => {
    cy.get('[data-cy="app-sidebar-admin"]')
      .click();

    cy.get('[data-cy="organizations-tab"]')
      .click();

    cy.get('[data-cy="add-organization-button"]')
      .click();

    cy.get('[data-cy="organization-name"]')
      .type(activeOrgTitle)
      .should('have.value', activeOrgTitle);

    cy.get('[data-cy="create-domain"]')
      .first()
      .type(activeOrgDomain);

    cy.get('[data-cy="create-org-button"]')
      .click();

    cy.contains(activeOrgTitle)
      .should('be.visible');

    cy.contains(activeOrgDomain)
      .should('be.visible');

    cy.get('[data-cy="search-org-input"]')
      .type(activeOrgTitle);

    cy.get('[data-cy="org-badge"]')
      .should('have.length', 1)
      .contains('Active');

    cy.get('[data-cy="org-link"]')
      .should('have.length', 1)
      .click();

    cy.get('[data-cy="org-title-view"]')
      .should('have.text', activeOrgTitle);

    cy.get('[data-cy="org-badge"]')
      .contains('Active');

  });

  it('C4268 - Ensure that the Admin is able to create the organization draft', () => {
    cy.visit('/admin-portal/organizations');

    cy.get('[data-cy="add-organization-button"]')
      .click();

    cy.get('[data-cy="organization-name"]')
      .type(draftOrgTitle)
      .should('have.value', draftOrgTitle);

    cy.get('[data-cy="form-select-org"]')
      .click({ force: true })
      .wait(2000)
      .get('.q-menu .q-item')
      .eq(1)
      .click();

    cy.get('[data-cy="create-domain"]')
      .first()
      .type(draftOrgDomain);

    cy.get('[data-cy="create-org-button"]')
      .click();

    cy.contains(draftOrgTitle)
      .should('be.visible');

    cy.contains(draftOrgDomain)
      .should('be.visible');

  });

  it('C4268 - Ensure that the Admin is able to delete the organization', () => {
    cy.intercept('GET', '/organizations/*').as('getOrganizations');

    cy.visit('/admin-portal/organizations');

    cy.get('[data-cy="search-org-input"]')
      .type(activeOrgTitle);

    cy.wait(2000);

    cy.get('[data-cy="actions-dropdown-organization"]')
      .click({ force: true })
      .wait(2000)
      .get('.q-menu .q-item')
      .eq(1)
      .click();

    cy.get('[data-cy="delete-org-input"]')
      .type(activeOrgTitle);

    cy.get('[data-cy="delete-dialog-button"]')
      .click();

    cy.contains(activeOrgTitle)
      .should('not.be.visible');
  });

  it('C4269 - Ensure that the Admin is able to activate the draft organization', () => {

    cy.visit('/admin-portal/organizations');

    cy.get('[data-cy="search-org-input"]')
      .type(draftOrgTitle);

    cy.wait(2000);

    cy.get('[data-cy="actions-dropdown-organization"]')
      .click({ force: true })
      .wait(2000)
      .get('.q-menu .q-item')
      .eq(0)
      .click();

    cy.get('[data-cy="org-badge"]')
      .contains('Active');

  });

  it('C4271 - Ensure that the Admin is able to suspend the organization', () => {

    cy.visit('/admin-portal/organizations');

    cy.get('[data-cy="search-org-input"]')
      .type(activeOrgTitle);

    cy.wait(2000);

    cy.get('[data-cy="actions-dropdown-organization"]')
      .click({ force: true })
      .wait(2000)
      .get('.q-menu .q-item')
      .eq(0)
      .click();

    cy.get('[data-cy="suspend-org-button"]')
      .click();

    cy.get('[data-cy="org-badge"]')
      .contains('Suspended');

    cy.get('[data-cy="actions-dropdown-organization"]')
      .click({ force: true })
      .wait(2000)
      .get('.q-menu .q-item')
      .eq(0)
      .click();

    cy.get('[data-cy="org-badge"]')
      .contains('Active');

  });

  it('C4272	- Ensure that the Admin is able to edit the organization ', () => {
    cy.visit('/admin-portal/organizations');

    cy.get('[data-cy="search-org-input"]')
      .type(activeOrgTitle);

    cy.wait(10000);

    cy.get('[data-cy="org-badge"]')
      .should('have.length', 1)
      .contains('Active');

    cy.get('[data-cy="org-link"]')
      .should('have.length', 1)
      .click();

    cy.get('[data-cy="edit-org-button"]')
      .click();

    cy.get('[data-cy="edit-name-input"]')
      .clear()
      .type(editOrgTitle)
      .should('have.value', editOrgTitle);

    cy.contains('Save')
      .click();

    cy.get('[data-cy="org-title-view"]')
      .should('have.text', editOrgTitle)
      .click();

    cy.get('[data-cy="edit-org-button"]')
      .click();

    //Change Logo

    // cy.get('[data-cy="upload-logo-org-button"]')
    //   .click({ force: true })
    //   .wait(2000);

    // cy.get('[data-cy="upload-file-input"]')
    //   .selectFile('cypress/fixtures/profile_avatar.png', { force: true });

    // cy.get('[data-cy="upload-file-button"]')
    //   .click();

  });

  it('Ensure that the Admin is able to add Users to the appropriate organization', () => {
    cy.visit('/users');

    cy.wait(2000);

    cy.get('[data-cy="invite-user-button"]')
      .click();

    cy.get('[data-cy="input-invite-user"]')
      .should('have.length', 1)
      .type(inviteUserEmail)
      .blur();

    cy.get('[data-cy="send-invite-button"]')
      .click();

    cy.wait(5000);

    cy.visit('/users/invited');

    cy.get('[data-cy="search-user-input"]')
      .type(inviteUserEmail);

    cy.wait(5000);

    cy.contains(inviteUserEmail)
      .should('be.visible');

    //Repeat for adding one more user
    cy.get('[data-cy="invite-user-button"]')
      .click();

    cy.get('[data-cy="input-invite-user"]')
      .should('have.length', 1)
      .type(inviteUserEmail)
      .blur();

    cy.get('[data-cy="send-invite-button"]')
      .click();

    cy.wait(5000);

  });
}); 