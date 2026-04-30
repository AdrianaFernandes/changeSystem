# Coleta Area Paths dos projetos TR LatAm - Versão Simples
param([string]$Token = "9Lm1hR53FW4XeWobu3jWZZ7TXqDmTXLu9CokH9IudYmUFDnHMserJQQJ99CCACAAAAADXeeUAAASAZDO2NyW")

$org = "tr-ggo"
$base64 = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes(":$Token"))
$headers = @{ Authorization = "Basic $base64" }

# Lista dos projetos principais
$projetos = @(
    "TR Fintech",
    "LegalOne",
    "Datacloud",
    "Mastersaf Fiscal Solutions"
)

Write-Host "=== COLETANDO AREA PATHS (SIMPLES) ===" -ForegroundColor Green

$todasAreaPaths = @()

foreach ($projeto in $projetos) {
    Write-Host "`nProjeto: $projeto" -ForegroundColor Yellow

    try {
        # Coletar Work Item Types primeiro para entender a estrutura
        $workItemTypesUri = "https://dev.azure.com/$org/$projeto/_apis/wit/workItemTypes?api-version=6.0"
        $workItemTypes = Invoke-RestMethod -Uri $workItemTypesUri -Headers $headers -ErrorAction SilentlyContinue

        if ($workItemTypes.value) {
            Write-Host "  Work Item Types: $($workItemTypes.value.Count)" -ForegroundColor Cyan
            foreach ($wit in $workItemTypes.value) {
                Write-Host "    - $($wit.name)" -ForegroundColor Gray
            }
        }

        # Coletar Area Paths
        $areaPathsUri = "https://dev.azure.com/$org/$projeto/_apis/wit/classificationnodes/Areas?api-version=6.0"
        $areaPaths = Invoke-RestMethod -Uri $areaPathsUri -Headers $headers -ErrorAction Stop

        if ($areaPaths.children) {
            Write-Host "  Area Paths principais: $($areaPaths.children.Count)" -ForegroundColor Green

            foreach ($area in $areaPaths.children) {
                $areaData = @{
                    projeto = $projeto
                    nome = $area.name
                    path = "$projeto\$($area.name)"
                    id = $area.id
                    hasChildren = $area.hasChildren
                }
                $todasAreaPaths += $areaData
                Write-Host "    + $($area.name)" -ForegroundColor White

                # Se tem filhos, buscar um nível adicional
                if ($area.hasChildren) {
                    try {
                        $subAreaUri = "https://dev.azure.com/$org/$projeto/_apis/wit/classificationnodes/Areas/$([System.Uri]::EscapeDataString($area.name))?api-version=6.0&`$depth=2"
                        $subAreas = Invoke-RestMethod -Uri $subAreaUri -Headers $headers -ErrorAction SilentlyContinue

                        if ($subAreas.children) {
                            foreach ($subArea in $subAreas.children) {
                                $subAreaData = @{
                                    projeto = $projeto
                                    nome = "$($area.name)\$($subArea.name)"
                                    path = "$projeto\$($area.name)\$($subArea.name)"
                                    id = $subArea.id
                                    parent = $area.name
                                    hasChildren = $subArea.hasChildren
                                }
                                $todasAreaPaths += $subAreaData
                                Write-Host "      - $($subArea.name)" -ForegroundColor Gray
                            }
                        }
                    } catch {
                        Write-Host "      [ERRO] Não foi possível buscar sub-areas de '$($area.name)'" -ForegroundColor DarkYellow
                    }
                }
            }
        }

    } catch {
        Write-Host "  [ERRO] $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Salvar resultados
$resultado = @{
    timestamp = Get-Date
    total_area_paths = $todasAreaPaths.Count
    area_paths = $todasAreaPaths
}

$outputFile = "area-paths-real.json"
$resultado | ConvertTo-Json -Depth 5 | Out-File $outputFile -Encoding UTF8

Write-Host "`n=== RESUMO ===" -ForegroundColor Yellow
Write-Host "Total de Area Paths coletadas: $($todasAreaPaths.Count)" -ForegroundColor White
Write-Host "[OK] Dados salvos: $outputFile" -ForegroundColor Green

# Mostrar preview organizado por projeto
Write-Host "`n=== AREA PATHS POR PROJETO ===" -ForegroundColor Cyan
foreach ($projeto in $projetos) {
    $areasDoProjeto = $todasAreaPaths | Where-Object { $_.projeto -eq $projeto }
    if ($areasDoProjeto) {
        Write-Host "`n$projeto ($($areasDoProjeto.Count) area paths):" -ForegroundColor Yellow
        foreach ($area in $areasDoProjeto | Sort-Object nome) {
            Write-Host "  • $($area.path)" -ForegroundColor White
        }
    }
}