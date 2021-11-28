/// <reference types="cypress" />

describe('Mock Api', () => {
  it('login', () => {
    cy.intercept('/api/login', { fixture: 'login.json' })

    cy.visit('/login')
  })
})
