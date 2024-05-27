import '../../setup';

describe('Accessibility Results Report', () => {

  const shortDescription = 'Fintech short description';
  const dateFounded = '01.01.2001';
  const overviewDescription = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.';
  const companyWebsite = 'https://google.com';

  before(() => {
    cy.visit('/');
    cy.signIn({
      login: 'newfintech4@mailhog.sandbocs.com',
      password: 'Abcd12345!',
    });
  });

  afterEach(() => {
    cy.accessibility().then(violations => {
      // Accessibility Results
      cy.writeFile('accessibility_results_3.json', violations);
    });
  });

  it('Fintech Onboarding', () => {
    cy.injectAxe();
    cy.get('[data-cy="lets-go-btn"]')
      .click();

    cy.get('[data-cy="input-fintech-description"]')
      .type(shortDescription);

    cy.get('[data-cy="date-picker"]')
      .type(dateFounded);

    cy.get('[data-cy="form-select-country-questionary"]')
      .click();
    cy.get('.q-menu .q-item')
      .first()
      .should('be.visible')
      .click({ force: true });

    cy.get('[data-cy="input-fintech-overviewDescription"] .editable-field__content')
      .type(overviewDescription);

    cy.get('[data-cy="input-fintech-websiteUrl"]')
      .type(companyWebsite);

    cy.get('[data-cy="upload-logo"]')
      .click();
    cy.get('[data-cy="upload-file-input"]')
      .selectFile('cypress/fixtures/profile_avatar.png', { force: true });
    cy.get('[data-cy="upload-file-button"]')
      .click();

    cy.get('[data-cy="button-next"]')
      .click();

    //Skip all not required fields:
    cy.get('[data-cy="button-skip"]')
      .click();

    cy.get('[data-cy="button-skip"]')
      .click();

    cy.get('[data-cy="button-skip"]')
      .click();

    cy.get('[data-cy="button-skip"]')
      .click();

    cy.get('[data-cy="button-finish-onboarding"]')
      .click();

    //Finish onboarding
    cy.contains('Explore Sandpit')
      .click();


  });

});
