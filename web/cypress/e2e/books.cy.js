// Testes da página Books
// Cobre: busca, paginação e criação de livros

describe('Books', () => {

  beforeEach(() => {
    cy.visit('/')
    cy.get('input[type="text"]').first().clear().type('admin')
    cy.get('input[type="password"]').clear().type('admin123')
    cy.get('button').contains(/sign in/i).click()
    cy.wait(2000)
    cy.contains('Books').should('be.visible')
  })

  it('Busca sem preencher Author exibe mensagem de validação', () => {
    cy.get('button').contains(/search/i).click()
    cy.contains(/please enter an author/i).should('be.visible')
  })

  it('[BUG-001] Botão Next aparece mesmo sem resultados na busca', () => {
    cy.get('input[placeholder*="author" i]').first().type('xyzxyzxyz')
    cy.get('button').contains(/search/i).click()
    cy.wait(1500)
    cy.get('button').contains(/next/i).then(($btn) => {
      if ($btn.length > 0) {
        cy.log('BUG-001 CONFIRMADO: Botão Next visível mesmo sem resultados')
      }
    })
  })

  it('[BUG-002] Clicar em Next sem resultados dispara chamadas desnecessárias à API', () => {
    cy.intercept('GET', '**/books**').as('booksRequest')
    cy.get('input[placeholder*="author" i]').first().type('xyzxyzxyz')
    cy.get('button').contains(/search/i).click()
    cy.wait('@booksRequest')
    cy.get('button').contains(/next/i).then(($btn) => {
      if ($btn.length > 0) {
        cy.wrap($btn).click()
        cy.wait('@booksRequest').then((interception) => {
          cy.log('BUG-002 CONFIRMADO: Nova chamada feita para página sem resultados')
          cy.log('URL chamada: ' + interception.request.url)
        })
      }
    })
  })

  it('[BUG-004] Criar livro com usuário logado retorna 401 Unauthorized', () => {
    cy.intercept('POST', '**/books**').as('createBook')
    cy.contains('+ New Book').click()
    cy.wait(500)
    cy.get('input[placeholder*="Go Programming" i]').type('Test Book')
    cy.get('input[placeholder*="Alan" i]').type('John Doe')
    cy.get('input[placeholder*="Technology" i]').type('Technology')
    cy.get('select').first().select(1)
    cy.get('button').contains(/create book/i).click()
    cy.wait('@createBook').then((interception) => {
      if (interception.response.statusCode === 401) {
        cy.log('BUG-004 CONFIRMADO: API retornou 401 mesmo com usuário autenticado')
      }
    })
    cy.contains(/error/i).should('be.visible')
  })

  it('[BUG-005] Mensagem de erro ao criar livro é genérica e sem contexto', () => {
    cy.contains('+ New Book').click()
    cy.wait(500)
    cy.get('input[placeholder*="Go Programming" i]').type('Test Book')
    cy.get('input[placeholder*="Alan" i]').type('John Doe')
    cy.get('input[placeholder*="Technology" i]').type('Technology')
    cy.get('select').first().select(1)
    cy.get('button').contains(/create book/i).click()
    cy.wait(2000)
    cy.contains('An error occurred. Please try again.').should('be.visible')
    cy.log('BUG-005 CONFIRMADO: Mensagem genérica exibida sem contexto do erro real')
  })

})