# Azure DevOps Integration Script para TR Change System
# ================================================================

# IMPORTANTE: Configure suas credenciais de forma segura
# $pat = Read-Host -AsSecureString "Digite seu Personal Access Token"
# $organization = "tr-ggo"
# $project = "SEU_PROJETO"

function Get-AzureDevOpsHeaders {
    param(
        [string]$PersonalAccessToken
    )

    $base64AuthInfo = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes(":$PersonalAccessToken"))
    return @{
        Authorization = "Basic $base64AuthInfo"
        'Content-Type' = 'application/json'
    }
}

function Get-WorkItems {
    param(
        [string]$Organization,
        [string]$Project,
        [hashtable]$Headers
    )

    $uri = "https://dev.azure.com/$Organization/$Project/_apis/wit/workitems?api-version=6.0"
    try {
        $response = Invoke-RestMethod -Uri $uri -Headers $Headers -Method Get
        return $response.value
    }
    catch {
        Write-Error "Erro ao buscar work items: $($_.Exception.Message)"
    }
}

function Get-Repositories {
    param(
        [string]$Organization,
        [string]$Project,
        [hashtable]$Headers
    )

    $uri = "https://dev.azure.com/$Organization/$Project/_apis/git/repositories?api-version=6.0"
    try {
        $response = Invoke-RestMethod -Uri $uri -Headers $Headers -Method Get
        return $response.value
    }
    catch {
        Write-Error "Erro ao buscar repositórios: $($_.Exception.Message)"
    }
}

function Get-BuildDefinitions {
    param(
        [string]$Organization,
        [string]$Project,
        [hashtable]$Headers
    )

    $uri = "https://dev.azure.com/$Organization/$Project/_apis/build/definitions?api-version=6.0"
    try {
        $response = Invoke-RestMethod -Uri $uri -Headers $Headers -Method Get
        return $response.value
    }
    catch {
        Write-Error "Erro ao buscar build definitions: $($_.Exception.Message)"
    }
}

# Função para extrair métricas de delivery para TR Change System
function Export-DeliveryMetrics {
    param(
        [string]$Organization,
        [string]$Project,
        [hashtable]$Headers,
        [string]$OutputPath = "delivery-metrics.json"
    )

    Write-Host "Coletando métricas de delivery..." -ForegroundColor Green

    $metrics = @{
        timestamp = Get-Date -Format "yyyy-MM-ddTHH:mm:ssZ"
        organization = $Organization
        project = $Project
        workItems = Get-WorkItems -Organization $Organization -Project $Project -Headers $Headers
        repositories = Get-Repositories -Organization $Organization -Project $Project -Headers $Headers
        buildDefinitions = Get-BuildDefinitions -Organization $Organization -Project $Project -Headers $Headers
    }

    $json = $metrics | ConvertTo-Json -Depth 10
    $json | Out-File -FilePath $OutputPath -Encoding UTF8

    Write-Host "Métricas exportadas para: $OutputPath" -ForegroundColor Green
}

# Exemplo de uso:
# $pat = "SEU_TOKEN_AQUI"
# $headers = Get-AzureDevOpsHeaders -PersonalAccessToken $pat
# Export-DeliveryMetrics -Organization "tr-ggo" -Project "SEU_PROJETO" -Headers $headers

Write-Host @"
=========================================
Azure DevOps Integration para TR Change System
=========================================

1. Configure suas credenciais de forma segura
2. Execute Export-DeliveryMetrics para coletar dados
3. Use os dados nos templates do TR Change System

SEGURANÇA: Nunca hardcode tokens no código!
"@ -ForegroundColor Cyan