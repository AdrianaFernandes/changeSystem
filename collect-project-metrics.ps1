# Coleta específica para um projeto
param([string]$ProjectName = "DevOps")

$token = "9Lm1hR53FW4XeWobu3jWZZ7TXqDmTXLu9CokH9IudYmUFDnHMserJQQJ99CCACAAAAADXeeUAAASAZDO2NyW"
$org = "tr-ggo"
$base64 = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes(":$token"))
$headers = @{ Authorization = "Basic $base64" }

Write-Host "=== COLETANDO DADOS: $ProjectName ===" -ForegroundColor Green

try {
    # 1. Repositórios
    $reposUri = "https://dev.azure.com/$org/$ProjectName/_apis/git/repositories?api-version=6.0"
    $repos = Invoke-RestMethod -Uri $reposUri -Headers $headers
    Write-Host "Repositórios: $($repos.count)" -ForegroundColor Cyan

    # 2. Work Items (últimos 30 dias)
    $wiqlUri = "https://dev.azure.com/$org/$ProjectName/_apis/wit/wiql?api-version=6.0"
    $wiqlQuery = @{
        query = "SELECT [System.Id] FROM WorkItems WHERE [System.TeamProject] = '$ProjectName' AND [System.ChangedDate] >= '@Today - 30' ORDER BY [System.ChangedDate] DESC"
    }
    $workItems = Invoke-RestMethod -Uri $wiqlUri -Headers $headers -Method Post -Body ($wiqlQuery | ConvertTo-Json) -ContentType "application/json"
    Write-Host "Work Items (30d): $($workItems.workItems.Count)" -ForegroundColor Cyan

    # 3. Builds (últimos 30 dias)
    $buildsUri = "https://dev.azure.com/$org/$ProjectName/_apis/build/builds?api-version=6.0&minTime=$((Get-Date).AddDays(-30).ToString('yyyy-MM-ddTHH:mm:ss.fffZ'))"
    $builds = Invoke-RestMethod -Uri $buildsUri -Headers $headers
    Write-Host "Builds (30d): $($builds.count)" -ForegroundColor Cyan

    # 4. Build Definitions
    $buildDefsUri = "https://dev.azure.com/$org/$ProjectName/_apis/build/definitions?api-version=6.0"
    $buildDefs = Invoke-RestMethod -Uri $buildDefsUri -Headers $headers
    Write-Host "Build Pipelines: $($buildDefs.count)" -ForegroundColor Cyan

    # Consolidar dados para TR Change System
    $trData = @{
        meta = @{
            project = $ProjectName
            organization = $org
            timestamp = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ssZ")
            period = "30 days"
        }
        "kpi-assumidas" = 50  # Placeholder - calcular baseado em work items
        "kpi-realizadas" = ($workItems.workItems | Where-Object { $_.fields.'System.State' -eq 'Done' }).Count
        "kpi-bloqueadas" = ($workItems.workItems | Where-Object { $_.fields.'System.State' -eq 'Blocked' }).Count
        "kpi-atrasadas" = 5   # Placeholder - calcular baseado em datas
        "prog-conclusao" = "75%"  # Placeholder
        "prog-velocity" = ($workItems.workItems.Count / 4)  # Aproximação por semana
        "prog-backlog" = $workItems.workItems.Count
        metrics = @{
            repositories = @{
                total = $repos.count
                active = ($repos.value | Where-Object { $_.size -gt 0 }).Count
            }
            workItems = @{
                total = $workItems.workItems.Count
                last30Days = $workItems.workItems.Count
            }
            builds = @{
                total30Days = $builds.count
                pipelines = $buildDefs.count
                successRate = if ($builds.count -gt 0) {
                    [math]::Round((($builds.value | Where-Object { $_.result -eq 'succeeded' }).Count / $builds.count) * 100, 1)
                } else { 0 }
            }
        }
        rawData = @{
            repositories = $repos.value | Select-Object name, size, defaultBranch -First 10
            recentBuilds = $builds.value | Select-Object buildNumber, status, result, startTime -First 10
            buildPipelines = $buildDefs.value | Select-Object name, queueStatus, type -First 10
        }
    }

    # Salvar dados
    $outputFile = "tr-change-data-$ProjectName.json"
    $trData | ConvertTo-Json -Depth 5 | Out-File $outputFile -Encoding UTF8

    Write-Host "`n=== MÉTRICAS COLETADAS ===" -ForegroundColor Yellow
    Write-Host "Repositórios: $($trData.metrics.repositories.total) (ativos: $($trData.metrics.repositories.active))" -ForegroundColor White
    Write-Host "Work Items (30d): $($trData.metrics.workItems.total)" -ForegroundColor White
    Write-Host "Builds (30d): $($trData.metrics.builds.total30Days)" -ForegroundColor White
    Write-Host "Pipelines: $($trData.metrics.builds.pipelines)" -ForegroundColor White
    Write-Host "Taxa de Sucesso: $($trData.metrics.builds.successRate)%" -ForegroundColor White

    Write-Host "`n📁 Dados salvos: $outputFile" -ForegroundColor Green
    Write-Host "🎯 Use no template: http://localhost:8000/templates/delivery-follow-up/delivery-follow-up.html" -ForegroundColor Cyan

} catch {
    Write-Host "Erro: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""