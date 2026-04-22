# GoLedger QA Challenge — Douglas Graeff

> Este repositório é um fork do [GoLedger QA Challenge](https://github.com/GoLedgerDev/goledger-challenge-qa).
> O trabalho entregue está documentado abaixo e nos arquivos `BUG_REPORT.md`, `README_DOUGLAS.md`, e nos testes automatizados em `/web/cypress`.

---

## O que foi feito

Recebi o desafio, subi o ambiente localmente via Docker, explorei a aplicação de forma estruturada e entreguei:

- **12 bugs documentados** com severidade, passos para reproduzir, comportamento esperado vs. real, evidência em imagem e proposta de correção
- **15 testes automatizados com Cypress** cobrindo os fluxos principais da aplicação
- **Testes de API com Postman** validando endpoints de autenticação, books, persons e libraries

---

## Resumo dos Bugs Encontrados

| ID | Título | Componente | Severidade |
|---|---|---|---|
| BUG-001 | Botão "Next" exibido sem resultados na busca | Web | High |
| BUG-002 | Chamadas desnecessárias à API ao paginar sem resultados | Web / API | High |
| BUG-003 | Favicon ausente gera erro 404 no console | Web | Low |
| BUG-004 | Criação de livro retorna 401 mesmo com usuário logado | Web / API | **Critical** |
| BUG-005 | Mensagem de erro genérica ao falhar na criação de livro | Web | Medium |
| BUG-006 | Mensagem técnica interna da API exibida na tela Persons | Web | High |
| BUG-007 | Mensagem técnica ao registrar CPF já existente | Web | High |
| BUG-008 | Validação de CPF inconsistente entre frontend e API | Web | Medium |
| BUG-009 | Erros técnicos exibidos automaticamente ao carregar Libraries | Web | High |
| BUG-010 | Mensagens técnicas internas expostas em Libraries | Web | High |
| BUG-011 | Nenhum feedback ao usuário após criar biblioteca | Web | Medium |
| BUG-012 | Logout não invalida sessão — token permanece ativo | Web | **Critical** |

📄 [Ver relatório completo → BUG_REPORT.md](./BUG_REPORT.md)

---

## Testes Automatizados — Cypress

### Cobertura

| Área | Testes | Status |
|---|---|---|
| Autenticação (login/logout) | 4 | ✅ Passando |
| Books (listagem, busca, paginação) | 4 | ✅ Passando |
| Persons (cadastro, validações) | 4 | ✅ Passando |
| Libraries (carregamento, criação) | 3 | ✅ Passando |
| **Total** | **15** | **✅ 15/15** |

### Como rodar os testes

**Pré-requisitos:** Node.js 18+, Docker

```bash
# 1. Suba o ambiente
cd api && docker-compose up --build -d
cd ../web && npm install && npm run dev

# 2. Em outro terminal, rode os testes
cd web
npx cypress run

# Ou abra a interface visual
npx cypress open
```

---

## Stack utilizada

| Ferramenta | Uso |
|---|---|
| Cypress | Testes E2E automatizados |
| Postman | Testes de API |
| Docker | Ambiente local |
| JavaScript | Testes Cypress |

---

## Observação sobre uso de IA

Este desafio foi realizado com auxílio ativo de IA (Claude — Anthropic) como ferramenta de apoio ao raciocínio, estruturação dos testes e documentação. Acredito que saber usar IA de forma estratégica — sabendo o que pedir, como avaliar o resultado e quando questionar — é uma habilidade relevante no QA moderno. Toda análise, decisão de teste e validação dos bugs foi conduzida e revisada por mim.

---

**Douglas Graeff**
[linkedin.com/in/graeffdouglas](https://linkedin.com/in/graeffdouglas) · [github.com/graeff01](https://github.com/graeff01)
