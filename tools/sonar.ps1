#Requires -Version 5.1

[CmdletBinding()]
param(
    [Parameter(ValueFromRemainingArguments = $true)]
    [string[]]$SonarArgs
)

$ErrorActionPreference = "Continue"
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()
$OutputEncoding = [Console]::OutputEncoding

function Get-RepositoryRoot {
    param([string]$Start)

    $dir = (Resolve-Path -LiteralPath $Start).Path
    while (-not [string]::IsNullOrWhiteSpace($dir)) {
        if (Test-Path -LiteralPath (Join-Path $dir ".git")) {
            return $dir
        }

        $parent = Split-Path -Parent $dir
        if ([string]::IsNullOrWhiteSpace($parent) -or $parent -eq $dir) {
            return (Resolve-Path -LiteralPath $Start).Path
        }
        $dir = $parent
    }
}

function Invoke-SonarCli {
    param([string[]]$Arguments)

    $cli = Get-Command sonar.exe -CommandType Application -ErrorAction SilentlyContinue
    if ($null -eq $cli) {
        throw "sonar.exe ei löytynyt PATHista."
    }

    & $cli.Source @Arguments
    exit $(if ($null -ne $global:LASTEXITCODE) { [int]$global:LASTEXITCODE } else { 0 })
}

function Get-SonarProjectProperties {
    param([string]$RepoRoot)

    $path = Join-Path $RepoRoot "sonar-project.properties"
    if (-not (Test-Path -LiteralPath $path)) {
        throw "sonar-project.properties ei löytynyt: $path"
    }

    $properties = @{}
    foreach ($line in Get-Content -LiteralPath $path -Encoding utf8) {
        $trimmed = $line.Trim()
        if ([string]::IsNullOrWhiteSpace($trimmed) -or $trimmed.StartsWith("#")) {
            continue
        }

        $separator = $trimmed.IndexOf("=")
        if ($separator -lt 1) {
            continue
        }

        $key = $trimmed.Substring(0, $separator).Trim()
        $value = $trimmed.Substring($separator + 1).Trim()
        $properties[$key] = $value
    }

    return $properties
}

if ($SonarArgs.Count -gt 0) {
    Invoke-SonarCli -Arguments $SonarArgs
}

$repoRoot = Get-RepositoryRoot -Start (Get-Location).Path
$sonarProperties = Get-SonarProjectProperties -RepoRoot $repoRoot
$reportsDir = Join-Path $repoRoot "reports"
$scanReport = Join-Path $reportsDir "sonar.txt"
$issuesReport = Join-Path $reportsDir "sonar-issues.json"
$projectKey = $sonarProperties["sonar.projectKey"]

if ([string]::IsNullOrWhiteSpace($projectKey)) {
    throw "sonar.projectKey puuttuu sonar-project.properties-tiedostosta."
}

New-Item -ItemType Directory -Force -Path $reportsDir | Out-Null

Set-Content -LiteralPath $scanReport -Encoding utf8 -Value @(
    "sonar"
    "Root: $repoRoot"
    "Project: $projectKey"
    "Command: reports/sonar.txt :: npx --yes @sonar/scan@4.3.5"
    "Started: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
    ""
)

Push-Location -LiteralPath $repoRoot
try {
    $env:SONAR_HOST_URL = if ($env:SONAR_HOST_URL) { $env:SONAR_HOST_URL } else { "https://sonarcloud.io" }

    if (-not $env:SONAR_TOKEN) {
        Add-Content -LiteralPath $scanReport -Encoding utf8 -Value @(
            "SONAR_TOKEN ei ole asetettu tälle shellille."
            "SonarQube CLI:n `sonar auth login` riittää issueiden lukemiseen, mutta NPM-skannaus tarvitsee SONAR_TOKEN-arvon."
            "Luo/aseta analyysitoken ja aja esimerkiksi: `$env:SONAR_TOKEN=`"...`"; sonar"
            ""
        )
        Get-Content -LiteralPath $scanReport
        exit 1
    }

    $npx = Get-Command npx.cmd -CommandType Application -ErrorAction SilentlyContinue
    if ($null -eq $npx) {
        throw "npx.cmd ei löytynyt PATHista."
    }

    $scannerOutput = & $npx.Source "--yes" "@sonar/scan@4.3.5" *>&1
    $scanExitCode = if ($null -ne $global:LASTEXITCODE) { [int]$global:LASTEXITCODE } else { 0 }
    $scannerOutput |
        Tee-Object -FilePath $scanReport -Append |
        Out-Host

    if ($scannerOutput -match "Automatic Analysis is enabled") {
        $scanExitCode = 1
        $automaticAnalysisMessage = @(
            ""
            "SonarCloudissa on Automatic Analysis päällä tälle projektille."
            "Manuaalinen `sonar`-skannaus toimii vasta, kun se poistetaan käytöstä SonarCloudissa:"
            "Project > Administration > Analysis Method > poista Enabled for this project."
            ""
        )
        Add-Content -LiteralPath $scanReport -Encoding utf8 -Value $automaticAnalysisMessage
        $automaticAnalysisMessage | Out-Host
    }

    $cli = Get-Command sonar.exe -CommandType Application -ErrorAction SilentlyContinue
    if ($null -ne $cli) {
        & $cli.Source "list" "issues" "--project" $projectKey "--statuses" "OPEN,CONFIRMED" "--format" "json" *>&1 |
            Tee-Object -FilePath $issuesReport |
            Out-Null
    }

    exit $scanExitCode
}
finally {
    Pop-Location
}
