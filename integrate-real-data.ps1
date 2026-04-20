# Integra dados reais do Azure DevOps no template
$inputFile = "tr-latam-real-data.json"
$templateFile = "templates\delivery-follow-up\delivery-follow-up.html"

Write-Host "=== INTEGRANDO DADOS REAIS NO TEMPLATE ===" -ForegroundColor Green

# Carregar dados reais
if (-not (Test-Path $inputFile)) {
    Write-Host "[ERRO] Arquivo $inputFile não encontrado!" -ForegroundColor Red
    exit 1
}

$dadosReais = Get-Content $inputFile -Raw -Encoding UTF8 | ConvertFrom-Json
Write-Host "[OK] Dados carregados: $($dadosReais.projetos.PSObject.Properties.Count) projetos" -ForegroundColor Green

# Criar HTML para Area Paths baseado nos dados reais
$areaPathsHtml = @()

foreach ($projeto in $dadosReais.projetos.PSObject.Properties) {
    $nomeProject = $projeto.Name
    $projectData = $projeto.Value

    if ($projectData.area_paths -and $projectData.area_paths.Count -gt 0) {
        Write-Host "Processando $nomeProject`: $($projectData.area_paths.Count) area paths" -ForegroundColor Cyan

        # Cabeçalho do grupo
        $areaPathsHtml += "              <!-- $nomeProject -->"
        $areaPathsHtml += "              <div class=""area-path-group"">"
        $areaPathsHtml += "                <div class=""area-path-group-header"">$nomeProject</div>"

        # Processar area paths do projeto (pegar principais sem duplicatas)
        $mainAreas = $projectData.area_paths | Where-Object {
            $_.path -match "^$([regex]::Escape($nomeProject))\\[^\\]+$"
        } | Sort-Object nome

        foreach ($mainArea in $mainAreas) {
            $areaId = ($mainArea.nome -replace '[^a-zA-Z0-9]', '-').ToLower()
            $areaValue = $mainArea.path

            $areaPathsHtml += "                <div class=""area-path-item"">"
            $areaPathsHtml += "                  <input type=""checkbox"" id=""$areaId"" value=""$areaValue"" onchange=""updateAreaPathSelection()"">"
            $areaPathsHtml += "                  <label for=""$areaId"">$($mainArea.nome)</label>"

            # Buscar sub-areas
            $subAreas = $projectData.area_paths | Where-Object {
                $_.path -match "^$([regex]::Escape($mainArea.path))\\[^\\]+$"
            } | Sort-Object nome | Select-Object -First 5  # Limitar para não sobrecarregar

            if ($subAreas.Count -gt 0) {
                $areaPathsHtml += "                  <div class=""area-path-children"">"
                foreach ($subArea in $subAreas) {
                    $subId = ($subArea.nome -replace '[^a-zA-Z0-9]', '-').ToLower()
                    $subValue = $subArea.path

                    $areaPathsHtml += "                    <div class=""area-path-item child"">"
                    $areaPathsHtml += "                      <input type=""checkbox"" id=""$subId"" value=""$subValue"" onchange=""updateAreaPathSelection()"">"
                    $areaPathsHtml += "                      <label for=""$subId"">$($subArea.nome)</label>"
                    $areaPathsHtml += "                    </div>"
                }
                $areaPathsHtml += "                  </div>"
            }

            $areaPathsHtml += "                </div>"
        }

        $areaPathsHtml += "              </div>"
        $areaPathsHtml += ""
    }
}

# Gerar HTML completo
$novoAreaPathsHtml = $areaPathsHtml -join "`n"

Write-Host "`n=== PREVIEW DO HTML GERADO ===" -ForegroundColor Yellow
Write-Host $novoAreaPathsHtml.Substring(0, [Math]::Min(500, $novoAreaPathsHtml.Length)) -ForegroundColor Gray
Write-Host "..." -ForegroundColor Gray

# Salvar HTML gerado
$outputHtml = "area-paths-real.html"
$novoAreaPathsHtml | Out-File $outputHtml -Encoding UTF8

Write-Host "`n=== RESUMO ===" -ForegroundColor Yellow
Write-Host "Projetos processados: $($dadosReais.projetos.PSObject.Properties.Count)" -ForegroundColor White
Write-Host "HTML gerado: $outputHtml" -ForegroundColor Green
Write-Host "Template original: $templateFile" -ForegroundColor White

Write-Host "`n[INFO] Para integrar:" -ForegroundColor Cyan
Write-Host "1. Substitua o conteúdo do <div class=""area-path-list"" id=""area-path-list""> no template" -ForegroundColor White
Write-Host "2. Cole o conteúdo do arquivo $outputHtml" -ForegroundColor White
Write-Host "3. Teste a funcionalidade no template" -ForegroundColor White

Write-Host "`n[OK] Processamento concluído!" -ForegroundColor Green