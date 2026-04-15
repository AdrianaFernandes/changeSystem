# Intervenções — Planos de Ação e Padrões de Mudança

> Contexto: ferramentas para intervir quando um problema sistêmico é identificado — plano estruturado e padronização de linguagem.

---

## Documentos

### 1. [Template de Plano de Ação](../../templates/plano-de-acao/plano-de-acao.md)

Estrutura de intervenção coordenada com **ondas de execução** progressivas.

| Bloco | O que cobre |
|---|---|
| **Contexto e Diagnóstico** | Problema, evidência (indicadores + gap), impacto (negócio, time, cliente) |
| **Objetivo e Resultado Esperado** | Objetivo SMART, cenário Agir vs. Não Agir, baseline → meta |
| **Ações Priorizadas** | Tabela com owner, prazo, dependência, status |
| **Ondas de Execução** | Estabilização → Expansão → Consolidação (escopo, critério de avanço) |
| **Governança e Cadência** | Check-in, reporte executivo, retro do plano, critérios de escalação |
| **Riscos do Plano** | Probabilidade × Impacto com mitigação e owner |

**Formatos:** [Markdown](../../templates/plano-de-acao/plano-de-acao.md) · [HTML interativo](../../templates/plano-de-acao/plano-de-acao.html)

**Quando usar:**
- Problema sistêmico identificado no diagnóstico
- Risco do Delivery Follow-up que exige plano estruturado
- Mudança coordenada de processo, papel ou cultura

---

### 2. [Guia de Linguagem de Produto](../../guias/linguagem-de-produto.md)

Padrão para transformar itens de trabalho técnicos em linguagem orientada a negócio.

**As 8 Regras:**
1. Títulos com até 80 caracteres, resultado de negócio explícito
2. Descrições em 4 seções: Problema → Impacto → Solução → Resultados
3. Voz ativa
4. Priorizar valor para cliente/negócio
5. Remover redundância
6. Bullets para clareza
7. Não inventar dados
8. Evitar jargão técnico

**Mapeamento por tipo:**

| Tipo | Foco do Título |
|---|---|
| **Épico** | Objetivo estratégico de negócio |
| **Feature** | Capacidade entregue ao cliente |
| **User Story** | Ação do usuário com valor claro |
| **Bug** | Impacto no cliente/negócio |

**Teste rápido:** Se o VP precisa perguntar "mas o que isso significa para o cliente?", a linguagem está errada.

---

## Quando usar

| Situação | Documento |
|---|---|
| Problema sistêmico identificado que requer ação coordenada | Plano de Ação |
| Risco escalado no Delivery Follow-up | Plano de Ação |
| Itens de trabalho com linguagem técnica que não comunica valor | Linguagem de Produto |
| Preparação de Delivery Follow-up (qualidade dos títulos) | Linguagem de Produto |
| Revisão de backlog com Product Manager | Linguagem de Produto |

---

*[Voltar ao Contexto Domínio](../)*
