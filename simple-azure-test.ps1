$token = "9Lm1hR53FW4XeWobu3jWZZ7TXqDmTXLu9CokH9IudYmUFDnHMserJQQJ99CCACAAAAADXeeUAAASAZDO2NyW"
$org = "tr-ggo"

$base64 = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes(":$token"))
$headers = @{ Authorization = "Basic $base64" }

try {
    $uri = "https://dev.azure.com/$org/_apis/projects?api-version=6.0"
    $result = Invoke-RestMethod -Uri $uri -Headers $headers

    Write-Host "=== PROJETOS ENCONTRADOS ===" -ForegroundColor Green
    foreach ($project in $result.value) {
        Write-Host "$($project.name)" -ForegroundColor Cyan
    }

    $result | ConvertTo-Json -Depth 3 | Out-File "projects.json" -Encoding UTF8
    Write-Host "`nArquivo salvo: projects.json" -ForegroundColor Yellow

} catch {
    Write-Host "Erro: $($_.Exception.Message)" -ForegroundColor Red
}