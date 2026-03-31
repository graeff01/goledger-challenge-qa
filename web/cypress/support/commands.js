// Comando personalizado para fazer login
Cypress.Commands.add('login', (username, password) => {
  cy.visit('/login')
  cy.get('input[type="text"], input[placeholder*="user"], input[placeholder*="User"]').first().clear().type(username)
  cy.get('input[type="password"]').clear().type(password)
  cy.get('button[type="submit"], button').contains(/sign in/i).click()
})