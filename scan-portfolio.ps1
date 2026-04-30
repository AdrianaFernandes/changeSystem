$token = "9Lm1hR53FW4XeWobu3jWZZ7TXqDmTXLu9CokH9IudYmUFDnHMserJQQJ99CCACAAAAADXeeUAAASAZDO2NyW"
$org = "tr-ggo"
$base64 = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes(":$token"))
$headers = @{ Authorization = "Basic $base64" }

$projetos = @("Datacloud", "Domínio", "Legal Content", "LegalOne", "Mastersaf DF-e", "Mastersaf DW", "Mastersaf Fiscal Solutions", "Mastersaf Interfaces", "OBI", "OneSource BR", "ONVIO BR", "South Latam", "Tax Declaration Framework", "TR Fintech", "DevOps")

Write-Host "PORTFOLIO TR LATAM - SCAN COMPLETO"
Write-Host "=================================="

$resultados = @()

foreach ($projeto in $projetos) {
    Write-Host "Verificando: $projeto"

    try {
        $reposUri = "https://dev.azure.com/$org/$projeto/_apis/git/repositories?api-version=6.0"
        $repos = Invoke-RestMethod -Uri $reposUri -Headers $headers -ErrorAction Stop

        $buildUri = "https://dev.azure.com/$org/$projeto/_apis/build/definitions?api-version=6.0"
        $builds = Invoke-RestMethod -Uri $buildUri -Headers $headers -ErrorAction Stop

        $resultado = @{
            projeto = $projeto
            repos = $repos.count
            pipelines = $builds.count
            status = "OK"
        }

        Write-Host "  -> Repos: $($repos.count), Pipelines: $($builds.count)" -ForegroundColor Green

    } catch {
        $resultado = @{
            projeto = $projeto
            repos = 0
            pipelines = 0
            status = "NOT_FOUND"
        }
        Write-Host "  -> Nao encontrado" -ForegroundColor Yellow
    }

    $resultados += $resultado
}

Write-Host "`nRESUMO:"
$resultados | Format-Table -AutoSize

$outputFile = "portfolio-scan.json"
$resultados | ConvertTo-Json | Out-File $outputFile -Encoding UTF8
Write-Host "Dados salvos em: $outputFile"