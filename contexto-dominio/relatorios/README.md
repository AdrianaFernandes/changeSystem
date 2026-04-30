# Relatórios — Reporte e Acompanhamento

> Contexto: templates de comunicação executiva para cadências quinzenais e trimestrais.

---

## Documentos

### 1. [Template de Delivery Follow-up](../../templates/delivery-follow-up/delivery-follow-up.md)

Status executivo quinzenal para a liderança. Segue a **regra dos 5 segundos**: situação geral, maior risco e decisão necessária devem ser compreensíveis no primeiro bloco.

| Seção | Conteúdo |
|---|---|
| **Dashboard Consolidado** | KPIs (assumidas, realizadas, bloqueadas, atrasadas), progresso trimestral |
| **Principais Entregas** | Concluídas, em andamento, itens em atenção — por frente |
| **Riscos e Plano de Ação** | Semáforo com owner, ação e prazo |
| **Roadmap e Milestones** | Marcos estratégicos com status |
| **Enablers** | Iniciativas habilitadoras (Design System, CI/CD, capacitação) |
| **Decisões Necessárias** | Itens que dependem da liderança |

**Formatos:** [Markdown](../../templates/delivery-follow-up/delivery-follow-up.md) · [HTML interativo](../../templates/delivery-follow-up/delivery-follow-up.html) · [PPTX](../../templates/delivery-follow-up/generate_pptx.py) (gerado via Python)

**Recursos adicionais:**
- [Como funciona](../../templates/delivery-follow-up/como-funciona/) — guia completo de preenchimento e boas práticas
- [Dados](../../templates/delivery-follow-up/dados/) — follow-ups publicados por segmento (JSON)

---

### 2. [Template de Feedback Loop](../../templates/feedback-loop/feedback-loop.md)

Retrospectiva trimestral de transformação. Avalia o ciclo que passou como **sistema**, não entregas individuais.

| Bloco | Preenchimento | Conteúdo |
|---|---|---|
| **Métricas de Evolução** | Antes da sessão | Comparativo antes/depois por dimensão (fluxo, qualidade, previsibilidade, transformação) |
| **O que Mudou?** | Antes da sessão | Práticas adotadas, abandonadas, ajustadas |
| **Feedback do Time** | Durante a sessão | O que funcionou, o que não funcionou, experimentos propostos |
| **Ações para o Próximo Ciclo** | Durante a sessão | Máx. 5 ações priorizadas com owner e prazo |

**Formatos:** [Markdown](../../templates/feedback-loop/feedback-loop.md) · [HTML interativo](../../templates/feedback-loop/feedback-loop.html)

---

## Quando usar

| Situação | Documento |
|---|---|
| Cadência quinzenal de acompanhamento (a cada sprint) | Delivery Follow-up |
| Final de quarter — retrospectiva de transformação | Feedback Loop |
| Apresentação executiva para liderança | Delivery Follow-up → PPTX |
| Revisão de práticas e calibração de rota | Feedback Loop |

---

*[Voltar ao Contexto Domínio](../)*
