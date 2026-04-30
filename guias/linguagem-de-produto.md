# Guia: Linguagem de Produto para Itens de Trabalho

> **Thomson Reuters — TR Change | Forge Enabler**
> Versão 1.0 · Abril 2026

---

## Por que linguagem de produto?

Itens de trabalho escritos em linguagem técnica comunicam **como** algo será feito, mas não **por que** importa. Quando a liderança, Produto e stakeholders leem o board, precisam entender o valor de cada entrega sem decodificar jargão de engenharia.

Linguagem de produto transforma títulos e descrições em textos que:

- Comunicam o **resultado de negócio**, não o detalhe de implementação
- Permitem que qualquer stakeholder entenda o valor em 5 segundos
- Criam alinhamento entre engenharia, produto e negócio
- Elevam a qualidade do Delivery Follow-up e dos reportes executivos

> Se o VP precisa perguntar "mas o que isso significa para o cliente?" ao ler um item, a linguagem está errada.

---

## As 8 Regras

1. **Títulos com até 80 caracteres**, resultado de negócio explícito
2. **Descrições estruturadas** em 4 seções: Problema, Impacto, Solução, Resultados Esperados
3. **Voz ativa** — "Reduzir tempo de processamento" (não "O tempo de processamento será reduzido")
4. **Priorizar valor para cliente e negócio**, não detalhes de implementação
5. **Remover redundância** — manter apenas informações essenciais
6. **Bullets para clareza**, títulos de seção explícitos
7. **Não inventar** números, métricas ou informações que não estejam no item original
8. **Evitar jargão técnico** desnecessário — traduzir para linguagem de negócio

---

## Estrutura Padrão

### Título

`[Resultado de negócio em até 80 caracteres]`

O título deve responder: **o que o cliente/negócio ganha quando isto estiver pronto?**

### Descrição

**Problema**
O que está errado ou o que falta — 1 a 2 frases.

**Impacto no negócio**
- Consequência 1 (em termos de receita, retenção, experiência, risco)
- Consequência 2

**Solução**
O que será entregue em termos de valor para o cliente/negócio (não como será implementado).

**Resultados esperados**
- Benefício 1 (mensurável sempre que possível)
- Benefício 2

---

## Mapeamento por Tipo de Item

A linguagem se adapta ao nível de abstração do item:

| Tipo | Foco do Título | Foco da Descrição | Exemplo de Título |
|---|---|---|---|
| **Épico** | Objetivo estratégico de negócio | Visão, métricas de sucesso, escopo macro | "Reduzir churn em 30% com experiência de onboarding redesenhada" |
| **Feature** | Capacidade entregue ao cliente | Problema, impacto, solução, resultados | "Permitir exportação de relatórios em PDF para reduzir chamados de suporte" |
| **User Story** | Ação do usuário com valor claro | Critérios de aceite orientados ao comportamento esperado | "Como gestor, quero filtrar relatórios por período para analisar tendências" |
| **Bug** | Impacto no cliente/negócio | Comportamento atual vs. esperado, impacto, severidade | "Erro no cálculo fiscal impede fechamento mensal de 200+ clientes" |

### Detalhamento por tipo

#### Épico

- Título: objetivo de negócio de alto nível
- Descrição: visão do resultado, métricas de sucesso (como sabemos que deu certo), escopo macro (o que está dentro e fora)
- Não precisa de detalhes técnicos — esses ficam nas features e stories

#### Feature

- Título: capacidade que o usuário/cliente ganha
- Descrição: estrutura padrão completa (Problema → Impacto → Solução → Resultados)
- Incluir critérios de aceite de alto nível

#### User Story

- Título: formato "Como [persona], quero [ação] para [valor]" ou ação direta com valor claro
- Descrição: critérios de aceite detalhados, cenários de uso
- Foco no comportamento esperado, não na implementação

#### Bug

- Título: impacto no cliente + contexto mínimo
- Descrição: comportamento atual vs. esperado, passos para reproduzir, impacto (quantos clientes, severidade)
- Incluir urgência/criticidade em termos de negócio

---

## Exemplos

### Exemplo 1: Feature — Antes e Depois

**Antes (linguagem técnica):**

> **Título:** Q2.2026 - API Integration Enhancement for Third-Party Service Connection Issues
>
> **Descrição:** Refatorar o módulo de integração com a API de pagamento para tratar erros de timeout e retry. Atualizar a lib de HTTP client para v3.2 e implementar circuit breaker.

**Depois (linguagem de produto):**

> **Título:** Corrigir falhas no processamento de pagamentos para aumentar a receita
>
> **Problema**
> Falhas na integração de pagamento estão causando transações falhas no checkout e impactando a receita.
>
> **Impacto no negócio**
> - Perda direta de receita com transações que não completam
> - Insatisfação do cliente e risco de abandono no checkout
> - Aumento de chamados de suporte e retrabalho operacional
>
> **Solução**
> Ajustar a integração com o provedor de pagamento para garantir estabilidade e tratamento adequado de falhas no fluxo de checkout.
>
> **Resultados esperados**
> - Redução de falhas em transações de pagamento
> - Checkout concluído com sucesso de forma consistente
> - Melhoria na receita e na experiência do cliente

### Exemplo 2: Bug — Antes e Depois

**Antes:**

> **Título:** NullPointerException no serviço de cálculo quando campo X é nulo
>
> **Descrição:** Ao enviar payload sem o campo `taxRate`, o endpoint `/api/calculate` retorna 500. Stack trace em anexo.

**Depois:**

> **Título:** Erro no cálculo fiscal impede fechamento mensal de clientes sem alíquota configurada
>
> **Problema**
> Clientes que não possuem alíquota configurada no cadastro recebem erro ao tentar gerar o cálculo fiscal mensal.
>
> **Impacto no negócio**
> - Clientes bloqueados no fechamento mensal — risco de atraso em obrigações fiscais
> - Aumento de chamados de suporte (estimativa: 50+ clientes impactados por ciclo)
>
> **Solução**
> Garantir que o cálculo trate cenários sem alíquota configurada, aplicando fallback ou orientando o cliente a completar o cadastro.
>
> **Resultados esperados**
> - Zero erros de cálculo por dados incompletos
> - Fechamento mensal fluido para todos os clientes

### Template Genérico

```markdown
**Título:** [Resultado de negócio em até 80 caracteres]

**Problema**
[O que está errado ou falta — 1 a 2 frases.]

**Impacto no negócio**
- [Consequência 1]
- [Consequência 2]

**Solução**
[O que será entregue em termos de valor.]

**Resultados esperados**
- [Benefício 1]
- [Benefício 2]
```

---

## Checklist Rápido

Use este checklist ao criar ou revisar qualquer item de trabalho:

- [ ] Título com até 80 caracteres?
- [ ] Título descreve o **resultado de negócio** (não a implementação)?
- [ ] Descrição tem as 4 seções (Problema, Impacto, Solução, Resultados)?
- [ ] Sem jargão técnico desnecessário?
- [ ] Um VP entenderia o valor em 5 segundos?
- [ ] Nada inventado — baseado apenas no conteúdo original?
- [ ] Voz ativa e bullets para clareza?

---

## Anti-padrões Comuns

| Anti-padrão | Exemplo | Por que é ruim | Correção |
|---|---|---|---|
| **Título técnico** | "Refatorar módulo de cache" | Não comunica valor ao negócio | "Reduzir tempo de carregamento de relatórios de 8s para 2s" |
| **Descrição sem impacto** | "Implementar feature X conforme spec" | Não explica por que importa | Adicionar seção de Impacto com consequências para cliente/negócio |
| **Jargão sem tradução** | "Implementar circuit breaker no gateway" | Stakeholder não entende | "Garantir estabilidade do checkout sob alta demanda" |
| **Título genérico** | "Melhorias de performance" | Não especifica o resultado | "Reduzir tempo de resposta do dashboard de 5s para <1s" |
| **Story sem valor** | "Criar endpoint POST /api/v2/users" | Descreve implementação, não valor | "Permitir cadastro de novos usuários via portal self-service" |
| **Bug sem impacto** | "Fix null pointer em calculateTax" | Não comunica severidade | "Erro no cálculo fiscal bloqueia 200+ clientes no fechamento" |

---

## Referências

- Playbook do Change Agent — [Ferramentas e Artefatos](../playbooks/change-agent.md#ferramentas-e-artefatos)
- TR Change | Forge Enabler — [README](../README.md)

---

*Este guia é um documento vivo. Contribua com melhorias via [Issues](https://github.com/mmbTR/TR-Change-System/issues).*
