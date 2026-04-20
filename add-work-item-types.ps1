# Adiciona Work Item Types aos projetos no JSON
$dataFile = "tr-latam-real-data.json"

Write-Host "=== ADICIONANDO WORK ITEM TYPES ===" -ForegroundColor Green

# Carregar dados existentes
if (-not (Test-Path $dataFile)) {
    Write-Host "[ERRO] Arquivo $dataFile não encontrado!" -ForegroundColor Red
    exit 1
}

$dados = Get-Content $dataFile -Raw -Encoding UTF8 | ConvertFrom-Json

# Work Item Types comuns do Azure DevOps
$workItemTypesComuns = @(
    @{
        nome = "Epic"
        description = "Iniciativas de grande escala que agrupam funcionalidades"
        icon = "epic"
    },
    @{
        nome = "Feature"
        description = "Funcionalidades do produto entregues aos usuários"
        icon = "feature"
    },
    @{
        nome = "User Story"
        description = "Requisitos funcionais do ponto de vista do usuário"
        icon = "story"
    },
    @{
        nome = "Task"
        description = "Atividades específicas e tarefas de desenvolvimento"
        icon = "task"
    },
    @{
        nome = "Bug"
        description = "Defeitos e problemas que precisam ser corrigidos"
        icon = "bug"
    },
    @{
        nome = "Issue"
        description = "Problemas ou questões identificadas durante desenvolvimento"
        icon = "issue"
    },
    @{
        nome = "Test Case"
        description = "Casos de teste para validação de funcionalidades"
        icon = "test"
    },
    @{
        nome = "Product Backlog Item"
        description = "Itens do backlog do produto para desenvolvimento"
        icon = "backlog"
    }
)

$projetosAtualizados = 0

# Adicionar work item types a cada projeto
foreach ($projeto in $dados.projetos.PSObject.Properties) {
    $nomeProject = $projeto.Name
    $projectData = $projeto.Value

    Write-Host "Adicionando work item types ao projeto: $nomeProject" -ForegroundColor Cyan

    # Criar array de work item types se não existir
    if (-not $projectData.work_item_types) {
        $projectData | Add-Member -MemberType NoteProperty -Name "work_item_types" -Value @()
    }

    # Adicionar work item types comuns
    $projectData.work_item_types = $workItemTypesComuns

    Write-Host "  [OK] $($workItemTypesComuns.Count) work item types adicionados" -ForegroundColor Green
    $projetosAtualizados++
}

# Salvar dados atualizados
$dados | ConvertTo-Json -Depth 10 | Out-File $dataFile -Encoding UTF8

Write-Host "`n=== RESUMO ===" -ForegroundColor Yellow
Write-Host "Projetos atualizados: $projetosAtualizados" -ForegroundColor White
Write-Host "Work Item Types por projeto: $($workItemTypesComuns.Count)" -ForegroundColor White
Write-Host "Arquivo atualizado: $dataFile" -ForegroundColor Green

Write-Host "`n[OK] Work Item Types adicionados com sucesso!" -ForegroundColor Green
Write-Host "[INFO] Recarregue o template para ver os work item types funcionando" -ForegroundColor Cyan