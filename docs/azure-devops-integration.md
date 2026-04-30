# Integração Azure DevOps + TR Change System

Guia para conectar dados do Azure DevOps aos templates do TR Change System.

## 🔐 Configuração Segura

### 1. Gerar Personal Access Token

1. Acesse: `https://dev.azure.com/tr-ggo/_usersSettings/tokens`
2. **New Token** → Configure:
   - **Name:** TR Change System Integration
   - **Organization:** tr-ggo
   - **Expiration:** 30 dias (recomendado)
   - **Scopes:** 
     - Work Items: Read
     - Code: Read
     - Build: Read
     - Release: Read

### 2. Configurar Variável de Ambiente

```powershell
# Configure o token de forma segura (PowerShell)
$env:AZURE_DEVOPS_EXT_PAT = "seu_token_aqui"

# Ou use o script de integração fornecido
.\azure-devops-integration.ps1
```

## 📊 Coleta de Métricas

### Métricas Disponíveis

| Métrica | API Endpoint | Template TR Change |
|---------|--------------|-------------------|
| Work Items | `/wit/workitems` | Delivery Follow-up |
| Pull Requests | `/git/pullrequests` | Métricas de Fluxo |
| Builds | `/build/builds` | Enablers |
| Releases | `/release/releases` | Roadmap |
| Test Results | `/test/runs` | Sprint Health |

### Script de Coleta Automática

```powershell
# Executar coleta de métricas
.\azure-devops-integration.ps1

# Ou usar Azure CLI
az boards work-item list --organization https://dev.azure.com/tr-ggo/
az repos list --organization https://dev.azure.com/tr-ggo/
az pipelines build list --organization https://dev.azure.com/tr-ggo/
```

## 🔄 Integração com Templates

### 1. Delivery Follow-up

Dados coletados alimentam automaticamente:
- **KPIs de Entrega:** Assumidas, Realizadas, Bloqueadas
- **Progresso:** % Conclusão, Velocity
- **Entregas:** Concluídas, Em Andamento, Atenção

### 2. Diagnóstico de Maturidade

Análise automática de:
- **Qualidade de Código:** Code coverage, vulnerabilidades
- **Processo:** Lead time, cycle time, deployment frequency
- **Cultura:** Colaboração em PRs, revisões

### 3. Métricas DORA

```json
{
  "deploymentFrequency": "calculado automaticamente",
  "leadTime": "desde work item até produção",
  "meanTimeToRestore": "análise de incidents",
  "changeFailureRate": "rollbacks/total deployments"
}
```

## 🚀 Automatização

### GitHub Actions / Azure Pipelines

```yaml
# .github/workflows/tr-change-metrics.yml
name: TR Change System - Collect Metrics

on:
  schedule:
    - cron: '0 9 * * MON'  # Segunda às 9h

jobs:
  collect-metrics:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Collect Azure DevOps Metrics
        run: |
          # Script de coleta
          python scripts/collect-devops-metrics.py
      - name: Update Delivery Follow-up
        run: |
          # Atualizar template com novos dados
          python scripts/update-delivery-template.py
```

## 📈 Dashboard Consolidado

### Power BI / Grafana Integration

1. **Fonte de Dados:** APIs Azure DevOps
2. **ETL:** Scripts PowerShell/Python
3. **Visualização:** Templates TR Change System
4. **Cadência:** Atualização semanal automática

## 🛡️ Segurança e Compliance

### Boas Práticas

- ✅ **Tokens com escopo mínimo** (princípio do menor privilégio)
- ✅ **Rotação regular** de tokens (30-90 dias)
- ✅ **Variáveis de ambiente** para credenciais
- ✅ **Logs de auditoria** de acessos
- ✅ **Criptografia** de dados em trânsito e repouso

### Thomson Reuters Compliance

- Conforme políticas TR de data governance
- Dados permanecem dentro do tenant TR
- Auditoria completa de acessos
- Classificação de dados aplicada

## 📞 Troubleshooting

### Problemas Comuns

**Token inválido:**
```
Error: Invalid token
Solução: Verificar expiração e escopo do PAT
```

**Timeout de API:**
```
Error: Request timeout
Solução: Implementar retry logic e paginação
```

**Rate limiting:**
```
Error: Too many requests
Solução: Implementar throttling (max 200 req/min)
```

## 🔗 Links Úteis

- [Azure DevOps REST API](https://docs.microsoft.com/en-us/rest/api/azure/devops/)
- [Azure CLI DevOps Extension](https://github.com/Azure/azure-devops-cli-extension)
- [TR Change System Templates](../templates/)
- [Métricas DORA](https://cloud.google.com/blog/products/devops-sre/using-the-four-keys-to-measure-your-devops-performance)