param([string]$ProjectName = "DevOps")

$token = "9Lm1hR53FW4XeWobu3jWZZ7TXqDmTXLu9CokH9IudYmUFDnHMserJQQJ99CCACAAAAADXeeUAAASAZDO2NyW"
$org = "tr-ggo"
$base64 = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes(":$token"))
$headers = @{ Authorization = "Basic $base64" }

Write-Host "Coletando dados do projeto: $ProjectName" -ForegroundColor Green

# Repositórios
$reposUri = "https://dev.azure.com/$org/$ProjectName/_apis/git/repositories?api-version=6.0"
$repos = Invoke-RestMethod -Uri $reposUri -Headers $headers
Write-Host "Repositórios encontrados: $($repos.count)" -ForegroundColor Cyan

# Build Definitions
$buildDefsUri = "https://dev.azure.com/$org/$ProjectName/_apis/build/definitions?api-version=6.0"
$buildDefs = Invoke-RestMethod -Uri $buildDefsUri -Headers $headers
Write-Host "Build Pipelines: $($buildDefs.count)" -ForegroundColor Cyan

# Dados para TR Change
$data = @{
    projeto = $ProjectName
    repositorios = $repos.count
    pipelines = $buildDefs.count
    timestamp = Get-Date
}

$outputFile = "metrics-$ProjectName.json"
$data | ConvertTo-Json | Out-File $outputFile -Encoding UTF8
Write-Host "Dados salvos em: $outputFile" -ForegroundColor Yellow