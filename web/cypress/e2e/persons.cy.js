// Testes da página Persons
// Cobre: validação de CPF e mensagens de erro

describe('Persons', () => {

  beforeEach(() => {
    cy.visit('/')
    cy.get('input[type="text"]').first().clear().type('admin')
    cy.get('input[type="password"]').clear().type('admin123')
    cy.get('button').contains(/sign in/i).click()
    cy.wait(2000)
    cy.contains('Persons').click()
    cy.wait(1000)
  })

  it('Página Persons carrega corretamente', () => {
    cy.contains('Register New Person').should('be.visible')
  })

  it('[BUG-006] CPF inválido exibe mensagem técnica interna da API', () => {
    cy.get('input[placeholder*="000"]').type('99999999999')
    cy.get('input[placeholder*="Alice"]').type('Teste Silva')
    cy.get('button').contains(/register person/i).click()
    cy.wait(2000)
    cy.get('body').then(($body) => {
      if ($body.text().includes('"error"') || $body.text().includes('failed constructing')) {
        cy.log('BUG-006 CONFIRMADO: Mensagem técnica interna exibida ao usuário')
      }
    })
  })

  it('[BUG-007] CPF já existente exibe mensagem técnica interna da API', () => {
    cy.get('input[placeholder*="000"]').type('12345678909')
    cy.get('input[placeholder*="Alice"]').type('Teste Silva')
    cy.get('button').contains(/register person/i).click()
    cy.wait(2000)
    cy.get('body').then(($body) => {
      if ($body.text().includes('asset already exists')) {
        cy.log('BUG-007 CONFIRMADO: Mensagem de conflito técnica exibida ao usuário')
      }
    })
  })

  it('Submeter formulário vazio exibe validação do campo obrigatório', () => {
    cy.get('button').contains(/register person/i).click()
    cy.get('input:invalid').should('exist')
  })

})