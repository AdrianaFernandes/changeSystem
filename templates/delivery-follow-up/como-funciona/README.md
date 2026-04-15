# Como Funciona — Delivery Follow-up

Guia completo para Change Agents utilizarem a ferramenta de Delivery Follow-up do TR Change | Forge Enabler.

---

## Princípio Fundamental: Fonte Única da Verdade

> **Os dados deste follow-up não são criados aqui — são extraídos das ferramentas de gestão oficiais da Thomson Reuters.**

As fontes primárias de informação são:

- **Azure DevOps** — demandas, épicos, features, user stories, tasks, sprints, boards, incidentes
- **ServiceNow** — incidentes, demandas, SLAs
- **Salesforce** — suporte, demandas de clientes, pipeline comercial
- **SGD** — suporte e demandas

### O papel do Change Agent

1. **Extrair** os dados dessas ferramentas e consolidá-los no formulário de follow-up.
2. **Validar** as informações com os Delivery Managers antes de publicar ou apresentar.
3. **Garantir a qualidade da fonte.** Se as informações nas ferramentas de gestão estiverem incompletas, desatualizadas ou mal organizadas, o Change Agent deve:
   - Orientar os times sobre o uso adequado das ferramentas (campos obrigatórios, status atualizados, hierarquia correta de work items).
   - Registrar a inconsistência como **Risco** na seção "Riscos e Plano de Ação", com um plano de ação claro e targets para correção.
   - Dar visibilidade recorrente a problemas de aderência dos times com as ferramentas, garantindo que a liderança acompanhe a evolução.

### Por que isso importa

Se a ferramenta de gestão não reflete a realidade, nenhum report será confiável. O follow-up perde valor quando os dados são estimados em vez de extraídos. O Change Agent é o guardião dessa cadeia: **ferramentas atualizadas → dados confiáveis → decisões informadas**.

---

## 1. Acesso

Abra o formulário diretamente no navegador:

**https://mmbtr.github.io/TR-Change-System/templates/delivery-follow-up/delivery-follow-up.html**

Não é necessário instalar nada. Tudo funciona 100% no browser.

---

## 2. Passo a passo

### 2.1 Preencher os dados

1. **Dados Gerais** — Informe o Programa/Produto, Sprint ou Período, data do follow-up e responsável.
2. **Pendências da última Reunião** — Registre itens pendentes do follow-up anterior que precisam de acompanhamento. Se for o primeiro follow-up, deixe em branco.
3. **Dashboard Consolidado** — Preencha os KPIs de entregas (assumidas, realizadas, bloqueadas, atrasadas) e os indicadores de progresso.
4. **1.1 Consolidado por Frente** — Quebre os números por área de desenvolvimento (ex.: Contábil, Folha, Plataforma). Informe Total de Features, Entregues, Em Andamento e Atrasadas para cada frente. A visualização com percentual e gap é gerada automaticamente no PPTX.
5. **Principais Entregas do Período** — Detalhe as entregas da sprint atual: concluídas, em andamento e itens em atenção.
6. **Riscos e Plano de Ação** — Registre riscos ativos com severidade, área afetada, plano de ação, owner e prazo.
7. **Roadmap** — Registre as iniciativas estratégicas com foco em outcomes: resultado esperado, baseline, valor atual e previsão.
8. **Enablers** — Iniciativas paralelas que habilitam o delivery.
9. **Decisões Necessárias** — Itens que requerem decisão ou escalação da liderança.

### 2.2 Gerar o PPTX

Clique no botão **Gerar PPTX** na barra superior. A apresentação executiva será baixada automaticamente no seu computador, pronta para uso no fórum de follow-up.

### 2.3 Salvar (Publicar)

Clique em **Publicar** para salvar os dados no repositório compartilhado. Na primeira vez, configure o token de acesso:

1. Clique em **Config** na barra superior.
2. Em **GitHub Token**, insira seu Personal Access Token (crie em github.com/settings/tokens com scope `repo`). O token fica salvo apenas no seu navegador.
3. Em **Repositório**, confirme `mmbTR/TR-Change-System`.
4. Em **Pasta de dados**, use o caminho com a pasta do seu segmento: `templates/delivery-follow-up/dados/[segmento]` (ex.: `templates/delivery-follow-up/dados/dominio-cloud`).
5. Clique **Salvar**.

> **Importante:** Cada segmento (programa/produto) deve ter sua própria pasta dentro de `dados/`. Isso organiza o histórico por operação e facilita o acesso de outros Change Agents. Exemplos:
> - `templates/delivery-follow-up/dados/dominio-cloud`
> - `templates/delivery-follow-up/dados/onvio`
> - `templates/delivery-follow-up/dados/plataforma-integracao`

Ao publicar, o arquivo JSON é salvo com o nome `[produto]_[periodo].json` (ex.: `dominio-cloud_sprint-14.json`).

### 2.4 Consultar históricos

Clique em **Histórico** na barra superior. O painel lateral listará todos os follow-ups salvos na pasta configurada. Clique em qualquer item para carregar os dados no formulário.

### 2.5 Rascunho local

Enquanto estiver preenchendo, use o botão **Rascunho** para salvar temporariamente no seu navegador. Útil para não perder dados enquanto ainda não publicou. O rascunho é local (só você vê) e não substitui a publicação.

---

## 3. Boas Práticas

### Progresso e KPIs

- O **Progresso** (% Conclusão, Velocity, Features no Backlog) é **em relação ao trimestre**.
- Se o planejamento trimestral não estiver claro no segmento ou em alguma frente específica, **deixe o campo em branco**. Não invente números — é melhor um campo vazio do que um dado impreciso.

### Entregas e Features

- O número de entregas e/ou features deve fazer referência a **entregas de valor com impacto no negócio**, alinhadas a necessidades do produto, tecnológicas, de compliance ou segurança.
- **Não considere entregas puramente técnicas** como "front-end", "back-end", "refatoração de API" ou "migração de banco" isoladamente. Essas são parte de uma entrega de valor, não a entrega em si.
- Pergunte-se: *"Essa entrega, sozinha, gera valor perceptível para o cliente ou para o negócio?"* Se sim, conta. Se não, é parte de uma entrega maior.

### Consolidado por Frente

- Preencha apenas as frentes que possuem planejamento trimestral definido.
- O percentual é calculado automaticamente (Entregues / Total Features).
- Se uma frente ainda não tem clareza sobre o total planejado, **não inclua** — ela pode ser adicionada nos próximos follow-ups.

### Principais Entregas do Período

Esta seção faz referência à **sprint atual** (não ao trimestre). O objetivo é dar visibilidade sobre o que foi entregue, o que está em progresso e o que precisa de atenção neste ciclo.

**Entregas Concluídas**
- Liste as features ou entregas de valor finalizadas na sprint.

**Em Andamento**
- O olhar deve estar na **entrega de valor**. Se uma feature tem duração maior que uma sprint e ainda não foi concluída ao final do período, ela aparece aqui como "Em Andamento".
- O **percentual de progresso** (coluna "Realizado") deve ser calculado com a soma do **Original Estimated** e **Completed Work** de todas as tasks vinculadas àquela entrega. Exemplo: se a feature possui 5 tasks com estimativa total de 40h e 30h já completadas, o progresso é 75%.
- O campo **Target** indica a data prevista de conclusão.

**Itens em Atenção**
- Features que estão atrasadas, bloqueadas ou com risco significativo de não serem entregues na data prevista.
- Inclua o motivo do atraso e o número de dias — isso alimenta a conversa de riscos no fórum.

**Quando usar User Stories como entregas:**
- Caso a frente possua entregas de valor bem fatiadas e a nível de User Story — ou seja, são concluídas no período de uma única sprint — User Stories podem ser apontadas como entregas relevantes.
- O critério permanece o mesmo: a User Story deve representar **valor perceptível** para o cliente ou negócio, não apenas um incremento técnico.

### Roadmap

O Roadmap é orientado a **outcomes** (resultados), não a entregas ou tarefas. A pergunta central é: *"Qual resultado de negócio ou produto estamos perseguindo?"*

Cada linha do roadmap conecta uma **iniciativa ou frente** a um **resultado mensurável**:

| Campo | O que preencher |
|---|---|
| **Iniciativa / Frente** | A iniciativa estratégica ou frente de trabalho (ex.: "Adoção Cloud", "Redução de Churn", "Automação Fiscal") |
| **Resultado esperado** | O outcome que se busca atingir, preferencialmente com indicador (ex.: "NPS de 72→80", "Churn de 5%→3%", "100% dos clientes migrados") |
| **Baseline** | O valor de referência no início do período (o "de onde partimos") |
| **Valor Atual** | O valor mais recente do indicador (o "onde estamos agora") |
| **Previsão** | Quando se espera atingir o resultado (mês/trimestre) |
| **Status** | On Track (🟢), Atenção (🟡), Crítico (🔴) ou Futuro (⬜) |

**Boas práticas:**
- Foque no **"para quê"**, não no **"como"**. Evite listar entregas técnicas.
- Se o indicador ainda não tem medição formal, registre a melhor aproximação e sinalize no status.
- Atualize Baseline apenas quando houver replanejamento. Atualize Valor Atual a cada follow-up.
- A evolução de Baseline → Valor Atual → Resultado esperado ao longo dos follow-ups mostra a trajetória de impacto do delivery.

### Enablers

Enablers são **iniciativas paralelas ou entre frentes** que habilitam uma melhor estrutura de delivery. Exemplos:

- Design System
- Evolução no pipeline de CI/CD
- Plano de capacitação do time
- Evolução de Agents (automação, IA)
- Contratações em andamento
- Tratativas com parceiros internos (Suporte, Comercial, Produto) ou externos

### Decisões Necessárias

- São **pedidos de ajuda ou escalação** que o fórum de liderança ajudaria a destravar.
- Deve conter contexto suficiente para que a liderança entenda o problema sem ter participado das discussões anteriores.
- Inclua opções e uma recomendação clara — facilite a tomada de decisão.
- Se não houver decisões pendentes, não é necessário preencher esta seção.

### Pendências da Última Reunião

- Sempre revise as pendências do follow-up anterior antes de iniciar um novo.
- Atualize o status de cada item: resolvido (🟢), em progresso (🟡) ou bloqueado (🔴).
- Itens resolvidos podem ser mantidos por um ciclo para registro e depois removidos.

---

## 4. Estrutura de Dados

Os arquivos são organizados por segmento dentro da pasta `dados/`:

```
templates/delivery-follow-up/
├── delivery-follow-up.html    ← formulário interativo
├── como-funciona/
│   └── README.md              ← este guia
└── dados/
    ├── dominio-cloud/
    │   ├── dominio-cloud_sprint-12.json
    │   ├── dominio-cloud_sprint-13.json
    │   └── dominio-cloud_sprint-14.json
    ├── onvio/
    │   └── onvio_sprint-14.json
    └── plataforma-integracao/
        └── plataforma-integracao_q2-2026.json
```

Cada JSON contém todos os campos preenchidos no formulário e pode ser recarregado a qualquer momento via **Histórico**.

---

## 5. Dúvidas frequentes

**Preciso instalar algo?**
Não. Funciona em qualquer navegador moderno.

**Quem consegue ver os dados publicados?**
Todos que têm acesso ao repositório `mmbTR/TR-Change-System`.

**Posso editar um follow-up já publicado?**
Sim. Carregue pelo Histórico, edite e publique novamente. O arquivo será atualizado (mesmo nome = mesma versão).

**E se eu preencher errado?**
Publique a correção por cima. O Git mantém o histórico de versões automaticamente.

**Posso gerar o PPTX sem publicar?**
Sim. O botão Gerar PPTX funciona independentemente — apenas baixa o arquivo no seu computador.

---

*Thomson Reuters · TR Change | Forge Enabler*
