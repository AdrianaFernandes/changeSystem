# Configuração Segura Azure DevOps + TR Change System
# ===================================================

Write-Host "TR Change System - Configuração Azure DevOps" -ForegroundColor Green
Write-Host "=" * 50

# Configurar variável de ambiente de forma segura
Write-Host "`n1. Configure seu token de forma segura:" -ForegroundColor Yellow
Write-Host "   IMPORTANTE: Não cole tokens em texto plano!" -ForegroundColor Red

$pat = Read-Host -AsSecureString "Digite seu Azure DevOps Personal Access Token"
$organization = "tr-ggo"

# Converter SecureString para uso
$BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($pat)
$plainPat = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)

# Headers para API calls
$base64AuthInfo = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes(":$plainPat"))
$headers = @{
    Authorization = "Basic $base64AuthInfo"
    'Content-Type' = 'application/json'
}

try {
    Write-Host "`n2. Testando conexão com Azure DevOps..." -ForegroundColor Yellow

    # Listar projetos
    $projectsUri = "https://dev.azure.com/$organization/_apis/projects?api-version=6.0"
    $projects = Invoke-RestMethod -Uri $projectsUri -Headers $headers -Method Get

    Write-Host "✅ Conexão estabelecida com sucesso!" -ForegroundColor Green
    Write-Host "`n📋 Projetos disponíveis:" -ForegroundColor Cyan

    foreach ($project in $projects.value) {
        Write-Host "   • $($project.name)" -ForegroundColor White
    }

    # Perguntar qual projeto usar
    Write-Host "`n" -NoNewline
    $selectedProject = Read-Host "Qual projeto você quer usar com TR Change System?"

    # Coletar dados do projeto selecionado
    Write-Host "`n3. Coletando dados do projeto: $selectedProject..." -ForegroundColor Yellow

    # Work Items
    $wiqlUri = "https://dev.azure.com/$organization/$selectedProject/_apis/wit/wiql?api-version=6.0"
    $wiqlQuery = @{
        query = "SELECT [System.Id], [System.Title], [System.State], [System.CreatedDate] FROM WorkItems WHERE [System.TeamProject] = '$selectedProject' ORDER BY [System.CreatedDate] DESC"
    }

    $workItemsResult = Invoke-RestMethod -Uri $wiqlUri -Headers $headers -Method Post -Body ($wiqlQuery | ConvertTo-Json)
    $workItemIds = $workItemsResult.workItems | Select-Object -First 50 | ForEach-Object { $_.id }

    if ($workItemIds.Count -gt 0) {
        $workItemsUri = "https://dev.azure.com/$organization/$selectedProject/_apis/wit/workitems?ids=$($workItemIds -join ',')``&api-version=6.0"
        $workItems = Invoke-RestMethod -Uri $workItemsUri -Headers $headers -Method Get
    } else {
        $workItems = @{ value = @() }
    }

    # Repositories
    $reposUri = "https://dev.azure.com/$organization/$selectedProject/_apis/git/repositories?api-version=6.0"
    $repos = Invoke-RestMethod -Uri $reposUri -Headers $headers -Method Get

    # Build Pipelines
    $buildsUri = "https://dev.azure.com/$organization/$selectedProject/_apis/build/definitions?api-version=6.0"
    $builds = Invoke-RestMethod -Uri $buildsUri -Headers $headers -Method Get

    Write-Host "✅ Dados coletados com sucesso!" -ForegroundColor Green

    # Criar JSON para TR Change System
    $trChangeData = @{
        meta = @{
            organization = $organization
            project = $selectedProject
            timestamp = (Get-Date -Format "yyyy-MM-ddTHH:mm:ssZ")
            generatedBy = "TR Change System - Azure DevOps Collector"
        }
        metrics = @{
            workItems = @{
                total = $workItems.value.Count
                byState = ($workItems.value | Group-Object { $_.fields.'System.State' } | ForEach-Object {
                    @{ state = $_.Name; count = $_.Count }
                })
            }
            repositories = @{
                total = $repos.value.Count
                active = ($repos.value | Where-Object { $_.size -gt 0 }).Count
            }
            buildPipelines = @{
                total = $builds.value.Count
                enabled = ($builds.value | Where-Object { $_.queueStatus -eq 'enabled' }).Count
            }
        }
        rawData = @{
            workItems = $workItems.value | Select-Object -First 20
            repositories = $repos.value
            buildDefinitions = $builds.value | Select-Object -First 10
        }
    }

    # Salvar dados
    $outputFile = "azure-devops-data-$selectedProject.json"
    $trChangeData | ConvertTo-Json -Depth 10 | Out-File -FilePath $outputFile -Encoding UTF8

    Write-Host "`n4. 📊 Dados exportados para: $outputFile" -ForegroundColor Green
    Write-Host "`n📈 Resumo dos dados coletados:" -ForegroundColor Cyan
    Write-Host "   • Work Items: $($workItems.value.Count)" -ForegroundColor White
    Write-Host "   • Repositórios: $($repos.value.Count)" -ForegroundColor White
    Write-Host "   • Build Pipelines: $($builds.value.Count)" -ForegroundColor White

    # Integração com templates TR Change
    Write-Host "`n5. 🎯 Próximos passos:" -ForegroundColor Yellow
    Write-Host "   • Abra o template Delivery Follow-up: http://localhost:8000/templates/delivery-follow-up/delivery-follow-up.html" -ForegroundColor White
    Write-Host "   • Use os dados coletados para preencher KPIs e métricas" -ForegroundColor White
    Write-Host "   • Gere relatórios PPTX automaticamente" -ForegroundColor White

    # Limpeza segura
    $plainPat = $null
    [System.Runtime.InteropServices.Marshal]::ZeroFreeBSTR($BSTR)

} catch {
    Write-Host "❌ Erro na conexão: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "`n🔧 Possíveis soluções:" -ForegroundColor Yellow
    Write-Host "   • Verificar se o token é válido" -ForegroundColor White
    Write-Host "   • Verificar permissões do token" -ForegroundColor White
    Write-Host "   • Verificar se a organização 'tr-ggo' está correta" -ForegroundColor White
}

Write-Host "`n" -NoNewline
Read-Host "Pressione Enter para sair"