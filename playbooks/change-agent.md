# Playbook do Change Agent

> **Thomson Reuters — TR Change | Forge Enabler**
> Versão 1.0 · Abril 2026

---

## Sumário

1. [Identidade](#identidade)
2. [Pilares de Atuação](#pilares-de-atuação)
3. [Toolkit de Fluxo](#toolkit-de-fluxo)
4. [Modelo de Operação](#modelo-de-operação)
5. [Outcomes Esperados](#outcomes-esperados)
6. [Métricas de Referência](#métricas-de-referência)
7. [Ferramentas e Artefatos](#ferramentas-e-artefatos)
8. [Anti-padrões](#anti-padrões)

---

## Identidade

O **Change Agent** é a evolução do papel tradicional de Agile Coach. Mais do que ensinar frameworks ou apoiar times em suas rotinas, o Change Agent transcende o status quo e se posiciona como um **tracionador ativo do time de tecnologia**.

Seu foco está em garantir que cada etapa da adoção e da transformação cultural seja **concreta, prática e orientada a resultados mensuráveis**.

### O diferencial: change work, não assessment

A era em que o coach precisava de 4-6 semanas de assessment antes de agir acabou. Dados de fluxo — dashboards, métricas de processo, investigações automatizadas — entregam o diagnóstico antes do dia 1.

O que separa um Change Agent efetivo de um que "entrega relatório e torce para que algo mude" não é a capacidade analítica. É o **change work**: a habilidade de navegar a política organizacional, conectar evidências a compromissos que a liderança já assumiu publicamente, construir cenários com timelines concretos, e fazer a recomendação certa aterrissar com a pessoa certa no momento certo.


### O que muda

| Agile Coach Tradicional | Change Agent |
|---|---|
| Guardião do framework ágil | Catalisador da transformação |
| Facilita cerimônias | Lê o sistema e intervém com precisão |
| Foco em rituais e métricas de processo | Foco em outcomes de negócio e cultura |
| Atua dentro do time | Atua como elo entre estratégia e execução |
| Reativo a problemas de processo | Sensor proativo de fricção e oportunidade |
| Semanas de assessment antes de agir | Chega preparado com dados, age no dia 1 |
| Apresenta achados genéricos | Conecta evidência a compromissos da liderança |

---

## Pilares de Atuação

O Change Agent opera em **quatro dimensões**:

### 1. Pessoas

Entender em que estágio de maturidade cada membro do time está na sua jornada de transformação. Identificar dificuldades individuais e coletivas e criar as condições para que cada um avance com confiança e suporte.

**Na prática:**
- Mapear maturidade por papel (Engineering Manager, Desenvolvedor, QA, DBA, DevSecOps)
- Identificar gaps de competência e propor ações de desenvolvimento
- Apoiar a transição de cada profissional do papel tradicional para o novo modelo

### 2. Processos

Mapear como os processos existentes precisam evoluir para suportar o novo modelo de trabalho. Revisar cerimônias, fluxos de trabalho, critérios de pronto, formas de colaboração.

**Na prática:**
- Auditar processos atuais vs. necessidade do modelo-alvo
- Propor simplificações (reduzir burocracia, não criar mais)
- Garantir que DoR e DoD reflitam o novo padrão de entrega

### 3. Papéis

Apoiar a transição de cada profissional para o seu novo escopo de responsabilidades. Ajudar cada um a compreender as novas formas de colaboração e o novo padrão de entrega esperado.

**Na prática:**
- Engineering Manager → orquestrador de sistemas (pessoas + ferramentas)
- Desenvolvedor → arquiteto e validador (menos executor manual)
- QA → planejador e validador de qualidade (menos executor de teste)
- DevOps → DevSecOps (segurança integrada ao pipeline)

### 4. Cultura

Cultivar uma cultura de experimentação, aprendizado contínuo e colaboração. A transformação exige que o time esteja confortável com errar rápido, aprender e iterar.

**Na prática:**
- Criar ambiente psicológico seguro para a mudança
- Celebrar evoluções (por menores que sejam)
- Implantar ciclos de feedback rápidos e honestos
- Promover blameless postmortems como ferramenta de aprendizado

---

## Toolkit de Fluxo

O Change Agent gerencia o **fluxo de trabalho**, não as pessoas. As decisões devem ser baseadas em dados de fluxo, não em intuição ou estimativas subjetivas.

### As 4 métricas de fluxo

Estas métricas são interconectadas pela **Lei de Little** (`Cycle Time = WIP / Throughput`). Alterar uma afeta as outras. Nunca otimize uma métrica isoladamente.

| Métrica | O que mede | Por que importa |
|---|---|---|
| **Cycle Time** | Tempo do commit ao trabalho até a entrega | Responde "quando vai ficar pronto?" |
| **Throughput** | Itens entregues por unidade de tempo | Responde "quanto conseguimos entregar neste período?" |
| **WIP** (Work in Progress) | Itens em andamento no sistema | Controla a carga: WIP menor = cycle times menores = mais foco |
| **Age of WIP** | Há quanto tempo cada item em andamento está no fluxo | O indicador mais crítico: se age of WIP >> cycle time médio, itens estão envelhecendo no sistema |

### Princípio: Stop Starting, Start Finishing

Antes de puxar trabalho novo, varrer o board da direita para a esquerda:

1. Há itens esperando revisão ou aprovação? **Desbloqueie-os primeiro.**
2. Há itens sem owner que podem ser concluídos? **Assuma-os.**
3. Há work items com feedback pendente? **Resolva antes de iniciar novo trabalho.**
4. Só puxe item novo se **literalmente não há nada** que você possa fazer para mover trabalho existente.

Essa política já limita o WIP naturalmente, sem impor limites artificiais que geram resistência. À medida que o time amadurece, introduza WIP limits progressivamente: pessoal → por coluna → sistema inteiro. Uma mudança por vez, medindo o impacto.

### Blocker Clustering

Blockers são a principal causa de inflação nos cycle times. O Change Agent deve:

1. **Categorizar** cada blocker ao aparecer (Dependência Externa, Dependência Interna, Requisitos Indefinidos, Expedite/Urgência, Ambiente/Infra)
2. **Medir** o tempo total bloqueado por categoria
3. **Priorizar** a categoria que mais impacta o cycle time
4. **Aplicar 5 Whys** na causa raiz da categoria mais impactante
5. **Eliminar** a causa raiz com mudança de prática (não com heroísmo individual)

> Exemplo real: um time descobriu que 38% do tempo bloqueado era causado por "Requisitos Indefinidos". A causa raiz: ausência de DoR e critérios de aceite. Ao introduzir essa prática, reduziram o cycle time em 40%.

### Forecasting probabilístico (não use médias)

Médias (mean, median, mode) não são confiáveis para previsões de entrega. Distribuições de cycle time tipicamente têm cauda longa — a média mascara a variabilidade real.

**Em vez de:** "Entregamos em média em 7 dias"

**Use:** uma tabela de percentis:

| Probabilidade | Cycle Time |
|---|---|
| 50% (1 em 2 chances) | `[X]` dias |
| 70% | `[Y]` dias |
| 85% (recomendado para compromissos) | `[Z]` dias |
| 95% | `[W]` dias |

Deixe o stakeholder escolher o nível de risco que aceita. Quanto mais estável o sistema, mais próximos os valores dos percentis. Se há grande dispersão entre P50 e P95, o sistema é instável e precisa de intervenção.

---

## Modelo de Operação

O Change Agent opera em **5 passos recorrentes**:

### Passo 1 — Compreender o modelo de trabalho

Entender profundamente como o time opera hoje e como o modelo-alvo funciona. Sem este entendimento, será impossível identificar fricções, propor mudanças de processo e influenciar o time com credibilidade.

> O Change Agent não precisa ser o mais técnico da sala, mas precisa entender o suficiente para enxergar onde a transformação está fluindo e onde está travando.

**Checklist:**
- [ ] Entendo o ciclo de desenvolvimento atual do time
- [ ] Conheço as ferramentas e pipelines em uso
- [ ] Sei quais são os quality gates existentes
- [ ] Entendo as métricas que o time acompanha (ou não acompanha)
- [ ] Conheço as dependências cross-team que afetam a entrega

### Passo 2 — Redefinir o modelo de atuação

No modelo tradicional, grande parte do tempo era dedicada a facilitar cerimônias e promover adoção de frameworks. No novo modelo, o foco se amplia para as quatro dimensões (Pessoas, Processos, Papéis, Cultura).

**Checklist:**
- [ ] Mapeei a maturidade de cada membro/squad nas 4 dimensões
- [ ] Tenho um diagnóstico claro de onde estão as maiores fricções
- [ ] Defini prioridades de atuação (não tudo ao mesmo tempo)
- [ ] Alinhei meu plano com o Engineering Manager

### Passo 3 — Atuar como elo entre estratégia e execução

Estar próximo da liderança para entender prioridades e desafios da transformação, e próximo do time para entender onde estão as resistências, dúvidas e oportunidades de aceleração.

**Na prática:**
- Conectar Engineering Managers, Líderes de Segmento, Produto e Squads em torno dos mesmos objetivos
- Garantir que processos sejam executados conforme as regras estabelecidas
- Traduzir a visão estratégica em ações concretas no dia a dia
- Facilitar a mudança com **influência**, não com autoridade

#### 3 Perguntas antes de cada reunião com liderança

Antes de entrar na sala, tenha respostas prontas para:

1. **Quais achados posso vincular a compromissos que a liderança já assumiu publicamente?**
   Passe 10 minutos antes da reunião catalogando declarações públicas da liderança (keynotes, all-hands, e-mails, OKRs). Conecte seus dados de fluxo a esses compromissos existentes — quando a recomendação reforça uma meta que o líder já declarou como sua, a resistência cai drasticamente.

2. **Qual é o cenário "Agir vs. Não Agir" com timeline concreto?**
   Construa duas projeções: (a) se o time adotar a mudança agora, qual é a data provável de melhoria e quanto ganha; (b) se não agir, quanto tempo até o problema escalar e qual o custo projetado. Use dados reais do forecasting probabilístico — não opiniões.

3. **Qual é o pushback mais provável e qual pergunta expõe o custo da inação?**
   Antecipe a resistência. Prepare uma pergunta que faça o decisor confrontar o custo de não agir em seus próprios termos. Ex.: "Se mantivermos o WIP atual, o cycle time P85 projeta `[X]` dias. Com o compromisso de entregar `[Feature Y]` até `[Data Z]`, como compatibilizamos?"

### Passo 4 — Gestão ativa de mudança nos processos e rituais

Liderar a revisão de processos e rituais em parceria com o Engineering Manager, garantindo que:

- Cerimônias reflitam o novo modelo de trabalho
- Critérios de pronto contemplem o padrão de qualidade esperado
- Fluxos de colaboração entre papéis sejam claros e eficientes
- Métricas de acompanhamento estejam definidas e visíveis para todo o time

### Passo 5 — Sensor da transformação

O Change Agent é os olhos e ouvidos da transformação no time. Será o primeiro a perceber quando:

- Um papel está com dificuldade de evoluir
- Um processo está gerando fricção
- A cultura ainda está resistindo à mudança
- Uma conquista merece ser amplificada para inspirar o restante do time

> Esta capacidade de leitura contínua do ambiente é o que diferencia o Change Agent do Agile Coach tradicional — você não apenas facilita rituais, você **lê o sistema** e intervém de forma precisa e oportuna.

---

## Outcomes Esperados

### Eficiência e Fluxo

| Outcome | Indicador |
|---|---|
| Entregas mais rápidas e frequentes | Redução de time-to-market |
| Maior precisão nas estimativas | Previsibilidade elevada |
| Throughput otimizado | Taxa de entrega sustentável sem comprometer qualidade |

### Qualidade e Engenharia

| Outcome | Indicador |
|---|---|
| Redução progressiva do débito técnico | Health do backlog de erros |
| Qualidade incorporada ao processo | Cobertura de testes, CI/CD ativo |
| Menos retrabalho | Redução de itens replanejados |

### Cultura e Organização

| Outcome | Indicador |
|---|---|
| Autonomia e maturidade das squads | Evolução nos assessments |
| Cultura de feedback com segurança psicológica | Ciclos de feedback funcionando |
| Engajamento na transformação | Adesão às novas práticas |

---

## Métricas de Referência

O Change Agent deve monitorar e influenciar as seguintes métricas. A regra de ouro: **nunca otimize uma métrica isoladamente**. Elas são conectadas pela Lei de Little — alterar uma afeta as outras.

### Fluxo e Entrega

- **Cycle Time** — tempo do commit ao trabalho até deploy em produção. Reporte sempre com percentis (P50, P70, P85, P95), nunca como média única
- **Lead Time** — tempo do pedido até entrega ao cliente/negócio
- **Throughput** — itens entregues por período. Use como indicador de estabilidade, não como meta crescente
- **WIP** — trabalho em progresso. O indicador mais acionável: reduzir WIP é a alavanca mais direta para melhorar cycle time
- **Age of WIP** — itens em andamento há mais tempo que o cycle time P85. Itens acima desse threshold são candidatos a intervenção imediata

### Qualidade

- **Cobertura de testes** — % de código coberto por testes automatizados
- **Taxa de bloqueios** — itens bloqueados por sprint, categorizados por tipo (Blocker Clustering)
- **Aging do backlog de erros** — há quanto tempo bugs estão abertos
- **Incidentes em produção** — volume e severidade

### Previsibilidade

> **Não use médias para fazer previsões de entrega.** A média mascara a variabilidade real do sistema. Use a distribuição de frequência dos cycle times (histograma) e deixe o stakeholder escolher o percentil de confiança.

- **Forecasting probabilístico** — "quando estará pronto?" respondido com percentis, não com data única
- **Volume de replanejamento** — itens que deslizaram no trimestre (sintoma de previsibilidade fraca)
- **Capacity desviado** — esforço não planejado consumido (expedites, urgências)

### Transformação

- **% do PDLC realizado com novo modelo** — adoção do modelo-alvo
- **Evolução da autonomia dos times** — assessment periódico
- **Blockers removidos** — impedimentos sistêmicos eliminados (rastreados via Blocker Clustering)

---

## Ferramentas e Artefatos

O Change Agent utiliza os artefatos deste repositório:

| Artefato | Quando usar | Link |
|---|---|---|
| **Template de Diagnóstico** | Ao iniciar atuação em uma nova vertical/time | [templates/diagnostico/](../templates/diagnostico/diagnostico.html) |
| **Template de Delivery Follow-up** | A cada cadência quinzenal de acompanhamento | [templates/delivery-follow-up/](../templates/delivery-follow-up/delivery-follow-up.html) |
| **Template de Plano de Ação** | Ao identificar um problema que exige intervenção estruturada | [templates/plano-de-acao/](../templates/plano-de-acao/plano-de-acao.html) |
| **Template de Feedback Loop** | Ao final de cada quarter, para retrospectiva trimestral de transformação | [templates/feedback-loop/](../templates/feedback-loop/feedback-loop.html) |
| **Rituais de Governança** | Referência para cadências, agendas e critérios dos 4 rituais | [rituais/governanca.md](../rituais/governanca.html) |
| **Guia: Métricas de Fluxo** | Para evoluir o Delivery Follow-up com dados de fluxo (caminho progressivo) | [guias/metricas-de-fluxo.md](../guias/metricas-de-fluxo.html) |
| **Guia: Linguagem de Produto** | Para padronizar linguagem de itens de trabalho orientada a negócio | [guias/linguagem-de-produto.md](../guias/linguagem-de-produto.html) |

---

## Anti-padrões

O que o Change Agent **não faz**:

### Guardião de processo burocrático
Não existe para garantir que o Scrum Guide seja seguido ao pé da letra. O foco é outcome, não compliance com framework.

### Cobrador de status
Não é o papel do Change Agent cobrar status de tarefas. Isso é gestão operacional do Engineering Manager. O Change Agent lê padrões sistêmicos, não tickets individuais.

### Facilitador passivo
Não basta facilitar reuniões. Se a reunião não gera decisão ou ação, o Change Agent deve questionar se ela é necessária.

### Escudo contra mudança
Não proteger o time de mudança "porque já estão sobrecarregados". A transformação exige desconforto controlado. O papel é criar as condições para que a mudança aconteça, não evitá-la.

### Consultor externo
Não atua de fora. O Change Agent está **dentro** do time, com presença ativa, corresponsável pelos resultados. Se o time falha, o Change Agent também falha.

### Dono da verdade
Não impor soluções. Influenciar com dados, argumentos e credibilidade. Conduzir conversas difíceis com empatia e respeito, não com autoridade hierárquica.

---

## Referências

- FORGE — Plano de Operacionalização (Thomson Reuters, 2026)
- TR Change | Forge Enabler — [README](../)

---

*Este playbook é um documento vivo. Contribua com melhorias via [Issues](https://github.com/mmbTR/TR-Change-System/issues).*
