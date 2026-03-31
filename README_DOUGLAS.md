# GoLedger Challenge — QA Edition

**Candidato:** Douglas Graeff  
**Repositório original:** [GoLedgerDev/goledger-challenge-qa](https://github.com/goledgerdev/goledger-challenge-qa)  
**Contato:** douglasggraeff@icloud.com · [linkedin.com/in/graeffdouglas](https://linkedin.com/in/graeffdouglas) · [github.com/graeff01](https://github.com/graeff01)

---

## Como revisar este trabalho

Este repositório contém dois entregáveis principais:

| Entregável | Localização |
|---|---|
| Relatório de bugs (12 bugs documentados) | [`BUG_REPORT.md`](./BUG_REPORT.md) |
| Evidências visuais de cada bug | [`evidence/`](./evidence/) |
| Testes automatizados com Cypress | [`web/cypress/e2e/`](./web/cypress/e2e/) |

---

## Rodando a aplicação

### Pré-requisitos
- Docker Desktop instalado e rodando
- Node.js 18+

### 1. Configurar e subir a API

```bash
cp api/.env.example api/.env
# Preencha api/.env com as credenciais fornecidas por e-mail
cd api
docker-compose up --build
```

A API estará disponível em `http://localhost:8080`  
Documentação Swagger: `http://localhost:8080/docs/index.html`

**Usuários padrão para teste:**

| Username | Password | Role  |
|----------|----------|-------|
| admin    | admin123 | admin |
| user1    | pass123  | user  |

### 2. Configurar e subir o frontend

```bash
cp web/.env.example web/.env
cd web
npm install
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`

---

## Rodando os testes automatizados

Com a aplicação rodando (API + frontend), execute:

```bash
cd web
npx cypress open
```

Selecione **E2E Testing** e escolha um dos arquivos de teste:

| Arquivo | O que cobre |
|---|---|
| `auth.cy.js` | Login válido, senha errada, BUG-012 (logout) |
| `books.cy.js` | Busca, paginação (BUG-001, BUG-002), criação (BUG-004, BUG-005) |
| `persons.cy.js` | Validação de CPF, BUG-006, BUG-007 |
| `libraries.cy.js` | BUG-009 (erros automáticos), BUG-011 (sem feedback) |

Ou para rodar todos em modo headless (sem interface gráfica):

```bash
cd web
npx cypress run
```

---

## Resumo dos bugs encontrados

Durante a exploração da aplicação foram identificados **12 bugs**:

| ID | Severidade | Área | Título |
|----|-----------|------|--------|
| BUG-001 | High | Web | Botão "Next" exibido mesmo sem resultados na busca |
| BUG-002 | High | Web/API | Chamadas desnecessárias à API ao navegar por páginas sem resultados |
| BUG-003 | Low | Web | Favicon ausente gera erro 404 no console |
| BUG-004 | **Critical** | Web/API | Criação de livro retorna 401 Unauthorized mesmo com usuário logado |
| BUG-005 | Medium | Web | Mensagem de erro genérica ao falhar na criação de livro |
| BUG-006 | High | Web | Mensagem técnica interna da API exibida ao usuário (Persons) |
| BUG-007 | High | Web | Mensagem técnica interna exibida ao registrar CPF já existente |
| BUG-008 | Medium | Web | Validação de CPF inconsistente entre frontend e API |
| BUG-009 | High | Web | Erros técnicos exibidos automaticamente ao carregar Libraries |
| BUG-010 | High | Web | Mensagens técnicas internas expostas na página Libraries |
| BUG-011 | Medium | Web | Nenhum feedback ao usuário após clicar em "Create Library" |
| BUG-012 | **Critical** | Web | Logout não invalida a sessão — token permanece ativo |

Detalhes completos, passos para reproduzir, evidências e propostas de correção: [`BUG_REPORT.md`](./BUG_REPORT.md)

---

## Sobre o processo

Este desafio foi realizado com auxílio ativo de IA (Claude — Anthropic) como ferramenta de apoio ao raciocínio, estruturação dos testes e documentação.

Acredito que saber usar IA de forma estratégica — sabendo o que pedir, como avaliar o resultado e quando questionar — é uma habilidade tão relevante quanto qualquer outra no QA moderno. Um profissional que sabe usar as ferramentas disponíveis entrega mais, com mais qualidade e em menos tempo.

Toda análise, decisão de teste, interpretação dos bugs encontrados e validação dos resultados foi conduzida e revisada por mim. A IA foi o copiloto — o raciocínio e as decisões foram meus.

---

*Desafio submetido em 30/03/2026*