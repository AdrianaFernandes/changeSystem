# Teste de Conexão Azure DevOps - TR Change System
# ================================================

param(
    [Parameter(Mandatory=$true)]
    [string]$Token,
    [string]$Organization = "tr-ggo"
)

Write-Host "TR Change System - Teste Azure DevOps" -ForegroundColor Green
Write-Host "=" * 40

# Headers para API calls
$base64AuthInfo = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes(":$Token"))
$headers = @{
    Authorization = "Basic $base64AuthInfo"
    'Content-Type' = 'application/json'
}

try {
    Write-Host "Testando conexão..." -ForegroundColor Yellow

    # Listar projetos
    $projectsUri = "https://dev.azure.com/$Organization/_apis/projects"
    $apiVersion = "api-version=6.0"
    $fullUri = "$projectsUri" + "?" + "$apiVersion"

    $projects = Invoke-RestMethod -Uri $fullUri -Headers $headers -Method Get

    Write-Host "✅ Conexão estabelecida!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📋 Projetos disponíveis:" -ForegroundColor Cyan

    foreach ($project in $projects.value) {
        Write-Host "   • $($project.name) - $($project.description)" -ForegroundColor White
    }

    # Exportar lista de projetos
    $projectData = @{
        organization = $Organization
        timestamp = (Get-Date -Format "yyyy-MM-ddTHH:mm:ssZ")
        projects = $projects.value
    }

    $outputFile = "azure-devops-projects.json"
    $projectData | ConvertTo-Json -Depth 5 | Out-File -FilePath $outputFile -Encoding UTF8

    Write-Host ""
    Write-Host "📊 Dados exportados para: $outputFile" -ForegroundColor Green
    Write-Host ""
    Write-Host "🎯 Próximo passo:" -ForegroundColor Yellow
    Write-Host "   Escolha um projeto e use: .\get-project-data.ps1 -Token 'SEU_TOKEN' -Project 'NOME_PROJETO'"

} catch {
    Write-Host "❌ Erro: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""