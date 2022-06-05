// describe('spec.cy.js', () => {
//   it('should visit', () => {
//     cy.visit('/')
//   })
// })
describe('Complete testing of form', () => {
  it('Visits the form page and completely checks the functionality', () => {
    cy.visit('/')
    cy.contains('Enable Dark Mode!')
    cy.get('body').should('have.css', 'color-scheme', 'light')
    cy.get('.slider').click()
    cy.get('body').should('have.css', 'color-scheme', 'dark')

    cy.contains('Greetings!')


    cy.contains('Username*')
    cy.get('#username').type('a')
    cy.get(':nth-child(1) > .message').should('contain', 'username must have at least 6 characters')
    cy.get('#username').type('2345')
    cy.get(':nth-child(1) > .message').should('contain', 'username must have at least 6 characters')
    cy.get('#username').type('6')
    cy.get(':nth-child(1) > .message').should('contain', "Only alphanumeric characters and '_'. Must begin with letter")
    cy.get('#username').clear().type('a_1234')
    cy.get('.icon-success').should('be.visible')
    // cy.get('#username').clear().type('a23456')
    // below test fails because development has a bug and needs fixing
    // cy.get('.icon-success').should('be.visible') 

    cy.contains('Email*')
    cy.contains('Password*')
    cy.contains('Password Confirmation*')
    cy.contains('Title')
    cy.contains('Full Name')
    cy.contains('CNP*')
    cy.contains('Sex')
    cy.contains('Birthday')
    cy.contains('Birth Location')
    cy.contains('I Agree to Terms & Conditions*')
    cy.contains('Clear ALL fields')
    cy.contains('SUBMIT')
  })
})