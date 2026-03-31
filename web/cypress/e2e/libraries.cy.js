// Testes da página Libraries
// Cobre: erros automáticos ao carregar e falta de feedback

describe('Libraries', () => {

  beforeEach(() => {
    cy.visit('/')
    cy.get('input[type="text"]').first().clear().type('admin')
    cy.get('input[type="password"]').clear().type('admin123')
    cy.get('button').contains(/sign in/i).click()
    cy.wait(2000)
    cy.contains('Libraries').click()
    cy.wait(1500)
  })

  it('[BUG-009] Erros técnicos aparecem automaticamente ao carregar a página', () => {
    cy.get('body').then(($body) => {
      if ($body.text().includes('"error"') || $body.text().includes('missing argument')) {
        cy.log('BUG-009 CONFIRMADO: Erros técnicos exibidos automaticamente ao carregar Libraries')
      }
    })
  })

  it('[BUG-011] Criar biblioteca não exibe nenhum feedback ao usuário', () => {
    cy.get('input[placeholder*="library" i], input[placeholder*="Library" i]').first().clear().type('Biblioteca Teste')
    cy.get('button').contains(/create library/i).click()
    cy.wait(2000)
    cy.contains(/success/i).should('not.exist')
    cy.contains(/created/i).should('not.exist')
    cy.log('BUG-011 CONFIRMADO: Nenhum feedback exibido após clicar em Create Library')
  })

})