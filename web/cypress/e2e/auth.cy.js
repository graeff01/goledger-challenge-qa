// Testes de autenticação
// Cobre: login válido, login inválido, logout e sessão

describe('Autenticação', () => {

  beforeEach(() => {
    cy.visit('/')
  })

  it('Login com credenciais corretas acessa o sistema', () => {
    cy.get('input[type="text"]').first().clear().type('admin')
    cy.get('input[type="password"]').clear().type('admin123')
    cy.get('button').contains(/sign in/i).click()
    cy.wait(2000)
    cy.contains('Books').should('be.visible')
    cy.contains('Logout').should('be.visible')
  })

  it('Login com senha errada exibe mensagem de erro', () => {
    cy.get('input[type="text"]').first().clear().type('admin')
    cy.get('input[type="password"]').clear().type('senhaerrada')
    cy.get('button').contains(/sign in/i).click()
    cy.wait(1000)
    cy.contains(/invalid credentials/i).should('be.visible')
    cy.contains('Logout').should('not.exist')
  })

  it('Login com usuário inexistente exibe mensagem de erro', () => {
    cy.get('input[type="text"]').first().clear().type('usuarioinexistente')
    cy.get('input[type="password"]').clear().type('qualquersenha')
    cy.get('button').contains(/sign in/i).click()
    cy.wait(1000)
    cy.contains(/invalid credentials/i).should('be.visible')
  })

  it('[BUG-012] Logout não invalida sessão — F5 restaura acesso', () => {
    cy.get('input[type="text"]').first().clear().type('admin')
    cy.get('input[type="password"]').clear().type('admin123')
    cy.get('button').contains(/sign in/i).click()
    cy.wait(2000)
    cy.contains('Logout').should('be.visible')
    cy.contains(/logout/i).click()
    cy.wait(1000)
    cy.reload()
    cy.wait(2000)
    cy.get('body').then(($body) => {
      if ($body.text().includes('Logout')) {
        cy.log('BUG-012 CONFIRMADO: Sessão restaurada após logout + reload')
        expect($body.text()).to.include('Sign In')
      }
    })
  })

})