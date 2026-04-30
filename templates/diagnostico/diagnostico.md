# Template de Diagnóstico

> **Thomson Reuters — TR Change | Forge Enabler**
> Versão 1.0 · Abril 2026

---

## Como usar

Este template guia o Change Agent na avaliação inicial de uma vertical, time ou produto. Preencha cada bloco com as informações disponíveis, identifique lacunas e classifique a maturidade por semáforo.

**Semáforo:**
- 🟢 **Verde** — informação disponível, situação saudável
- 🟡 **Âmbar** — informação parcial ou situação que requer atenção
- 🔴 **Vermelho** — informação ausente ou situação crítica

---

## Dados Gerais

| Campo | Valor |
|---|---|
| **Vertical / Produto** | `[PREENCHER]` |
| **Change Agent responsável** | `[PREENCHER]` |
| **Data do diagnóstico** | `[PREENCHER]` |
| **Engineering Manager(s)** | `[PREENCHER]` |
| **Período de referência** | `[PREENCHER]` |

---

## Bloco 1 — Mercado e Contexto

> **Pergunta-chave:** Para quem estamos entregando valor?

### Segmentação de Clientes

| # | Pergunta | Resposta | Semáforo |
|---|---|---|---|
| 1.1 | Qual é a base total de clientes/usuários ativos? | `[PREENCHER]` | ⬜ |
| 1.2 | Como se distribui por segmento (porte, perfil, vertical)? | `[PREENCHER]` | ⬜ |
| 1.3 | Qual a taxa de adoção do produto atual vs. alternativas internas? | `[PREENCHER]` | ⬜ |

### Proposta de Valor

| # | Pergunta | Resposta | Semáforo |
|---|---|---|---|
| 1.4 | O que o cliente ganha ao usar o produto? A proposta de valor é clara? | `[PREENCHER]` | ⬜ |
| 1.5 | Quais são os jobs-to-be-done do cliente que o produto resolve (bem, mal ou não resolve)? | `[PREENCHER]` | ⬜ |

### Churn e Retenção

| # | Pergunta | Resposta | Semáforo |
|---|---|---|---|
| 1.6 | Existem dados de churn? Quais segmentos estão mais em risco? | `[PREENCHER]` | ⬜ |
| 1.7 | O que faz um cliente trocar de solução? Quais são os gatilhos? | `[PREENCHER]` | ⬜ |
| 1.8 | O que faz o cliente ficar mesmo insatisfeito (custo de troca, lock-in, inércia)? | `[PREENCHER]` | ⬜ |

### Concorrência

| # | Pergunta | Resposta | Semáforo |
|---|---|---|---|
| 1.9 | Quem são os concorrentes diretos e indiretos? | `[PREENCHER]` | ⬜ |
| 1.10 | Existe risco de disrupção (startups que resolvem 80% por 20% do preço)? | `[PREENCHER]` | ⬜ |

---

## Bloco 2 — Produto e Proposta de Valor

> **Pergunta-chave:** Qual a estratégia de produto e como ela se traduz em entrega?

### Estratégia de Produto

| # | Pergunta | Resposta | Semáforo |
|---|---|---|---|
| 2.1 | Qual o objetivo estratégico do produto para os próximos 12–24 meses? | `[PREENCHER]` | ⬜ |
| 2.2 | Quais módulos/capacidades compõem o produto? Qual a interdependência entre eles? | `[PREENCHER]` | ⬜ |
| 2.3 | Existe um "core" sem o qual nenhum módulo funciona? | `[PREENCHER]` | ⬜ |
| 2.4 | Quais funcionalidades são usadas por poucos clientes mas são deal-breakers? | `[PREENCHER]` | ⬜ |

### Go-to-Market

| # | Pergunta | Resposta | Semáforo |
|---|---|---|---|
| 2.5 | Qual a estratégia de rollout (early adopters, beta, GA)? Por região, porte ou vertical? | `[PREENCHER]` | ⬜ |
| 2.6 | Como se valida que o produto está "pronto" para um segmento? Quais critérios? | `[PREENCHER]` | ⬜ |
| 2.7 | O modelo de precificação é adequado ao mercado-alvo? | `[PREENCHER]` | ⬜ |

### Contexto Regulatório (se aplicável)

| # | Pergunta | Resposta | Semáforo |
|---|---|---|---|
| 2.8 | Existem mudanças regulatórias que impactam o produto nos próximos 12–24 meses? | `[PREENCHER]` | ⬜ |
| 2.9 | Mudanças regulatórias criam oportunidade ou risco? | `[PREENCHER]` | ⬜ |

---

## Bloco 3 — Arquitetura e Engenharia

> **Pergunta-chave:** A fundação técnica suporta a estratégia de produto?

### Fundações Técnicas

| # | Pergunta | Resposta | Semáforo |
|---|---|---|---|
| 3.1 | Qual o stack tecnológico principal (linguagem, banco, cloud, deployment)? | `[PREENCHER]` | ⬜ |
| 3.2 | Qual a arquitetura-alvo (monolito modular, microsserviços, event-driven)? | `[PREENCHER]` | ⬜ |
| 3.3 | Existe plataforma compartilhada (IAM, billing, notificações, storage)? | `[PREENCHER]` | ⬜ |
| 3.4 | Qual a estratégia de dados? Como migrar/manter dados históricos? | `[PREENCHER]` | ⬜ |

### Integrações

| # | Pergunta | Resposta | Semáforo |
|---|---|---|---|
| 3.5 | Quais integrações externas o produto mantém? | `[PREENCHER]` | ⬜ |
| 3.6 | Existe camada de API aberta? Parceiros/sistemas precisam integrar? | `[PREENCHER]` | ⬜ |

### Qualidade e Confiabilidade

| # | Pergunta | Resposta | Semáforo |
|---|---|---|---|
| 3.7 | Qual o nível de cobertura de testes? Existe especificação documentada? | `[PREENCHER]` | ⬜ |
| 3.8 | Quais os requisitos não-funcionais críticos (disponibilidade, performance, segurança, LGPD)? | `[PREENCHER]` | ⬜ |
| 3.9 | Quais cenários não podem ter erro (regulatório, fiscal, financeiro)? | `[PREENCHER]` | ⬜ |

### Saúde do Fluxo (Flow Health)

| # | Pergunta | Resposta | Semáforo |
|---|---|---|---|
| 3.10 | O time acompanha as 4 métricas de fluxo (Cycle Time, Throughput, WIP, Age of WIP)? Quais estão visíveis? | `[PREENCHER]` | ⬜ |
| 3.11 | Qual o WIP atual? Existe política de limite de WIP (por pessoa, coluna ou sistema)? | `[PREENCHER]` | ⬜ |
| 3.12 | Existem itens envelhecendo no board (age of WIP >> cycle time P85)? Quantos e há quanto tempo? | `[PREENCHER]` | ⬜ |
| 3.13 | Os bloqueios são categorizados e rastreados (Blocker Clustering)? Qual a categoria que mais impacta o cycle time? | `[PREENCHER]` | ⬜ |
| 3.14 | Existe Definition of Ready (DoR) e Definition of Done (DoD) documentados e praticados? Critérios de aceite são definidos antes do início do trabalho? | `[PREENCHER]` | ⬜ |
| 3.15 | O time usa forecasting probabilístico (percentis de cycle time) ou depende de estimativas subjetivas? | `[PREENCHER]` | ⬜ |

### Enablers

| # | Pergunta | Resposta | Semáforo |
|---|---|---|---|
| 3.16 | Design System — existe? Em que nível de adoção? | `[PREENCHER]` | ⬜ |
| 3.17 | Testes de performance — existe estratégia? Houve incidentes que motivaram? | `[PREENCHER]` | ⬜ |
| 3.18 | Outros enablers (observabilidade, CI/CD, feature flags, SSO)? | `[PREENCHER]` | ⬜ |

---

## Bloco 4 — Organização e Capacidade

> **Pergunta-chave:** Com que capacidade contamos para executar?

### Times

| # | Pergunta | Resposta | Semáforo |
|---|---|---|---|
| 4.1 | Qual o tamanho total do time de engenharia? | `[PREENCHER]` | ⬜ |
| 4.2 | Como os times estão organizados (por módulo, camada técnica, jornada do cliente)? | `[PREENCHER]` | ⬜ |
| 4.3 | Existe gap de competência? Há plano de reskilling ou contratação? | `[PREENCHER]` | ⬜ |
| 4.4 | Qual a maturidade de engenharia por squad (CI/CD, observabilidade, testes, frequência de deploy)? | `[PREENCHER]` | ⬜ |

### Processos e Governança

| # | Pergunta | Resposta | Semáforo |
|---|---|---|---|
| 4.5 | Como são tomadas as decisões de priorização? Existe product management formal? | `[PREENCHER]` | ⬜ |
| 4.6 | Qual o ciclo de planejamento (trimestral, semestral, ad-hoc)? Existe alinhamento cross-squad? | `[PREENCHER]` | ⬜ |
| 4.7 | Quanto % do tempo é consumido por sustentação vs. desenvolvimento novo? | `[PREENCHER]` | ⬜ |

### Investimento

| # | Pergunta | Resposta | Semáforo |
|---|---|---|---|
| 4.8 | Qual o budget disponível? Tendência (crescendo, estável, sob pressão)? | `[PREENCHER]` | ⬜ |
| 4.9 | Existe competição por budget com outras iniciativas/geografias? | `[PREENCHER]` | ⬜ |

---

## Bloco 5 — Riscos e Restrições

> **Pergunta-chave:** Quais forças externas ou internas aceleram ou bloqueiam a entrega?

### Riscos de Execução

| # | Pergunta | Resposta | Semáforo |
|---|---|---|---|
| 5.1 | Qual o maior risco que tira o sono hoje em relação à entrega? | `[PREENCHER]` | ⬜ |
| 5.2 | Existe risco de perder clientes para concorrentes durante a execução? | `[PREENCHER]` | ⬜ |
| 5.3 | Há dependência de times ou plataformas globais? | `[PREENCHER]` | ⬜ |
| 5.4 | Qual o risco reputacional de uma falha na entrega? | `[PREENCHER]` | ⬜ |

### Restrições

| # | Pergunta | Resposta | Semáforo |
|---|---|---|---|
| 5.5 | Existem deadlines regulatórios ou contratuais não negociáveis? | `[PREENCHER]` | ⬜ |
| 5.6 | Qual o plano B se o cronograma atrasar significativamente? | `[PREENCHER]` | ⬜ |
| 5.7 | Como se comunica mudanças de plano para stakeholders e mercado? | `[PREENCHER]` | ⬜ |

---

## Bloco 6 — Métricas e Milestones

> **Pergunta-chave:** Como sabemos que estamos no caminho certo?

### Métricas Atuais

| # | Pergunta | Resposta | Semáforo |
|---|---|---|---|
| 6.1 | Como se mede sucesso hoje (receita, NPS, tickets, entregas no prazo)? | `[PREENCHER]` | ⬜ |
| 6.2 | Existe scorecard de acompanhamento (% funcionalidades, % clientes, % receita)? | `[PREENCHER]` | ⬜ |

### KPIs Propostos

| # | Pergunta | Resposta | Semáforo |
|---|---|---|---|
| 6.3 | Quais KPIs definiriam sucesso para esta vertical nos próximos 6 meses? | `[PREENCHER]` | ⬜ |
| 6.4 | Qual a meta principal e de onde ela veio (mercado, meta interna, pressão competitiva)? | `[PREENCHER]` | ⬜ |
| 6.5 | Existe abertura para renegociar metas com base em evidências? | `[PREENCHER]` | ⬜ |

---

## Resumo Executivo do Diagnóstico

| Bloco | Pergunta-chave | Semáforo | Observação |
|---|---|---|---|
| **Mercado e Contexto** | Para quem estamos entregando valor? | ⬜ | `[PREENCHER]` |
| **Produto e Proposta de Valor** | Qual a estratégia de produto? | ⬜ | `[PREENCHER]` |
| **Arquitetura e Engenharia** | A fundação técnica suporta? | ⬜ | `[PREENCHER]` |
| **Organização e Capacidade** | Temos capacidade para executar? | ⬜ | `[PREENCHER]` |
| **Riscos e Restrições** | O que pode bloquear? | ⬜ | `[PREENCHER]` |
| **Métricas e Milestones** | Como medimos progresso? | ⬜ | `[PREENCHER]` |

### Próximos Passos

1. `[PREENCHER]`
2. `[PREENCHER]`
3. `[PREENCHER]`

---

*Template do TR Change | Forge Enabler. Contribua com melhorias via [Issues](https://github.com/mmbTR/TR-Change-System/issues).*
