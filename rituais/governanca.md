# Rituais de Governança do Change Agent

> **Thomson Reuters — TR Change | Forge Enabler**
> Versão 1.0 · Abril 2026

---

## Visão Geral

O Change Agent opera com **4 rituais recorrentes** que formam o ciclo de governança da transformação. Cada ritual tem cadência, participantes, inputs e outputs definidos.

```

---

## 1. Delivery Follow-up

### Propósito

Comunicar à liderança o estado real do delivery: o que foi entregue, o que está em risco, o que precisa de decisão. Não é status meeting — é o momento em que o Change Agent traduz dados de execução em narrativa executiva e força decisões.

### Cadência e Duração

| Campo | Valor |
|---|---|
| **Cadência** | Quinzenal (a cada sprint ou a cada 2 sprints) |
| **Duração** | 30–45 min |
| **Formato** | Apresentação executiva (deck ou HTML) |

### Participantes

| Papel | Responsabilidade no ritual |
|---|---|
| **Change Agent** | Prepara e apresenta o follow-up, facilita decisões |
| **Engineering Manager** | Valida dados técnicos, co-responsável pelos riscos |
| **Líder de Segmento / VP** | Toma decisões sobre riscos, prioridades e trade-offs |
| **Product Manager** (opcional) | Complementa visão de negócio e roadmap |

### Agenda-tipo

| Bloco | Timebox | Conteúdo |
|---|---|---|
| Abertura | 2 min | Contexto do período, mudanças relevantes |
| Dashboard | 5 min | KPIs, entregas assumidas vs. realizadas, semáforo geral |
| Riscos e Ações | 10 min | Top 3 riscos com plano de ação e owner definido |
| Decisões Necessárias | 10 min | Itens que dependem de aprovação da liderança |
| Roadmap e Milestones | 5 min | Status dos marcos, projeção de entrega |
| Enablers | 5 min | Iniciativas habilitadoras e progresso |
| Fechamento | 3 min | Recap de decisões tomadas e próximos passos |

### Inputs

- [Template de Delivery Follow-up](../templates/delivery-follow-up/delivery-follow-up.md) preenchido
- Dados do board (entregas, WIP, bloqueios)
- Status dos riscos do período anterior

### Outputs

- Decisões registradas e comunicadas
- Riscos endereçados com owner e prazo
- Ações definidas para o próximo período
- Follow-up publicado (Markdown, HTML ou PPTX)

### Critérios de Saúde

O ritual está saudável quando:

- [ ] Decisões são tomadas na reunião, não adiadas
- [ ] Riscos têm owner e prazo concreto ao sair da sala
- [ ] A liderança consegue entender a situação em 5 segundos (regra dos 5 segundos)
- [ ] O follow-up anterior é revisado e não há ações pendentes sem justificativa
- [ ] A reunião termina no timebox

### Anti-padrões

| Anti-padrão | Sintoma | Correção |
|---|---|---|
| Status meeting disfarçado | Cada pessoa reporta o que fez, sem síntese | O Change Agent prepara a narrativa antes — o time valida, não reporta |
| Decisões adiadas | "Vamos ver na próxima" se repete | Explicitar o custo da não-decisão (cenário Agir vs. Não Agir) |
| Liderança ausente | VP delega e não participa | Escalar: se o decisor não está na sala, a reunião não cumpre sua função |
| Foco no passado | 80% do tempo revendo o que aconteceu | Inverter: 20% passado, 80% riscos, decisões e projeções |

---

## 2. Feedback Loop (Retrospectiva Trimestral de Transformação)

### Propósito

Avaliar o ciclo de transformação que passou: o que evoluiu, o que estagnou, o que precisa mudar na abordagem. Este ritual olha para o **sistema**, não para entregas individuais. É o momento em que o Change Agent e o time calibram a direção da transformação.

### Cadência e Duração

| Campo | Valor |
|---|---|
| **Cadência** | Trimestral (ao final de cada quarter) |
| **Duração** | 60–90 min |
| **Formato** | Workshop facilitado |

### Participantes

| Papel | Responsabilidade no ritual |
|---|---|
| **Change Agent** | Facilita, traz dados de fluxo e indicadores comparativos |
| **Engineering Manager** | Co-facilita, traz perspectiva de execução |
| **Squads** (representantes) | Feedback direto sobre práticas e dificuldades |
| **Líder de Segmento** (opcional) | Participação no bloco de alinhamento estratégico |

### Agenda-tipo

| Bloco | Timebox | Conteúdo |
|---|---|---|
| Contexto | 5 min | O que esperávamos alcançar neste trimestre |
| Métricas de Evolução | 15 min | Comparativo antes/depois por dimensão (fluxo, qualidade, previsibilidade, transformação) |
| O que mudou? | 15 min | Práticas adotadas, abandonadas e ajustadas |
| Feedback do time | 20 min | O que funcionou, o que não funcionou, o que queremos tentar |
| Ações para o próximo ciclo | 15 min | Priorização de melhorias com owner e prazo |
| Alinhamento estratégico | 10 min | Ajustes de rota vs. objetivos da vertical |

### Inputs

- [Template de Feedback Loop](../templates/feedback-loop/feedback-loop.md) preparado com dados
- Métricas de fluxo do trimestre (Cycle Time, Throughput, WIP, Age of WIP)
- Diagnóstico atualizado (se houver)
- Planos de ação em execução e seus resultados

### Outputs

- Resumo executivo do ciclo (semáforo por dimensão)
- Lista de ações priorizadas para o próximo trimestre
- Ajustes na abordagem de transformação
- Feedback Loop publicado e compartilhado

### Critérios de Saúde

- [ ] Dados comparativos (antes/depois) estão disponíveis e são discutidos
- [ ] O time participa ativamente, não apenas o Change Agent
- [ ] Pelo menos 3 ações concretas saem do ritual com owner definido
- [ ] Há alinhamento entre o que o time quer mudar e os objetivos da vertical
- [ ] Decisões do trimestre anterior são revisadas (foram executadas? geraram resultado?)

### Anti-padrões

| Anti-padrão | Sintoma | Correção |
|---|---|---|
| Retro genérica | "Precisamos melhorar a comunicação" sem dados | Trazer métricas concretas — antes/depois em números |
| Catarse sem ação | Muito desabafo, nenhuma ação priorizada | Timebox para feedback, bloco separado para ações com owner |
| Só o Change Agent fala | Time passivo, esperando as respostas | Usar formatos participativos (1-2-4-All, dot voting) |
| Sem follow-up | Ações definidas mas nunca revisitadas | Primeira pauta do próximo Feedback Loop: revisão das ações anteriores |

---

## 3. Pre-Planning e Planning de Roadmap

### Propósito

Alinhar prioridades de negócio com capacidade real de entrega para o próximo período (trimestre ou semestre). É o ritual em que o Change Agent garante que o compromisso assumido é **realista**, baseado em dados de fluxo e capacity — não em wishful thinking.

### Cadência e Duração

| Campo | Valor |
|---|---|
| **Cadência** | Trimestral (ou semestral, conforme ciclo de planejamento) |
| **Duração** | Pre-Planning: 60 min · Planning: 120–180 min |
| **Formato** | Pre-Planning: reunião preparatória · Planning: workshop de alinhamento |

### Participantes

| Papel | Pre-Planning | Planning |
|---|---|---|
| **Change Agent** | Prepara dados de capacity e fluxo | Facilita, garante realismo |
| **Engineering Manager** | Valida capacity e dependências | Co-facilita, compromete entregas |
| **Product Manager** | Prioriza backlog | Apresenta prioridades, negocia escopo |
| **Líder de Segmento / VP** | — | Valida alinhamento estratégico |
| **Tech Leads** (opcional) | Sinaliza riscos técnicos | Detalha viabilidade |

### Agenda-tipo — Pre-Planning

| Bloco | Timebox | Conteúdo |
|---|---|---|
| Revisão do trimestre anterior | 10 min | O que foi entregue vs. planejado, lições aprendidas |
| Capacity disponível | 15 min | FTEs, férias, feriados, % sustentação vs. novo, expedites previstos |
| Throughput histórico | 10 min | Features/épicos entregues nos últimos 2-3 trimestres |
| Backlog priorizado | 15 min | Top itens candidatos ao próximo período |
| Riscos e dependências | 10 min | Cross-team, plataforma, regulatório |

### Agenda-tipo — Planning

| Bloco | Timebox | Conteúdo |
|---|---|---|
| Contexto estratégico | 15 min | Objetivos do período, OKRs, metas de negócio |
| Apresentação das prioridades | 20 min | Product Manager apresenta o backlog priorizado |
| Capacity vs. demanda | 20 min | Confrontar capacity real com volume de demanda — negociar escopo |
| Comprometimento por milestone | 30 min | Definir quais épicos/features entram em cada milestone |
| Dependências e riscos | 15 min | Mapear dependências cross-team e riscos de execução |
| Recap e compromisso | 10 min | Resumo do que foi comprometido, owners, próximos passos |

### Inputs

- Throughput histórico (últimos 2-3 períodos)
- Capacity calculado (FTEs disponíveis, % sustentação)
- Backlog priorizado pelo Product Manager
- Roadmap vigente com milestones
- Forecasting probabilístico (se disponível)

### Outputs

- Plano do período comprometido (épicos/features por milestone)
- Mapa de dependências e riscos
- Capacity alocado por frente
- Critérios de sucesso do período

### Critérios de Saúde

- [ ] O volume comprometido é compatível com o throughput histórico (não ultrapassa P85)
- [ ] Dependências cross-team estão identificadas e têm owner
- [ ] Há buffer para expedites e sustentação (não é 100% alocado para novas features)
- [ ] A liderança validou o alinhamento estratégico
- [ ] O plano está publicado e acessível a todos os envolvidos

### Anti-padrões

| Anti-padrão | Sintoma | Correção |
|---|---|---|
| Planning por pressão | "Precisamos entregar tudo isso" sem olhar capacity | Trazer throughput histórico como evidência — negociar escopo, não prazo |
| Comprometimento sem dados | Estimativas baseadas em feeling | Usar forecasting probabilístico e throughput real |
| Sem revisão do anterior | Planejar o novo sem olhar o que aconteceu antes | Primeiro bloco: revisão do trimestre anterior com % entregue |
| 100% alocado | Nenhum espaço para sustentação, expedites ou aprendizado | Reservar 15-25% para não-planejado, conforme histórico |

---

## 4. Retrospectiva de Transformação

### Propósito

Refletir sobre a **jornada de transformação** — não sobre entregas individuais. Este ritual acontece ao final de cada onda de execução (do Plano de Ação) ou ao final de cada quarter. O foco é: o que mudou nas práticas, nos papéis, nos processos e na cultura? O que aprendemos? O que ajustamos?

### Cadência e Duração

| Campo | Valor |
|---|---|
| **Cadência** | Ao final de cada onda de execução ou quarter |
| **Duração** | 45–60 min |
| **Formato** | Workshop facilitado (presencial ou remoto) |

### Participantes

| Papel | Responsabilidade no ritual |
|---|---|
| **Change Agent** | Facilita, traz evidências de evolução |
| **Engineering Manager** | Co-facilita, valida percepções |
| **Squad(s)** | Participação ativa — são os protagonistas da reflexão |

### Agenda-tipo

| Bloco | Timebox | Conteúdo |
|---|---|---|
| Check-in | 5 min | Como cada um está se sentindo em relação à transformação (1 palavra) |
| O que mudou | 15 min | Evidências de mudança nas 4 dimensões (Pessoas, Processos, Papéis, Cultura) |
| O que funcionou | 10 min | Práticas que geraram resultado positivo — celebrar |
| O que não funcionou | 10 min | Práticas que não geraram resultado ou geraram resistência |
| O que queremos tentar | 10 min | Experimentos para o próximo ciclo |
| Fechamento | 5 min | Top 3 ações priorizadas com owner |

### Inputs

- Métricas antes/depois da onda (fluxo, qualidade, previsibilidade)
- Feedback coletado ao longo do período
- Plano de Ação: quais ações foram executadas e quais resultados geraram
- Assessment de maturidade (se disponível)

### Outputs

- Lista de práticas validadas (manter)
- Lista de práticas a descontinuar
- 3-5 experimentos para o próximo ciclo com owner
- Atualização do Plano de Ação (se aplicável)

### Critérios de Saúde

- [ ] Toda a squad participa (não apenas o Engineering Manager e o Change Agent)
- [ ] Há pelo menos 1 celebração concreta (algo que melhorou)
- [ ] Experimentos têm owner, prazo e critério de sucesso
- [ ] O ambiente é psicologicamente seguro (as pessoas falam abertamente)
- [ ] As ações da retro anterior são revisadas

### Anti-padrões

| Anti-padrão | Sintoma | Correção |
|---|---|---|
| Retro vira reclamação | Foco em problemas sem proposta de ação | Formato: para cada problema, propor 1 experimento |
| Só positivo | Ninguém aponta o que não funciona | Usar formato anônimo para coletar feedback antes da sessão |
| Sem dados | Discussão baseada em impressões subjetivas | Trazer pelo menos 3 métricas comparativas (antes vs. depois) |
| Retro sem follow-up | Ações definidas, nunca executadas | Primeira pauta da próxima retro: revisão do que foi combinado |
| Só Change Agent facilita | Sempre o mesmo formato, sem variar | Alternar facilitação com Engineering Manager ou membros do time |

---

## Mapa de Cadências

| Ritual | Cadência | Duração | Audiência Principal | Artefato de Suporte |
|---|---|---|---|---|
| Delivery Follow-up | Quinzenal | 30-45 min | Liderança | [Template de Delivery Follow-up](../templates/delivery-follow-up/) |
| Feedback Loop | Trimestral | 60-90 min | Change Agent + Squads | [Template de Feedback Loop](../templates/feedback-loop/) |
| Pre-Planning + Planning | Trimestral | 60 + 120-180 min | Change Agent + PM + EM + Liderança | Roadmap, Capacity, Backlog |
| Retro de Transformação | Fim de onda/quarter | 45-60 min | Squads | Plano de Ação, Métricas |

---

## Referências

- Playbook do Change Agent — [Modelo de Operação](../playbooks/change-agent.md#modelo-de-operação)
- Template de Delivery Follow-up — [templates/delivery-follow-up/](../templates/delivery-follow-up/)
- Template de Feedback Loop — [templates/feedback-loop/](../templates/feedback-loop/)
- Template de Plano de Ação — [templates/plano-de-acao/](../templates/plano-de-acao/)

---

*Este guia é um documento vivo. Contribua com melhorias via [Issues](https://github.com/mmbTR/TR-Change-System/issues).*
