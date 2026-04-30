# Coleta completa de todos os projetos principais TR LatAm
param([string]$Token = "9Lm1hR53FW4XeWobu3jWZZ7TXqDmTXLu9CokH9IudYmUFDnHMserJQQJ99CCACAAAAADXeeUAAASAZDO2NyW")

$org = "tr-ggo"
$base64 = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes(":$Token"))
$headers = @{ Authorization = "Basic $base64" }

# Lista dos projetos principais
$projetos = @(
    "Datacloud",
    "Domínio",
    "Legal Content",
    "LegalOne",
    "Mastersaf DF-e",
    "Mastersaf DW",
    "Mastersaf Fiscal Solutions",
    "Mastersaf Interfaces",
    "OBI",
    "OneSource BR",
    "ONVIO BR",
    "South Latam",
    "Tax Declaration Framework",
    "TR Fintech",
    "DevOps"
)

Write-Host "=== COLETA COMPLETA - PORTFOLIO TR LATAM ===" -ForegroundColor Green
Write-Host "Projetos a coletar: $($projetos.Count)" -ForegroundColor Cyan

$resultados = @()

foreach ($projeto in $projetos) {
    Write-Host "`nColetando: $projeto..." -ForegroundColor Yellow

    try {
        # Repositórios
        $reposUri = "https://dev.azure.com/$org/$projeto/_apis/git/repositories?api-version=6.0"
        $repos = Invoke-RestMethod -Uri $reposUri -Headers $headers -ErrorAction SilentlyContinue

        # Build Definitions
        $buildDefsUri = "https://dev.azure.com/$org/$projeto/_apis/build/definitions?api-version=6.0"
        $buildDefs = Invoke-RestMethod -Uri $buildDefsUri -Headers $headers -ErrorAction SilentlyContinue

        $resultado = @{
            projeto = $projeto
            repositorios = if ($repos) { $repos.count } else { 0 }
            pipelines = if ($buildDefs) { $buildDefs.count } else { 0 }
            status = "🟢 Coletado"
        }

        Write-Host "  ✅ Repos: $($resultado.repositorios), Pipelines: $($resultado.pipelines)" -ForegroundColor Green

    } catch {
        $resultado = @{
            projeto = $projeto
            repositorios = 0
            pipelines = 0
            status = "❌ Não encontrado"
            erro = $_.Exception.Message
        }
        Write-Host "  ❌ Projeto não encontrado ou sem acesso" -ForegroundColor Red
    }

    $resultados += $resultado
}

# Consolidar resultados
Write-Host "`n=== RESUMO FINAL ===" -ForegroundColor Cyan
Write-Host "Projeto".PadRight(30) + "Repos".PadRight(8) + "Pipelines".PadRight(12) + "Status" -ForegroundColor White
Write-Host "-" * 60

$totalRepos = 0
$totalPipelines = 0
$projetosAtivos = 0

foreach ($resultado in $resultados) {
    $statusColor = if ($resultado.repositorios -gt 0) { "Green" } else { "Gray" }

    Write-Host ($resultado.projeto.PadRight(30) +
                $resultado.repositorios.ToString().PadRight(8) +
                $resultado.pipelines.ToString().PadRight(12) +
                $resultado.status) -ForegroundColor $statusColor

    $totalRepos += $resultado.repositorios
    $totalPipelines += $resultado.pipelines
    if ($resultado.repositorios -gt 0) { $projetosAtivos++ }
}

Write-Host "`n=== TOTAIS ===" -ForegroundColor Yellow
Write-Host "Projetos analisados: $($resultados.Count)" -ForegroundColor White
Write-Host "Projetos ativos: $projetosAtivos" -ForegroundColor White
Write-Host "Total repositórios: $totalRepos" -ForegroundColor White
Write-Host "Total pipelines: $totalPipelines" -ForegroundColor White

# Salvar resultados
$consolidado = @{
    timestamp = Get-Date
    projetos_analisados = $resultados.Count
    projetos_ativos = $projetosAtivos
    total_repositorios = $totalRepos
    total_pipelines = $totalPipelines
    detalhes = $resultados
}

$outputFile = "portfolio-consolidado.json"
$consolidado | ConvertTo-Json -Depth 5 | Out-File $outputFile -Encoding UTF8

Write-Host "`n📊 Resultados salvos em: $outputFile" -ForegroundColor Green
Write-Host "Use no template: http://localhost:8000/templates/delivery-follow-up/delivery-follow-up.html" -ForegroundColor Cyan