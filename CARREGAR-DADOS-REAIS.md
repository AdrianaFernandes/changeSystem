# 🔥 Como Carregar Dados Reais do Azure DevOps

## ⚠️ Limitação Atual

O navegador bloqueia requisições diretas para Azure DevOps por políticas CORS. O sistema agora carrega **30+ projetos Thomson Reuters** como fallback, mas para dados reais você precisa de uma das soluções abaixo.

## ✅ Soluções Disponíveis

### 1. 🔧 PowerShell Script (Recomendado)

Use o script existente no projeto:

```powershell
# Execute no diretório do projeto
.\azure-devops-integration.ps1

# Ou o script de coleta
.\collect-real-data.ps1
```

**Vantagens:**
- ✅ Scripts já existem no projeto
- ✅ Acesso completo à API do Azure DevOps
- ✅ Gera arquivo JSON com dados reais
- ✅ Token já configurado

### 2. 📄 Arquivo JSON Local

Atualize `tr-projetos-locais.json` com dados reais:

```json
[
  {
    "name": "Seu Projeto Real",
    "id": "projeto-id-real", 
    "description": "Descrição real do projeto"
  }
]
```

**Como atualizar:**
1. Execute PowerShell para obter lista de projetos
2. Copie resultado para `tr-projetos-locais.json`
3. Sistema carregará automaticamente do arquivo

### 3. 🌐 Proxy Backend (Desenvolvimento)

Para ambiente de desenvolvimento, crie proxy simples:

```javascript
// proxy-server.js
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());

app.get('/api/projects', async (req, res) => {
  const token = '9Lm1hR53FW4XeWobu3jWZZ7TXqDmTXLu9CokH9IudYmUFDnHMserJQQJ99CCACAAAAADXeeUAAASAZDO2NyW';
  
  try {
    const response = await fetch('https://dev.azure.com/tr-ggo/_apis/projects?api-version=7.0', {
      headers: {
        'Authorization': 'Basic ' + Buffer.from(':' + token).toString('base64')
      }
    });
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => console.log('Proxy rodando na porta 3001'));
```

### 4. 🔨 Extensão de Navegador (Desenvolvimento)

Para testes locais, instale extensão CORS:
- **Chrome:** "CORS Unblock" ou "Disable CORS"
- **Firefox:** "CORS Everywhere"

⚠️ **Apenas para desenvolvimento! Nunca em produção!**

## 📊 Dados Atuais Disponíveis

O sistema agora carrega **30 projetos Thomson Reuters**:

### 🏢 Produtos Principais
- Checkpoint Edge & NextGen
- ONESOURCE Tax Technology  
- Westlaw Edge Research
- Reuters News Platform
- Practical Law Platform

### 🛠️ Plataformas Técnicas  
- API Gateway & Auth Platform
- ML Platform & Data Lake
- DevOps Tools & Cloud Infrastructure
- Security Platform & Analytics Engine

### 🇧🇷 Projetos Brasil
- Mastersaf Fiscal Solutions
- TR Fintech & Tax Declaration Framework
- Thomson Reuters Brasil

## 🎯 Próximos Passos

1. **Imediato:** Use os 30 projetos carregados para testar funcionalidades
2. **Dados reais:** Execute PowerShell script para obter projetos atuais  
3. **Personalização:** Atualize `tr-projetos-locais.json` com seus projetos
4. **Produção:** Implemente proxy backend para API real

## 🔍 Como Verificar

Após aplicar solução:

```javascript
// No console do navegador
console.log('Projetos carregados:', document.getElementById('f-produto').options.length);
```

**Esperado:**
- ✅ 30+ projetos no dropdown
- ✅ Nomes realistas de projetos TR
- ✅ Toast notification informando fonte dos dados
- ✅ Funcionalidade completa do sistema