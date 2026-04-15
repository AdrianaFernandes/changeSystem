# Guia: Métricas de Fluxo para Delivery Follow-up

> **Thomson Reuters — TR Change | Forge Enabler**
> Versão 1.0 · Abril 2026

---

## Contexto

O template de Delivery Follow-up atual foca em KPIs de entrega, roadmap e riscos — informações que os times já dominam e que a liderança espera receber. Este guia descreve o **caminho de evolução** para incorporar métricas de fluxo ao acompanhamento quinzenal, à medida que os times passem a mapear e rastrear esses dados.

> **Importante:** não altere o template de Delivery Follow-up até que os times tenham pelo menos 4-6 semanas de dados de fluxo coletados. Dados incompletos geram ruído, não insight.

---

## O que são métricas de fluxo

As 4 métricas de fluxo são interconectadas pela Lei de Little (`Cycle Time = WIP / Throughput`):

| Métrica | O que mede | Fonte de dados |
|---|---|---|
| **Cycle Time** | Tempo do commit ao trabalho até a entrega | Board do time (Azure DevOps, Jira, etc.) — diferença entre entrada em "In Progress" e saída em "Done" |
| **Throughput** | Itens entregues por período | Contagem de itens que passaram para "Done" por sprint/semana |
| **WIP** | Itens em andamento simultaneamente | Contagem de itens em colunas ativas (entre "In Progress" e "Done") |
| **Age of WIP** | Há quanto tempo cada item em andamento está no fluxo | Data atual menos data de entrada em "In Progress" para cada item ativo |

---

## Pré-requisitos para começar

Antes de incorporar métricas de fluxo ao Delivery Follow-up, o time precisa:

### 1. Board limpo e padronizado

- [ ] Colunas do board refletem o fluxo real de trabalho (não são genéricas como "To Do / Doing / Done")
- [ ] Todo item em "In Progress" tem alguém trabalhando nele de fato
- [ ] Itens abandonados ou pausados estão sinalizados (tag, coluna de espera, ou removidos)

### 2. Definições documentadas

- [ ] **Definition of Ready (DoR):** critérios mínimos para um item entrar em andamento
- [ ] **Definition of Done (DoD):** critérios mínimos para considerar um item entregue
- [ ] **Critérios de Aceite:** definidos por item antes do início do trabalho

### 3. Rastreamento de bloqueios

- [ ] Bloqueios são registrados no board (flag, tag ou campo específico)
- [ ] Cada bloqueio é categorizado (Dependência Externa, Dependência Interna, Requisitos Indefinidos, Expedite/Urgência, Ambiente/Infra)
- [ ] A data de início e fim do bloqueio é registrada

### 4. Histórico mínimo

- [ ] Pelo menos 4-6 semanas de dados coletados de forma consistente
- [ ] Dados suficientes para gerar um histograma de cycle time com pelo menos 30 itens

---

## Caminho de adoção progressiva

### Fase 1 — Visibilidade (Semanas 1-4)

**Objetivo:** Coletar dados, sem alterar o template ainda.

**Ações:**
1. Garantir que o board esteja limpo e padronizado (pré-requisitos 1 e 2)
2. Ativar rastreamento de bloqueios (pré-requisito 3)
3. Começar a coletar cycle time de cada item entregue (planilha simples ou ferramenta)
4. No Delivery Follow-up, mencionar verbalmente que o time está construindo a base de dados de fluxo

**O que monitorar informalmente:**
- WIP total do time (contar itens ativos uma vez por semana)
- Itens parados há mais de 1 semana sem movimentação

### Fase 2 — Primeiros insights (Semanas 5-8)

**Objetivo:** Usar os dados coletados para gerar os primeiros insights internamente.

**Ações:**
1. Gerar o primeiro histograma de cycle time (distribuição de frequência)
2. Calcular percentis: P50, P70, P85, P95
3. Identificar os 3-5 itens com maior age of WIP e investigar por que estão parados
4. Rodar o primeiro Blocker Clustering: categorizar bloqueios e medir tempo total por categoria
5. Apresentar os insights internamente ao Engineering Manager

**O que adicionar ao Delivery Follow-up (seção de observações/riscos):**
- "Cycle Time P85: X dias (baseado em N itens das últimas Y semanas)"
- "Itens em andamento há mais de P85: N itens — investigação em curso"

### Fase 3 — Integração ao template (Semanas 9+)

**Objetivo:** Incorporar métricas de fluxo como seção formal do Delivery Follow-up.

**Dados sugeridos para o dashboard:**

| Métrica | Como reportar |
|---|---|
| **Cycle Time P85** | Valor atual + tendência (subindo/estável/descendo) vs. período anterior |
| **Throughput** | Itens entregues este período vs. média dos últimos 3 períodos |
| **WIP** | Total de itens em andamento. Comparar com a capacidade do time |
| **Aging Items** | Quantidade de itens com age > cycle time P85 |
| **Blocker Clustering** | Top 3 categorias de bloqueio e % do tempo total bloqueado |

**Dados sugeridos para previsões:**

Em vez de reportar "% conclusão" de features ou epics, usar forecasting probabilístico:

| Feature / Epic | P50 | P70 | P85 | P95 |
|---|---|---|---|---|
| `[Feature A]` | `[Data]` | `[Data]` | `[Data]` | `[Data]` |
| `[Feature B]` | `[Data]` | `[Data]` | `[Data]` | `[Data]` |

> **Recomendação:** Use P85 como base para compromissos com a liderança. Stakeholders que precisam de certeza maior podem optar por P95.

---

## Anti-padrões a evitar

| Anti-padrão | Por que é problemático | O que fazer em vez disso |
|---|---|---|
| Reportar cycle time como média única | A média mascara a variabilidade; é inútil para previsões | Reportar com percentis (P50, P70, P85, P95) |
| Usar throughput como meta crescente | Throughput é indicador de estabilidade, não de produtividade | Monitorar estabilidade; se throughput cai, investigar WIP e blockers |
| Impor WIP limits de cima para baixo no dia 1 | Gera resistência e gaming | Começar com "stop starting, start finishing" e limites pessoais |
| Reportar métricas sem contexto | Número solto não gera ação | Sempre vincular a métrica a uma recomendação ou investigação |
| Forçar métricas de fluxo antes de ter dados | Dados incompletos geram conclusões erradas | Seguir o caminho progressivo: visibilidade → insights → integração |

---

## Referências

- Playbook do Change Agent — [Toolkit de Fluxo](../playbooks/change-agent.md#toolkit-de-fluxo)
- Nave — What Is Flow and How Can I Measure It?
- Nave — The Smart Way to Introduce WIP Limits
- Nave — How to Reduce the Impact of Blockers Using Blocker Clustering
- Nave — Why Using Averages to Make Delivery Predictions Is a Bad Idea

---

*Este guia é um documento vivo. Contribua com melhorias via [Issues](https://github.com/mmbTR/TR-Change-System/issues).*
