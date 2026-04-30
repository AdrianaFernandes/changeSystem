# Coleta Area Paths dos projetos TR LatAm
param([string]$Token = "9Lm1hR53FW4XeWobu3jWZZ7TXqDmTXLu9CokH9IudYmUFDnHMserJQQJ99CCACAAAAADXeeUAAASAZDO2NyW")

$org = "tr-ggo"
$base64 = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes(":$Token"))
$headers = @{ Authorization = "Basic $base64" }

# Lista dos projetos principais
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

Write-Host "=== COLETANDO AREA PATHS ===" -ForegroundColor Green
Write-Host "Projetos a verificar: $($projetos.Count)" -ForegroundColor Cyan

$todasAreaPaths = @()

foreach ($projeto in $projetos) {
    Write-Host "`nProjeto: $projeto" -ForegroundColor Yellow

    try {
        # Coletar Area Paths do projeto
        $areaPathsUri = "https://dev.azure.com/$org/$projeto/_apis/wit/classificationnodes/Areas?api-version=6.0&`$depth=5"
        $areaPathsResponse = Invoke-RestMethod -Uri $areaPathsUri -Headers $headers -ErrorAction Stop

        if ($areaPathsResponse.children -and $areaPathsResponse.children.Count -gt 0) {
            Write-Host "  Area Paths encontradas: $($areaPathsResponse.children.Count)" -ForegroundColor Green

            # Função recursiva para processar area paths hierárquicas
            function ProcessAreaPath($areaPath, $parentPath = "", $level = 0) {
                $currentPath = if ($parentPath) { "$parentPath\$($areaPath.name)" } else { $areaPath.name }

                $areaPathData = @{
                    projeto = $projeto
                    nome = $areaPath.name
                    path = $currentPath
                    fullPath = $areaPath.path
                    id = $areaPath.id
                    level = $level
                    hasChildren = ($areaPath.hasChildren -eq $true)
                }

                $todasAreaPaths += $areaPathData

                # Processar filhos se existirem
                if ($areaPath.children) {
                    foreach ($childArea in $areaPath.children) {
                        ProcessAreaPath $childArea $currentPath ($level + 1)
                    }
                }
            }

            # Processar cada area path principal
            foreach ($areaPath in $areaPathsResponse.children) {
                ProcessAreaPath $areaPath "$projeto" 0
            }
        } else {
            Write-Host "  Nenhuma area path encontrada" -ForegroundColor Gray
        }

    } catch {
        Write-Host "  Erro: $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Consolidar e organizar
Write-Host "`n=== AREA PATHS CONSOLIDADAS ===" -ForegroundColor Cyan

# Criar estrutura hierárquica organizada
$areaPathsHierarchy = @{}

foreach ($areaPath in $todasAreaPaths) {
    $projeto = $areaPath.projeto

    if (-not $areaPathsHierarchy.ContainsKey($projeto)) {
        $areaPathsHierarchy[$projeto] = @()
    }

    $areaPathsHierarchy[$projeto] += $areaPath
}

# Estatísticas
$totalAreaPaths = $todasAreaPaths.Count
Write-Host "Total de Area Paths coletadas: $totalAreaPaths" -ForegroundColor White

foreach ($projeto in $areaPathsHierarchy.Keys) {
    $count = $areaPathsHierarchy[$projeto].Count
    Write-Host "  $projeto`: $count area paths" -ForegroundColor White
}

# Salvar resultados
$resultado = @{
    timestamp = Get-Date
    projetos_verificados = $projetos.Count
    area_paths_encontradas = $totalAreaPaths
    area_paths_por_projeto = $areaPathsHierarchy
    area_paths_raw = $todasAreaPaths
}

$outputFile = "area-paths-data.json"
$resultado | ConvertTo-Json -Depth 10 | Out-File $outputFile -Encoding UTF8

Write-Host "`n=== RESUMO ===" -ForegroundColor Yellow
Write-Host "Projetos verificados: $($projetos.Count)" -ForegroundColor White
Write-Host "Area Paths coletadas: $totalAreaPaths" -ForegroundColor White

Write-Host "`n[OK] Dados salvos: $outputFile" -ForegroundColor Green
Write-Host "[OK] Pronto para integrar no template!" -ForegroundColor Cyan

# Preview das primeiras area paths
Write-Host "`n[INFO] Preview (primeiras 15):" -ForegroundColor Cyan
$todasAreaPaths | Select-Object -First 15 | ForEach-Object {
    Write-Host "  • $($_.projeto) - $($_.path)" -ForegroundColor White
}