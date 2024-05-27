import '../../setup';

const checkAccessibility = (page: string) => {
  cy.visit(page);
  cy.injectAxe();

  cy.get('.accept_button').click();

  cy.wait(2000);
};

const createProjectUrl = '/projects/create/26';
const cloudSandpitUrl = '/sandpits/68';
const dataSandpitUrl = '/sandpits/67';
const saasSandpitUrl = '/sandpits/53';

describe('Accessibility Results Report', () => {
  beforeEach(() => {
    cy.getJwtToken({
      user: {
        email: Cypress.env('adminEmail'),
        password: Cypress.env('adminPassword'),
      },
      origin: Cypress.env('baseUrlBanking'),
    });
  });

  afterEach(function() {
    const fileName = 'accessibility_results_1.json';

    cy.accessibility().then((violations: any[]) => {
      cy.readFile(fileName).then((data: Record<string, any[]>) => {
        cy.writeFile(fileName, {
          ...data,
          [this.currentTest?.title ?? '']: violations,
        });
      });
    });
  });

  it('Home page', () => {
    checkAccessibility('/');
  });

  it('Dashboard page', () => {
    checkAccessibility('/dashboard');
  });

  // Projects
  it('Projects page - Table view', () => {
    checkAccessibility('/projects');
  });

  it('Projects page - Grid view', () => {
    checkAccessibility('/projects');

    cy.get('[data-cy="table-layout-switch-grid"]').click();
  });

  it('Create Project page Description step', () => {
    checkAccessibility(createProjectUrl);

    cy.get('.stepper__controls .stepper__list')
      .contains('Description')
      .click();

    cy.wait(2000);
  });

  it('Create Project page Milestones step', () => {
    checkAccessibility(createProjectUrl);

    cy.get('.stepper__controls .stepper__list')
      .contains('Key milestones')
      .click();

    cy.wait(2000);
  });

  it('Create Project page Sandpits step', () => {
    checkAccessibility(createProjectUrl);

    cy.get('.stepper__controls .stepper__list')
      .contains('Sandpit')
      .click();

    cy.wait(2000);
  });

  it('Create Project page Datasets step', () => {
    checkAccessibility(createProjectUrl);

    cy.get('.stepper__controls .stepper__list')
      .contains('Datasets')
      .click();

    cy.wait(2000);
  });

  it('Create Project page KPIs step', () => {
    checkAccessibility(createProjectUrl);

    cy.get('.stepper__controls .stepper__list')
      .contains('KPIs')
      .click();

    cy.wait(2000);
  });

  it('Create Project page Review step', () => {
    checkAccessibility(`${createProjectUrl}/review`);
  });

  it('View Project page', () => {
    checkAccessibility('/projects/10');
  });

  it('View Project page Details tab', () => {
    checkAccessibility('/projects/10/details');
  });

  it('View Project page Outcomes tab', () => {
    checkAccessibility('/projects/5/outcomes');
  });

  it('View Project page Milestones tab', () => {
    checkAccessibility('/projects/2/milestones');
  });

  it('View Project page Users tab', () => {
    checkAccessibility('/projects/3/participants');
  });

  it('View Project page Datasets tab', () => {
    checkAccessibility('/projects/2/datasets');
  });

  it('View Project page Settings tab', () => {
    checkAccessibility('/projects/2/settings');
  });

  // Sandpits
  it('Sandpits page', () => {
    checkAccessibility('/sandpits');
  });

  it('View Cloud Sandpit page', () => {
    checkAccessibility(cloudSandpitUrl);
  });

  it('View Cloud Sandpit page Settings tab', () => {
    checkAccessibility(`${cloudSandpitUrl}/settings`);
  });

  it('View SaaS Sandpit page', () => {
    checkAccessibility(`${saasSandpitUrl}`);
  });

  it('Launch SaaS Sandpit page', () => {
    checkAccessibility(`${saasSandpitUrl}/saas`);
  });

  it('View Data Sandpit page', () => {
    checkAccessibility(dataSandpitUrl);
  });

  it('View Sandpit page Demo tab', () => {
    checkAccessibility(`${dataSandpitUrl}/demo`);
  });

  it('View Sandpit page KPI tab', () => {
    checkAccessibility(`${dataSandpitUrl}/kpi`);
  });

  it('View Data Sandpit page Settings tab', () => {
    checkAccessibility(`${dataSandpitUrl}/settings`);
  });

  it('View Sandpit page Documentation tab', () => {
    checkAccessibility(`${saasSandpitUrl}/documentation`);
  });

  it('View Sandpit page Description tab', () => {
    checkAccessibility(`${saasSandpitUrl}/project`);
  });

  it('View Sandpit page Milestones tab', () => {
    checkAccessibility(`${saasSandpitUrl}/milestones`);
  });

  it('View SaaS Sandpit page Settings tab', () => {
    checkAccessibility(`${saasSandpitUrl}/settings`);
  });

  it.skip('View Sandpit page Collaborators tab', () => {
    checkAccessibility('/sandpits/62/collaborators');
  });

  // Fintechs
  it('Fintechs page', () => {
    checkAccessibility('/fintechs');
  });

  it('View Fintech page', () => {
    checkAccessibility('/fintechs/1');
  });

  it('View Fintech page - Documentation tab', () => {
    checkAccessibility('/fintechs/14/documentation');
  });

  it('View Fintech page - Details tab', () => {
    checkAccessibility('/fintechs/8/detail');
  });

  it('View Fintech page - Details tab', () => {
    checkAccessibility('/fintechs/23/detail/due-diligence/service-provider');
  });

  it('View Fintech page - Details tab', () => {
    checkAccessibility('/fintechs/23/detail/due-diligence/application-platform');
  });

  // Datasets
  it('Datasets page', () => {
    checkAccessibility('/datasets');
  });

  it('View Dataset page', () => {
    checkAccessibility('/datasets/266');
  });

  it('View Dataset page - Documentation tab', () => {
    checkAccessibility('/datasets/142/documentation');
  });

  it('View Dataset page - Similar tab', () => {
    checkAccessibility('/datasets/142/similar');
  });

  // Users
  it('Users page', () => {
    checkAccessibility('/users');
  });

  it('Users page Invited', () => {
    checkAccessibility('/users/invited');
  });

  it('Users page External', () => {
    checkAccessibility('/users/external');
  });

  it('View User page', () => {
    checkAccessibility('/users/6');
  });

  it('View User page Projects tab', () => {
    checkAccessibility('/users/6/projects');
  });

  it('View User page Sandpits tab', () => {
    checkAccessibility('/users/6/sandpits');
  });

  // Profile
  it('Profile page', () => {
    checkAccessibility('/profile');
  });

  it('Profile page Privacy tab', () => {
    checkAccessibility('/profile/privacy');
  });

  it('Profile page API key tab', () => {
    checkAccessibility('/profile/api_key');
  });

  // Help Centre
  it('Help Centre page', () => {
    checkAccessibility('/help-centre');
  });

  // Admin portal
  it('Admin portal page', () => {
    checkAccessibility('/admin-portal');
  });

  it('Admin portal page Business Entitites tab', () => {
    checkAccessibility('/admin-portal/divisions');
  });

  it('Admin portal page Business Units tab', () => {
    checkAccessibility('/admin-portal/business-units');
  });

  it('Admin portal page Home page tab', () => {
    checkAccessibility('/admin-portal/home');
  });

  it('Admin portal page Projects tab', () => {
    checkAccessibility('/admin-portal/projects');
  });

  it('Admin portal page Activity log tab', () => {
    checkAccessibility('/admin-portal/activity');
  });

  // Errors
  it('404 page', () => {
    checkAccessibility('/404');
  });

  it('403 page', () => {
    checkAccessibility('/403');
  });

  it('451 page', () => {
    checkAccessibility('/451');
  });

  // Dev Environments (the BANK_SIMPLE_PROJECTS feature flag is enabled)

  it.skip('Environments page', () => {
    checkAccessibility('/environments');
  });

  it.skip('View Environments page', () => {
    checkAccessibility('/environments/40');
  });

  it.skip('View Environments page - Datasets tab', () => {
    checkAccessibility('/environments/40/datasets');
  });

  it.skip('View Environments page - Collaborators tab', () => {
    checkAccessibility('/environments/40/collaborators');
  });

  it.skip('View Environments page - Users tab', () => {
    checkAccessibility('/environments/40/users');
  });

  it.skip('View Environments page - Demo tab', () => {
    checkAccessibility('/environments/40/demo');
  });

  it.skip('View Environments page - Documents tab', () => {
    checkAccessibility('/environments/40/documents');
  });

  it.skip('Create Environments page', () => {
    checkAccessibility('/environments/create');
  });
});
