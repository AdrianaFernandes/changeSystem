# Teste básico de conectividade com Azure DevOps API
param([string]$Token = "9Lm1hR53FW4XeWobu3jWZZ7TXqDmTXLu9CokH9IudYmUFDnHMserJQQJ99CCACAAAAADXeeUAAASAZDO2NyW")

$org = "tr-ggo"
$base64 = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes(":$Token"))
$headers = @{ Authorization = "Basic $base64" }

Write-Host "=== TESTE DE CONECTIVIDADE AZURE DEVOPS ===" -ForegroundColor Green

# Teste 1: Listar projetos
try {
    Write-Host "`n1. Testando listagem de projetos..." -ForegroundColor Cyan
    $projectsUri = "https://dev.azure.com/$org/_apis/projects?api-version=6.0"
    $projects = Invoke-RestMethod -Uri $projectsUri -Headers $headers

    Write-Host "   [OK] $($projects.count) projetos encontrados:" -ForegroundColor Green
    foreach ($project in $projects.value) {
        Write-Host "     • $($project.name)" -ForegroundColor White
    }
} catch {
    Write-Host "   [ERRO] $($_.Exception.Message)" -ForegroundColor Red
}

# Teste 2: Buscar Area Paths do TR Fintech especificamente
try {
    Write-Host "`n2. Testando Area Paths do TR Fintech..." -ForegroundColor Cyan
    $areaUri = "https://dev.azure.com/$org/TR%20Fintech/_apis/wit/classificationnodes/Areas?api-version=6.0"
    $areas = Invoke-RestMethod -Uri $areaUri -Headers $headers

    Write-Host "   [OK] Estrutura encontrada:" -ForegroundColor Green
    Write-Host "     Name: $($areas.name)" -ForegroundColor White
    Write-Host "     Path: $($areas.path)" -ForegroundColor White
    Write-Host "     HasChildren: $($areas.hasChildren)" -ForegroundColor White

    if ($areas.children) {
        Write-Host "     Children: $($areas.children.Count)" -ForegroundColor White
        foreach ($child in $areas.children) {
            Write-Host "       - $($child.name) (HasChildren: $($child.hasChildren))" -ForegroundColor Gray
        }
    }

} catch {
    Write-Host "   [ERRO] $($_.Exception.Message)" -ForegroundColor Red
}

# Teste 3: Work Item Types
try {
    Write-Host "`n3. Testando Work Item Types do TR Fintech..." -ForegroundColor Cyan
    $witUri = "https://dev.azure.com/$org/TR%20Fintech/_apis/wit/workItemTypes?api-version=6.0"
    $workItemTypes = Invoke-RestMethod -Uri $witUri -Headers $headers

    Write-Host "   [OK] $($workItemTypes.count) work item types:" -ForegroundColor Green
    foreach ($wit in $workItemTypes.value) {
        Write-Host "     • $($wit.name) - $($wit.description)" -ForegroundColor White
    }

} catch {
    Write-Host "   [ERRO] $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n=== TESTE CONCLUIDO ===" -ForegroundColor Yellow