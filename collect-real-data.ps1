# Coleta dados reais dos principais projetos TR LatAm
param([string]$Token = "9Lm1hR53FW4XeWobu3jWZZ7TXqDmTXLu9CokH9IudYmUFDnHMserJQQJ99CCACAAAAADXeeUAAASAZDO2NyW")

$org = "tr-ggo"
$base64 = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes(":$Token"))
$headers = @{ Authorization = "Basic $base64" }

Write-Host "=== COLETANDO DADOS REAIS TR LATAM ===" -ForegroundColor Green

# Principais projetos encontrados
$projetosAlvo = @(
    "TR Fintech",
    "LegalOne",
    "Datacloud",
    "Mastersaf Fiscal Solutions",
    "Legal Content",
    "OBI",
    "ONVIO BR",
    "South Latam",
    "Tax Declaration Framework",
    "OneSource BR"
)

$dadosCompletos = @{
    timestamp = Get-Date
    projetos = @{}
}

foreach ($projeto in $projetosAlvo) {
    Write-Host "`n=== PROJETO: $projeto ===" -ForegroundColor Yellow

    $projectData = @{
        nome = $projeto
        area_paths = @()
        work_item_types = @()
        iterations = @()
    }

    try {
        # 1. AREA PATHS
        Write-Host "Coletando Area Paths..." -ForegroundColor Cyan
        $areaUri = "https://dev.azure.com/$org/$([System.Uri]::EscapeDataString($projeto))/_apis/wit/classificationnodes/Areas?api-version=6.0&`$depth=3"
        $areas = Invoke-RestMethod -Uri $areaUri -Headers $headers

        function ProcessArea($area, $prefix = "") {
            $currentPath = if ($prefix) { "$prefix\$($area.name)" } else { $area.name }

            $areaData = @{
                nome = $area.name
                path = "$projeto\$currentPath"
                hasChildren = [bool]$area.hasChildren
            }
            $projectData.area_paths += $areaData

            if ($area.children) {
                foreach ($child in $area.children) {
                    ProcessArea $child $currentPath
                }
            }
        }

        if ($areas.children) {
            foreach ($area in $areas.children) {
                ProcessArea $area
            }
            Write-Host "  [OK] $($projectData.area_paths.Count) area paths coletadas" -ForegroundColor Green
        }

        # 2. WORK ITEM TYPES
        Write-Host "Coletando Work Item Types..." -ForegroundColor Cyan
        $witUri = "https://dev.azure.com/$org/$([System.Uri]::EscapeDataString($projeto))/_apis/wit/workItemTypes?api-version=6.0"
        $workItemTypes = Invoke-RestMethod -Uri $witUri -Headers $headers

        if ($workItemTypes.value) {
            foreach ($wit in $workItemTypes.value) {
                $witData = @{
                    nome = $wit.name
                    description = $wit.description
                    icon = $wit.icon.id
                }
                $projectData.work_item_types += $witData
            }
            Write-Host "  [OK] $($projectData.work_item_types.Count) work item types coletados" -ForegroundColor Green
        }

        # 3. ITERATIONS
        Write-Host "Coletando Iterations..." -ForegroundColor Cyan
        $iterUri = "https://dev.azure.com/$org/$([System.Uri]::EscapeDataString($projeto))/_apis/wit/classificationnodes/Iterations?api-version=6.0&`$depth=2"
        $iterations = Invoke-RestMethod -Uri $iterUri -Headers $headers

        if ($iterations.children) {
            foreach ($iteration in $iterations.children) {
                $iterData = @{
                    nome = $iteration.name
                    path = $iteration.path
                    hasChildren = [bool]$iteration.hasChildren
                }
                $projectData.iterations += $iterData

                # Sub-iterations
                if ($iteration.children) {
                    foreach ($subIter in $iteration.children) {
                        $subIterData = @{
                            nome = "$($iteration.name)\$($subIter.name)"
                            path = $subIter.path
                            parent = $iteration.name
                            hasChildren = [bool]$subIter.hasChildren
                        }
                        $projectData.iterations += $subIterData
                    }
                }
            }
            Write-Host "  [OK] $($projectData.iterations.Count) iterations coletadas" -ForegroundColor Green
        }

        $dadosCompletos.projetos[$projeto] = $projectData

    } catch {
        Write-Host "  [ERRO] $($_.Exception.Message)" -ForegroundColor Red
        $projectData.erro = $_.Exception.Message
        $dadosCompletos.projetos[$projeto] = $projectData
    }
}

# Salvar dados
$outputFile = "tr-latam-real-data.json"
$dadosCompletos | ConvertTo-Json -Depth 10 | Out-File $outputFile -Encoding UTF8

Write-Host "`n=== RESUMO FINAL ===" -ForegroundColor Yellow
$totalAreaPaths = 0
$totalWorkItemTypes = 0
$totalIterations = 0

foreach ($projeto in $dadosCompletos.projetos.Keys) {
    $proj = $dadosCompletos.projetos[$projeto]
    $areaCount = if ($proj.area_paths) { $proj.area_paths.Count } else { 0 }
    $witCount = if ($proj.work_item_types) { $proj.work_item_types.Count } else { 0 }
    $iterCount = if ($proj.iterations) { $proj.iterations.Count } else { 0 }

    Write-Host "$projeto`: $areaCount areas, $witCount work items, $iterCount iterations" -ForegroundColor White
    $totalAreaPaths += $areaCount
    $totalWorkItemTypes += $witCount
    $totalIterations += $iterCount
}

Write-Host "`nTOTAL: $totalAreaPaths area paths, $totalWorkItemTypes work item types, $totalIterations iterations" -ForegroundColor Cyan
Write-Host "[OK] Dados salvos em: $outputFile" -ForegroundColor Green
Write-Host "[OK] Pronto para integrar no template!" -ForegroundColor Green