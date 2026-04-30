# Análises — Diagnóstico e Métricas

> Contexto: ferramentas de avaliação estruturada e métricas de fluxo para leitura do sistema.

---

## Documentos

### 1. [Template de Diagnóstico](../../templates/diagnostico/diagnostico.md)

Canvas de avaliação inicial de uma vertical, time ou produto. Estruturado em **6 blocos** com semáforo (🟢 🟡 🔴).

| Bloco | Pergunta-chave |
|---|---|
| **Mercado e Contexto** | Para quem estamos entregando valor? |
| **Produto e Proposta de Valor** | Qual a estratégia de produto e como se traduz em entrega? |
| **Arquitetura e Engenharia** | A fundação técnica suporta a estratégia? |
| **Organização e Capacidade** | Com que capacidade contamos para executar? |
| **Riscos e Restrições** | Quais forças externas ou internas bloqueiam a entrega? |
| **Métricas e Milestones** | Como sabemos que estamos no caminho certo? |

**Formatos:** [Markdown](../../templates/diagnostico/diagnostico.md) · [HTML interativo](../../templates/diagnostico/diagnostico.html)

---

### 2. [Guia de Métricas de Fluxo](../../guias/metricas-de-fluxo.md)

Caminho de adoção progressiva de métricas de fluxo no Delivery Follow-up.

| Fase | Semanas | Objetivo |
|---|---|---|
| **Visibilidade** | 1–4 | Coletar dados, board limpo, rastreamento de bloqueios |
| **Primeiros Insights** | 5–8 | Histograma de cycle time, percentis, Blocker Clustering |
| **Integração ao Template** | 9+ | Métricas de fluxo como seção formal do follow-up |

**Pré-requisitos:** Board padronizado, DoR/DoD documentados, rastreamento de bloqueios, 4-6 semanas de histórico.

**Métricas cobertas:**
- Cycle Time (P50, P70, P85, P95)
- Throughput (estabilidade, não meta crescente)
- WIP e Age of WIP
- Blocker Clustering (categorização e tempo bloqueado)
- Forecasting probabilístico (percentis, não médias)

---

## Quando usar

| Situação | Documento |
|---|---|
| Iniciar atuação em nova vertical/time | Diagnóstico |
| Evoluir acompanhamento com dados de fluxo | Guia de Métricas de Fluxo |
| Entender maturidade técnica (CI/CD, testes, deploy) | Diagnóstico — Bloco 3 |
| Mapear riscos e restrições | Diagnóstico — Bloco 5 |

---

*[Voltar ao Contexto Domínio](../)*
