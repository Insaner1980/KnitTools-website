Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$projectRoot = Resolve-Path -LiteralPath (Join-Path $PSScriptRoot "..")

Push-Location -LiteralPath $projectRoot
try {
    npm run verify
} finally {
    Pop-Location
}
