# SCRIPT PARA BUSCAR DADOS REAIS DO AZURE DEVOPS
param(
    [string]$Project = "Mastersaf Fiscal Solutions",
    [string[]]$AreaPaths = @(),
    [string[]]$IterationPaths = @(),
    [string[]]$WorkItemTypes = @("User Story", "Feature"),
    [string]$Organization = "thomsonreuters",
    [string]$PAT = ""
)

# Configurações
if (-not $PAT) {
    Write-Host "❌ Token PAT não fornecido!" -ForegroundColor Red
    exit 1
}

$baseUrl = "https://dev.azure.com/$Organization"
$headers = @{
    'Authorization' = "Basic " + [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes(":$PAT"))
    'Content-Type' = 'application/json'
}

# Construir WIQL Query
$whereConditions = @()
$whereConditions += "[System.TeamProject] = '$Project'"

if ($WorkItemTypes.Count -gt 0) {
    $workItemTypesStr = ($WorkItemTypes | ForEach-Object { "'$_'" }) -join ", "
    $whereConditions += "[System.WorkItemType] IN ($workItemTypesStr)"
}

if ($AreaPaths.Count -gt 0) {
    $areaConditions = $AreaPaths | ForEach-Object { "[System.AreaPath] UNDER '$($_.Replace('\', '\\'))'" }
    $whereConditions += "(" + ($areaConditions -join " OR ") + ")"
}

if ($IterationPaths.Count -gt 0) {
    $iterationConditions = $IterationPaths | ForEach-Object { "[System.IterationPath] UNDER '$($_.Replace('\', '\\'))'" }
    $whereConditions += "(" + ($iterationConditions -join " OR ") + ")"
}

$wiql = @"
SELECT [System.Id], [System.WorkItemType], [System.Title], [System.State],
       [System.AreaPath], [System.IterationPath]
FROM workitems
WHERE $($whereConditions -join ' AND ')
ORDER BY [System.Id] DESC
"@

Write-Host "🚀 Executando query REAL no Azure DevOps..." -ForegroundColor Green
Write-Host "📝 WIQL Query:" -ForegroundColor Cyan
Write-Host $wiql

# Executar query
$queryUrl = "$baseUrl/$Project/_apis/wit/wiql?api-version=7.0"
$body = @{ query = $wiql } | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri $queryUrl -Method POST -Headers $headers -Body $body

    if ($response.workItems.Count -eq 0) {
        Write-Host "⚠️ Query não retornou work items!" -ForegroundColor Yellow
        exit 0
    }

    Write-Host "✅ Query retornou $($response.workItems.Count) work items" -ForegroundColor Green

    # Buscar detalhes dos work items
    $workItemIds = $response.workItems | Select-Object -ExpandProperty id
    $idsString = $workItemIds -join ","
    $detailsUrl = "$baseUrl/$Project/_apis/wit/workitems?ids=$idsString&fields=System.Id,System.State,System.WorkItemType,System.AreaPath,System.Title&api-version=7.0"

    $details = Invoke-RestMethod -Uri $detailsUrl -Method GET -Headers $headers

    # Contar status
    $statusCount = @{}
    foreach ($item in $details.value) {
        $state = $item.fields.'System.State'
        if ($statusCount.ContainsKey($state)) {
            $statusCount[$state]++
        } else {
            $statusCount[$state] = 1
        }
    }

    # Resultados finais
    $resultado = @{
        total = $details.value.Count
        statusDistribution = $statusCount
        workItems = $details.value | Select-Object @{Name='id'; Expression={$_.id}}, @{Name='title'; Expression={$_.fields.'System.Title'}}, @{Name='state'; Expression={$_.fields.'System.State'}}, @{Name='type'; Expression={$_.fields.'System.WorkItemType'}}, @{Name='areaPath'; Expression={$_.fields.'System.AreaPath'}}
        query = $wiql
        timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    }

    Write-Host "📊 RESULTADO REAL:" -ForegroundColor Green
    Write-Host "Total: $($resultado.total)" -ForegroundColor White
    foreach ($status in $statusCount.Keys) {
        Write-Host "$status`: $($statusCount[$status])" -ForegroundColor White
    }

    # Salvar em JSON
    $outputFile = "azure-devops-resultado-real.json"
    $resultado | ConvertTo-Json -Depth 10 | Out-File -FilePath $outputFile -Encoding UTF8
    Write-Host "💾 Resultado salvo em: $outputFile" -ForegroundColor Green

} catch {
    Write-Host "❌ Erro na API: $_" -ForegroundColor Red
    exit 1
}