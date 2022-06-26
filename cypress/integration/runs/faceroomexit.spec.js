/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('face room exit', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('http://localhost:8000/?s=1653368118506');
  });

  it('plays the game', () => {
    // wait 1 seconds
    cy.wait(1000);
    let body = cy.get('body');
    body.type('{leftArrow}');
    body.type('{leftArrow}');
    body.type('{leftArrow}');
    body.type('{leftArrow}');
    body.type('{leftArrow}');
    body.type('{downArrow}');
    body.type('{downArrow}');
    body.type('{leftArrow}');
    body.type('{leftArrow}');
    body.type('{leftArrow}');
    body.type('{leftArrow}');
    body.type('{upArrow}');
    body.type('{upArrow}');
    body.type('{leftArrow}');
    body.type('{leftArrow}');
    body.type('{leftArrow}');
    body.type('{leftArrow}');
    body.type('{leftArrow}');
    body.type('{upArrow}');
    body.type('{upArrow}');
    body.type('{leftArrow}');
    body.type('{leftArrow}');
    body.type('{downArrow}');
    body.type('{downArrow}');
    body.type('{rightArrow}');
    body.type('{rightArrow}');
    body.type('{downArrow}');
    body.type('{downArrow}');
    body.type('{downArrow}');
    body.type('{downArrow}');
    body.type('{downArrow}');
    body.type('{downArrow}');
    body.type('{downArrow}');
    body.type('{rightArrow}');
    body.type('{rightArrow}');
    body.type('{upArrow}');
    body.type('{upArrow}');
    body.type('{leftArrow}');
    body.type('{leftArrow}');
    body.type('{downArrow}');
    body.type('{downArrow}');
    body.type('{upArrow}');
    body.type('{upArrow}');
    body.type('{upArrow}');
    body.type('{upArrow}');
    body.type('{upArrow}');
    body.type('{upArrow}');
    body.type('{upArrow}');
    body.type('{rightArrow}');
    body.type('{rightArrow}');
    body.type('{rightArrow}');
    body.type('{rightArrow}');
    body.type('{rightArrow}');
    body.type('{upArrow}');
    body.type('{upArrow}');
    body.type('{rightArrow}');
    body.type('{rightArrow}');
    body.type('{rightArrow}');
    body.type('{rightArrow}');
    body.type('{downArrow}');
    body.type('{downArrow}');
    body.type('{rightArrow}');
    body.type('{rightArrow}');
    body.type('{rightArrow}');
    body.type('{rightArrow}');
    body.type('{rightArrow}');
    body.type('{rightArrow}');
    body.type('{rightArrow}');
    body.type('{upArrow}');
    body.type('{upArrow}');
    cy.wait(1000);
    body = cy.get('body');
    body.type('{rightArrow}');
    body.type('{rightArrow}');
    body.type('{downArrow}');
    body.type('{downArrow}');
    body.type('{downArrow}');
    body.type('{downArrow}');
    body.type('{downArrow}');
    cy.wait(1000);
    const badgesContainer = cy.get('[aria-label="badges"]');
    badgesContainer.get('[aria-label="Speed of thought"]', { timeout: 0 });
    badgesContainer.get('[aria-label="Mistakes are for the weak"]', {
      timeout: 0,
    });
    badgesContainer.get('[aria-label="Who needs those silly keys anyway?"]', {
      timeout: 0,
    });
    badgesContainer.get('[aria-label="Don\'t drop it!"]', { timeout: 0 });
    badgesContainer.get('[aria-label="Watch your step"]', { timeout: 0 });
    badgesContainer.get('[aria-label="First time for everything"]', {
      timeout: 0,
    });
    badgesContainer.get('[aria-label="Lady Luck is on your side"]', {
      timeout: 0,
    });
  });
});
