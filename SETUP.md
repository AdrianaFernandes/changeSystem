# Setup - TR Change System

Guia de configuração e inicialização do TR Change System.

## Pré-requisitos

- **Python 3.8+** instalado
- **Git** (opcional, para controle de versão)

## Instalação Rápida

### Opção 1: Setup Automático

Execute o script de setup que verifica o ambiente e instala dependências:

```bash
# Setup completo (recomendado)
python setup.py

# Apenas verificar ambiente
python setup.py --check

# Apenas instalar dependências
python setup.py --install

# Gerar PPTX de demonstração
python setup.py --demo
```

### Opção 2: Setup Manual

1. **Instalar dependências Python:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Verificar instalação:**
   ```bash
   python -c "import pptx; print('✓ python-pptx instalado')"
   ```

3. **Testar gerador de PPTX:**
   ```bash
   python templates/delivery-follow-up/generate_pptx.py \
     templates/delivery-follow-up/dados/dom-nio-cloud_sprint-08.json
   ```

## Estrutura do Projeto

Após a inicialização, você terá a seguinte estrutura:

```
TR-Change-System/
├── setup.py                 # Script de configuração do ambiente
├── requirements.txt         # Dependências Python
├── README.md               # Documentação principal
├── ROADMAP.md             # Planejamento de entregas
├── 
├── playbooks/             # Playbooks do Change Agent
│   └── change-agent.md    # Modelo de operação completo
├── 
├── templates/             # Templates interativos
│   ├── delivery-follow-up/   # Acompanhamento executivo
│   │   ├── delivery-follow-up.html
│   │   ├── generate_pptx.py    # Gerador de PPTX
│   │   └── dados/              # Exemplos de dados
│   ├── diagnostico/           # Avaliação de maturidade
│   ├── plano-de-acao/         # Intervenção estruturada
│   └── feedback-loop/         # Feedback trimestral
├── 
├── guias/                 # Guias de implementação
│   ├── metricas-de-fluxo.md
│   └── linguagem-de-produto.md
├── 
├── rituais/               # Cadências e governança
│   └── governanca.md
├── 
└── contexto-dominio/      # Documentação por contexto
    ├── analises/          # Diagnóstico e métricas
    ├── relatorios/        # Follow-up e reports
    ├── intervencoes/      # Planos de ação
    └── historico/         # Governança e evolução
```

## Uso Básico

### 1. Explorar Templates

Os templates estão disponíveis em formato HTML interativo:

- **[Delivery Follow-up](templates/delivery-follow-up/delivery-follow-up.html)** — Status executivo quinzenal
- **[Diagnóstico](templates/diagnostico/diagnostico.html)** — Avaliação de maturidade
- **[Plano de Ação](templates/plano-de-acao/plano-de-acao.html)** — Intervenção estruturada
- **[Feedback Loop](templates/feedback-loop/feedback-loop.html)** — Retrospectiva trimestral

### 2. Gerar PPTX Executivo

Para converter dados do template Delivery Follow-up em apresentação PPTX:

```bash
# Gerar PPTX a partir de JSON exportado
python templates/delivery-follow-up/generate_pptx.py dados/meu-projeto.json

# Especificar arquivo de saída
python templates/delivery-follow-up/generate_pptx.py dados/meu-projeto.json minha-apresentacao.pptx
```

### 3. Ler Documentação

- **[README.md](README.md)** — Visão geral e quick start
- **[Playbook](playbooks/change-agent.md)** — Modelo de operação do Change Agent
- **[Rituais](rituais/governanca.md)** — 4 rituais de governança
- **[Métricas de Fluxo](guias/metricas-de-fluxo.md)** — Implementação progressiva de métricas

## Troubleshooting

### Problemas Comuns

**Erro: python-pptx não instalado**
```bash
pip install python-pptx
```

**Erro: Python muito antigo**
```bash
# Verificar versão
python --version

# Atualizar para Python 3.8+
# https://www.python.org/downloads/
```

**Erro de encoding no Windows**
```bash
# Executar com encoding UTF-8
python -c "print('teste: ✓ OK')"

# Se falhar, usar:
set PYTHONIOENCODING=utf-8
python setup.py
```

### Suporte

Para questões técnicas:
1. Verifique a documentação em [README.md](README.md)
2. Execute `python setup.py --check` para diagnóstico
3. Abra uma [Issue](https://github.com/mmbTR/TR-Change-System/issues) no repositório

---

**Próximos Passos:** Leia o [README.md](README.md) para entender o modelo de atuação do Change Agent e explore os templates interativos.