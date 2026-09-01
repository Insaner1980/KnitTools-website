Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$projectRoot = Resolve-Path -LiteralPath (Join-Path $PSScriptRoot "..")

Push-Location -LiteralPath $projectRoot
try {
    npm run verify
    $verifyExitCode = $LASTEXITCODE
} finally {
    Pop-Location
}

exit $verifyExitCode
