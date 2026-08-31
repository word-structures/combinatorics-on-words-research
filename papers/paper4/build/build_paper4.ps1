param(
    [string]$SourceFile = "..\manuscript\PAPER4_PREPRINT_v1.1_2026-08-29.md",
    [string]$OutputFile = "..\manuscript\PAPER4_PREPRINT_v1.1_2026-08-29.pdf"
)

Write-Host "Building Paper 4 PDF from Markdown..."

$ScriptDir = Split-Path $MyInvocation.MyCommand.Path -Parent
Push-Location $ScriptDir

$BuildDir = "temp_build"
if (Test-Path $BuildDir) { Remove-Item -Recurse -Force $BuildDir }
New-Item -ItemType Directory -Path $BuildDir | Out-Null

Copy-Item $SourceFile -Destination "$BuildDir\PAPER4_PREPRINT_v1.1_2026-08-29.md"
Copy-Item "..\figures\FIG1_SIX_CARRY_DOMAINS.pdf" -Destination "$BuildDir\"
Copy-Item "..\figures\FIG3_FIRST_HIT_PREFIX_TREE.pdf" -Destination "$BuildDir\"

Push-Location $BuildDir

Write-Host "Running pandoc..."
# Capture output and exit code carefully
$process = Start-Process -FilePath "pandoc" -ArgumentList "PAPER4_PREPRINT_v1.1_2026-08-29.md", "-f", "markdown+tex_math_single_backslash", "-o", "PAPER4_PREPRINT_v1.1_2026-08-29.pdf", "--pdf-engine=pdflatex" -Wait -NoNewWindow -PassThru

if ($process.ExitCode -ne 0) {
    Write-Error "Build failed: pandoc returned exit code $($process.ExitCode)."
    Pop-Location
    Remove-Item -Recurse -Force $BuildDir
    Pop-Location
    exit 1
}

if (-not (Test-Path "PAPER4_PREPRINT_v1.1_2026-08-29.pdf")) {
    Write-Error "Build failed: PDF file was not generated."
    Pop-Location
    Remove-Item -Recurse -Force $BuildDir
    Pop-Location
    exit 1
}

Write-Host "Build succeeded."
Pop-Location
Copy-Item "$BuildDir\PAPER4_PREPRINT_v1.1_2026-08-29.pdf" -Destination $OutputFile -Force
Write-Host "PDF copied to $OutputFile"

Remove-Item -Recurse -Force $BuildDir
Pop-Location
exit 0
