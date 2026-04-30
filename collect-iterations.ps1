# Coleta Iteration Paths dos projetos TR LatAm
param([string]$Token = "9Lm1hR53FW4XeWobu3jWZZ7TXqDmTXLu9CokH9IudYmUFDnHMserJQQJ99CCACAAAAADXeeUAAASAZDO2NyW")

$org = "tr-ggo"
$base64 = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes(":$Token"))
$headers = @{ Authorization = "Basic $base64" }

# Lista dos projetos principais (que foram encontrados)
$projetos = @(
    "Datacloud",
    "Legal Content",
    "LegalOne",
    "Mastersaf DF-e",
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

Write-Host "=== COLETANDO ITERATION PATHS ===" -ForegroundColor Green
Write-Host "Projetos a verificar: $($projetos.Count)" -ForegroundColor Cyan

$todasIterations = @()

foreach ($projeto in $projetos) {
    Write-Host "`nProjeto: $projeto" -ForegroundColor Yellow

    try {
        # Coletar classificações de trabalho (work item types and iterations)
        $classificationsUri = "https://dev.azure.com/$org/$projeto/_apis/wit/classificationnodes?api-version=6.0"
        $classifications = Invoke-RestMethod -Uri $classificationsUri -Headers $headers -ErrorAction Stop

        # Buscar especificamente iterations
        $iterationsUri = "https://dev.azure.com/$org/$projeto/_apis/wit/classificationnodes/Iterations?api-version=6.0"
        $iterations = Invoke-RestMethod -Uri $iterationsUri -Headers $headers -ErrorAction Stop

        if ($iterations.children -and $iterations.children.Count -gt 0) {
            Write-Host "  Iterations encontradas: $($iterations.children.Count)" -ForegroundColor Green

            foreach ($iteration in $iterations.children) {
                $iterationData = @{
                    projeto = $projeto
                    nome = $iteration.name
                    path = $iteration.path
                    id = $iteration.id
                    hasChildren = ($iteration.hasChildren -eq $true)
                }

                # Se tem filhos, buscar sub-iterations
                if ($iteration.hasChildren) {
                    try {
                        $subIterationsUri = "https://dev.azure.com/$org/$projeto/_apis/wit/classificationnodes/Iterations/$($iteration.name)?api-version=6.0&`$depth=2"
                        $subIterations = Invoke-RestMethod -Uri $subIterationsUri -Headers $headers -ErrorAction SilentlyContinue

                        if ($subIterations.children) {
                            foreach ($subIter in $subIterations.children) {
                                $subIterationData = @{
                                    projeto = $projeto
                                    nome = "$($iteration.name)\$($subIter.name)"
                                    path = $subIter.path
                                    id = $subIter.id
                                    hasChildren = $false
                                    parent = $iteration.name
                                }
                                $todasIterations += $subIterationData
                            }
                        }
                    } catch {
                        Write-Host "    Erro ao buscar sub-iterations para $($iteration.name)" -ForegroundColor Gray
                    }
                } else {
                    $todasIterations += $iterationData
                }
            }
        } else {
            Write-Host "  Nenhuma iteration encontrada" -ForegroundColor Gray
        }

    } catch {
        Write-Host "  Erro: $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Consolidar e organizar
Write-Host "`n=== ITERATIONS CONSOLIDADAS ===" -ForegroundColor Cyan

# Agrupar por padrões comuns
$iterationPadrao = @()
$sprintPattern = $todasIterations | Where-Object { $_.nome -match "Sprint|S\d+" }
$quarterPattern = $todasIterations | Where-Object { $_.nome -match "Q[1-4]|Quarter" }
$releasePattern = $todasIterations | Where-Object { $_.nome -match "Release|R\d+|v\d+" }

Write-Host "Sprints encontrados: $($sprintPattern.Count)" -ForegroundColor White
Write-Host "Quarters encontrados: $($quarterPattern.Count)" -ForegroundColor White
Write-Host "Releases encontrados: $($releasePattern.Count)" -ForegroundColor White

# Criar lista padronizada para o template
$iterationsTemplate = @(
    # Sprints 2026
    "Sprint 13 - Q2 2026",
    "Sprint 14 - Q2 2026",
    "Sprint 15 - Q2 2026",
    "Sprint 16 - Q2 2026",
    "Sprint 17 - Q3 2026",
    "Sprint 18 - Q3 2026",
    "Sprint 19 - Q3 2026",
    "Sprint 20 - Q3 2026",
    "Sprint 21 - Q4 2026",
    "Sprint 22 - Q4 2026",
    "Sprint 23 - Q4 2026",
    "Sprint 24 - Q4 2026"
)

# Adicionar iterations reais encontradas (limpas e organizadas)
foreach ($iter in $todasIterations) {
    if ($iter.nome -and $iter.nome.Length -gt 2) {
        $cleanName = $iter.nome -replace '\\', ' \ ' # Separar hierarquia
        $fullName = "$($iter.projeto) - $cleanName"

        if ($fullName -notin $iterationsTemplate) {
            $iterationsTemplate += $fullName
        }
    }
}

# Organizar alfabeticamente
$iterationsTemplate = $iterationsTemplate | Sort-Object

# Salvar resultados
$resultado = @{
    timestamp = Get-Date
    projetos_verificados = $projetos.Count
    iterations_encontradas = $todasIterations.Count
    iterations_template = $iterationsTemplate
    iterations_raw = $todasIterations
}

$outputFile = "iterations-data.json"
$resultado | ConvertTo-Json -Depth 5 | Out-File $outputFile -Encoding UTF8

Write-Host "`n=== RESUMO ===" -ForegroundColor Yellow
Write-Host "Projetos verificados: $($projetos.Count)" -ForegroundColor White
Write-Host "Iterations coletadas: $($todasIterations.Count)" -ForegroundColor White
Write-Host "Template final: $($iterationsTemplate.Count) opcoes" -ForegroundColor White

Write-Host "`n📁 Dados salvos: $outputFile" -ForegroundColor Green
Write-Host "🎯 Pronto para integrar no template!" -ForegroundColor Cyan

# Preview das primeiras 10
Write-Host "`n📋 Preview (primeiras 10):" -ForegroundColor Cyan
$iterationsTemplate | Select-Object -First 10 | ForEach-Object {
    Write-Host "  • $_" -ForegroundColor White
}