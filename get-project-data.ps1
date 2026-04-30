# Coleta de Dados do Projeto - TR Change System
# =============================================

param(
    [Parameter(Mandatory=$true)]
    [string]$Token,
    [Parameter(Mandatory=$true)]
    [string]$Project,
    [string]$Organization = "tr-ggo"
)

Write-Host "TR Change System - Coletando dados do projeto: $Project" -ForegroundColor Green
Write-Host "=" * 60

# Headers para API calls
$base64AuthInfo = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes(":$Token"))
$headers = @{
    Authorization = "Basic $base64AuthInfo"
    'Content-Type' = 'application/json'
}

$apiVersion = "api-version=6.0"

try {
    Write-Host "1. Coletando repositórios..." -ForegroundColor Yellow

    $reposUri = "https://dev.azure.com/$Organization/$Project/_apis/git/repositories"
    $reposFullUri = "$reposUri" + "?" + "$apiVersion"
    $repos = Invoke-RestMethod -Uri $reposFullUri -Headers $headers -Method Get

    Write-Host "   ✅ $($repos.value.Count) repositórios encontrados" -ForegroundColor Green

    Write-Host "2. Coletando build pipelines..." -ForegroundColor Yellow

    $buildsUri = "https://dev.azure.com/$Organization/$Project/_apis/build/definitions"
    $buildsFullUri = "$buildsUri" + "?" + "$apiVersion"
    $builds = Invoke-RestMethod -Uri $buildsFullUri -Headers $headers -Method Get

    Write-Host "   ✅ $($builds.value.Count) pipelines encontrados" -ForegroundColor Green

    Write-Host "3. Coletando work items (últimos 30 dias)..." -ForegroundColor Yellow

    # Query WIQL para work items recentes
    $wiqlUri = "https://dev.azure.com/$Organization/$Project/_apis/wit/wiql"
    $wiqlFullUri = "$wiqlUri" + "?" + "$apiVersion"

    $wiqlQuery = @{
        query = @"
SELECT [System.Id], [System.Title], [System.State], [System.WorkItemType], [System.CreatedDate], [System.ChangedDate]
FROM WorkItems
WHERE [System.TeamProject] = '$Project'
AND [System.ChangedDate] >= '@Today - 30'
ORDER BY [System.ChangedDate] DESC
"@
    }

    $workItemsResult = Invoke-RestMethod -Uri $wiqlFullUri -Headers $headers -Method Post -Body ($wiqlQuery | ConvertTo-Json)
    Write-Host "   ✅ $($workItemsResult.workItems.Count) work items encontrados" -ForegroundColor Green

    # Consolidar dados para TR Change System
    $trData = @{
        meta = @{
            organization = $Organization
            project = $Project
            timestamp = (Get-Date -Format "yyyy-MM-ddTHH:mm:ssZ")
            collectedBy = "TR Change System Data Collector"
        }
        summary = @{
            repositories = $repos.value.Count
            buildPipelines = $builds.value.Count
            workItems = $workItemsResult.workItems.Count
            activeRepos = ($repos.value | Where-Object { $_.size -gt 0 }).Count
            enabledPipelines = ($builds.value | Where-Object { $_.queueStatus -eq 'enabled' }).Count
        }
        repositories = $repos.value | Select-Object name, size, defaultBranch, remoteUrl, @{Name='lastCommit'; Expression={$_.defaultBranch}}
        buildPipelines = $builds.value | Select-Object name, queueStatus, type, @{Name='folder'; Expression={$_.path}}
        workItemIds = $workItemsResult.workItems | Select-Object -First 50 | ForEach-Object { $_.id }
    }

    # Salvar dados
    $outputFile = "azure-devops-$Project-$(Get-Date -Format 'yyyyMMdd-HHmm').json"
    $trData | ConvertTo-Json -Depth 6 | Out-File -FilePath $outputFile -Encoding UTF8

    Write-Host ""
    Write-Host "📊 RESUMO DOS DADOS COLETADOS" -ForegroundColor Cyan
    Write-Host "=" * 35
    Write-Host "Projeto: $Project" -ForegroundColor White
    Write-Host "Repositórios: $($trData.summary.repositories) (ativos: $($trData.summary.activeRepos))" -ForegroundColor White
    Write-Host "Build Pipelines: $($trData.summary.buildPipelines) (habilitados: $($trData.summary.enabledPipelines))" -ForegroundColor White
    Write-Host "Work Items (30d): $($trData.summary.workItems)" -ForegroundColor White
    Write-Host ""
    Write-Host "📁 Arquivo gerado: $outputFile" -ForegroundColor Green
    Write-Host ""
    Write-Host "🎯 PRÓXIMOS PASSOS:" -ForegroundColor Yellow
    Write-Host "1. Abra o Delivery Follow-up: http://localhost:8000/templates/delivery-follow-up/delivery-follow-up.html"
    Write-Host "2. Use os dados coletados para preencher as métricas"
    Write-Host "3. Gere relatório PPTX automaticamente"

} catch {
    Write-Host "❌ Erro: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Stack: $($_.Exception.StackTrace)" -ForegroundColor Gray
}

Write-Host ""