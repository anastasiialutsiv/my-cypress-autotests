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

  it.skip('C4281 -	Ensure that Users in the deleting org are either deleted or moved to other orgs', () => {

    //Create Organization
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

    //Add Users to organization
    cy.visit('/users');

    cy.get('[data-cy="invite-user-button"]')
      .click();

    cy.get('[data-cy="input-invite-user"]')
      .should('have.length', 1)
      .type(inviteUserEmail)
      .blur();

    cy.get('[data-cy="send-invite-button"]')
      .click();

    cy.wait(5000);

    //Delete organization with Users
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

  it('C4281 -	Ensure that Users in the deleting org are either moved to other orgs', () => {

    //Create Organization
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

    //Add Users to organization
    cy.visit('/users');

    cy.get('[data-cy="invite-user-button"]')
      .click();

    cy.get('[data-cy="input-invite-user"]')
      .should('have.length', 1)
      .type(inviteUserEmail)
      .blur();

    cy.get('[data-cy="send-invite-button"]')
      .click();

    cy.wait(5000);

    //Delete organization with Users - Move Users to another Org
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

    cy.get('.q-option-group > div:nth-child(2) .q-radio')
      .click();

    cy.get('.q-select__dropdown',{ timeout: 10000 }).should('be.visible')
      .click({ force: true });
    cy.get('.q-select__dropdown')
      .find('.q-item')
      .first()
      .click();

    cy.get('[data-cy="delete-org-input"]')
      .type(activeOrgTitle);

    cy.get('[data-cy="delete-dialog-button"]')
      .click();

    cy.contains(activeOrgTitle)
      .should('not.be.visible');
  });

});
