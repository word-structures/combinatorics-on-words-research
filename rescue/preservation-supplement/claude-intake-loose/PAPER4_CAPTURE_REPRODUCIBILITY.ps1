param(
  [string]$RepoRoot = "C:\abc-worktrees\profile-response-baseline-h2-h7-2026-08-25",
  [string]$OutDir = ""
)

$ErrorActionPreference = "Stop"

if (-not (Test-Path -LiteralPath $RepoRoot)) {
  throw "RepoRoot does not exist: $RepoRoot"
}

if ([string]::IsNullOrWhiteSpace($OutDir)) {
  $OutDir = Join-Path $RepoRoot "scratch\paper4-repro-capture-2026-08-29"
}
New-Item -ItemType Directory -Force -Path $OutDir | Out-Null

function Rel([string]$Path) {
  $rp = (Resolve-Path -LiteralPath $Path).Path
  $root = (Resolve-Path -LiteralPath $RepoRoot).Path.TrimEnd('\')
  if ($rp.StartsWith($root, [System.StringComparison]::OrdinalIgnoreCase)) {
    return $rp.Substring($root.Length).TrimStart('\')
  }
  return $rp
}

function FileRecord([string]$Path, [string]$Role, [string]$Category) {
  $item = Get-Item -LiteralPath $Path
  $hash = (Get-FileHash -LiteralPath $Path -Algorithm SHA256).Hash.ToLowerInvariant()
  return [ordered]@{
    category = $Category
    role = $Role
    path = Rel $Path
    sha256 = $hash
    bytes = [int64]$item.Length
    last_write_utc = $item.LastWriteTimeUtc.ToString("o")
  }
}

function TreeManifest([string]$Dir, [string]$Role, [string]$Category) {
  $files = Get-ChildItem -LiteralPath $Dir -Recurse -File | Sort-Object FullName
  $lines = @()
  $entries = @()
  foreach ($f in $files) {
    $h = (Get-FileHash -LiteralPath $f.FullName -Algorithm SHA256).Hash.ToLowerInvariant()
    $rel = (Rel $f.FullName).Replace('\','/')
    $lines += "$h  $rel"
    $entries += [ordered]@{
      path = Rel $f.FullName
      sha256 = $h
      bytes = [int64]$f.Length
    }
  }
  $tmp = Join-Path $OutDir "__treehash.tmp"
  [IO.File]::WriteAllText($tmp, (($lines -join "`n") + "`n"), [Text.UTF8Encoding]::new($false))
  $treeHash = (Get-FileHash -LiteralPath $tmp -Algorithm SHA256).Hash.ToLowerInvariant()
  Remove-Item -LiteralPath $tmp -Force
  return [ordered]@{
    category = $Category
    role = $Role
    path = Rel $Dir
    file_count = $files.Count
    tree_sha256 = $treeHash
    entries = $entries
  }
}

$targets = @(
  @{ category="theorem"; role="master six-domain checker"; name="sixdomain_full.js" },
  @{ category="theorem"; role="master six-domain output"; name="sixdomain_full.json" },
  @{ category="theorem"; role="v0.32a independent six-domain checker"; name="v032a_sixdomain_check.js" },
  @{ category="theorem"; role="v0.32a independent six-domain output"; name="v032a_sixdomain_check.json" },
  @{ category="implementation"; role="AFE implementation semantics checker"; name="v032a_impl_semantics.js" },
  @{ category="implementation"; role="AFE implementation semantics output"; name="v032a_impl_semantics.json" },

  @{ category="afe_crosscheck"; role="AFE-only crosscheck"; name="afe_only_crosscheck.js" },
  @{ category="afe_crosscheck"; role="AFE controls"; name="afe_controls.js" },
  @{ category="afe_crosscheck"; role="AFE 263 runner"; name="afe_263_run.js" },
  @{ category="afe_crosscheck"; role="AFE controls output"; name="afe_controls.json" },
  @{ category="afe_crosscheck"; role="AFE 263 output"; name="afe_263_crosscheck.json" },
  @{ category="afe_crosscheck"; role="AFE preregistration"; name="AFE_EXISTS_263_CROSSCHECK_PROTOCOL_2026-08-29.md" },
  @{ category="afe_crosscheck"; role="AFE preregistration frozen hash"; name="PROTOCOL_AFE_263.sha256" },

  @{ category="rx_h"; role="Aset-size feasibility checker"; name="aset_sizes.js" },
  @{ category="rx_h"; role="Aset-size RX output"; name="aset_sizes_R.json" },
  @{ category="rx_h"; role="Aset-size H output"; name="aset_sizes_H.json" },
  @{ category="rx_h"; role="RX AF runner"; name="rx_run.js" },
  @{ category="rx_h"; role="RX downstream checker"; name="rx_bcd.js" },
  @{ category="rx_h"; role="H quota derivation"; name="rx_h_matched.js" },
  @{ category="rx_h"; role="H quota output"; name="h_matched_quota.json" },
  @{ category="rx_h"; role="population comparison"; name="rx_compare.js" },
  @{ category="rx_h"; role="population comparison output"; name="rx_vs_h_comparison.json" },
  @{ category="rx_h"; role="population per-E table"; name="rx_vs_h_perE.csv" },
  @{ category="rx_h"; role="RX preregistration"; name="PREREGISTRATION_EXPOSURE_MATCHED_R_2026-08-28.md" },
  @{ category="rx_h"; role="RX preregistration hash"; name="PREREG_EXPOSURE_MATCHED_R.sha256" },
  @{ category="rx_h"; role="RX deviation note"; name="PREREGISTRATION_EXPOSURE_MATCHED_R_DEVIATION_NOTE_2026-08-28.md" },

  @{ category="e_to_a"; role="E-level frozen input/output"; name="aset_E_frozen.json" },
  @{ category="e_to_a"; role="deep-shaving output"; name="aset_deep_shave.json" }
)

$records = @()
$missing = @()
$ambiguous = @()

foreach ($t in $targets) {
  $hits = @(Get-ChildItem -LiteralPath $RepoRoot -Recurse -File -Filter $t.name -ErrorAction SilentlyContinue)
  if ($hits.Count -eq 1) {
    $records += FileRecord $hits[0].FullName $t.role $t.category
  } elseif ($hits.Count -eq 0) {
    $missing += [ordered]@{ category=$t.category; role=$t.role; basename=$t.name }
  } else {
    $ambiguous += [ordered]@{
      category=$t.category
      role=$t.role
      basename=$t.name
      matches=@($hits | ForEach-Object { Rel $_.FullName })
    }
  }
}

$dirTargets = @(
  @{ category="rx_h"; role="clean RX run; authoritative"; name="afexRX2" },
  @{ category="rx_h"; role="voided concurrent-writer RX run; NEVER SCIENTIFIC EVIDENCE"; name="afexRX" },
  @{ category="rx_h"; role="RX downstream run"; name="bcdRX" }
)
$dirRecords = @()
foreach ($t in $dirTargets) {
  $hits = @(Get-ChildItem -LiteralPath $RepoRoot -Recurse -Directory -Filter $t.name -ErrorAction SilentlyContinue)
  if ($hits.Count -eq 1) {
    $dirRecords += TreeManifest $hits[0].FullName $t.role $t.category
  } elseif ($hits.Count -eq 0) {
    $missing += [ordered]@{ category=$t.category; role=$t.role; basename=$t.name; kind="directory" }
  } else {
    $ambiguous += [ordered]@{
      category=$t.category; role=$t.role; basename=$t.name; kind="directory"
      matches=@($hits | ForEach-Object { Rel $_.FullName })
    }
  }
}

$nodeVersion = $null
try { $nodeVersion = (& node --version 2>$null | Select-Object -First 1) } catch {}
$pythonVersion = $null
try { $pythonVersion = (& python --version 2>&1 | Select-Object -First 1) } catch {}
$gitHead = $null
$gitStatus = $null
try {
  $gitHead = (& git -C $RepoRoot rev-parse HEAD 2>$null | Select-Object -First 1)
  $gitStatus = @(& git -C $RepoRoot status --porcelain=v1 2>$null)
} catch {}

$capture = [ordered]@{
  schema = "paper4-repro-capture-v1"
  created_utc = [DateTime]::UtcNow.ToString("o")
  repo_root = (Resolve-Path -LiteralPath $RepoRoot).Path
  environment = [ordered]@{
    os = [Environment]::OSVersion.VersionString
    powershell = $PSVersionTable.PSVersion.ToString()
    node = $nodeVersion
    python = $pythonVersion
    git_head = $gitHead
    git_worktree_dirty_entries = $gitStatus
  }
  exact_file_records = $records
  run_directory_records = $dirRecords
  missing = $missing
  ambiguous = $ambiguous
  frozen_claim_anchors = [ordered]@{
    paper4_v033_manuscript_sha256 = "bf06dea9c8f10f7c4afb6da0cb69aa949e9d51f5c7dafa229dbdb04aa4a0e82d"
    rx_preregistration_sha256 = "bca2780f881ac23c9057d204f2e4cbc85f67945afd758bb9ef5abbe1e8d3463c"
    afe263_protocol_sha256 = "e56c3e2d4e33df84090ad53159cb5761de80da81427ddfe726401e5d38479641"
    carpi_nonidentifiability_lemma_sha256 = "e397ef3285187aabb6bbd4a5fec4e51c056294cba400249ebc88053a8ad829dd"
    distinctness_symbolic_proof_sha256 = "efc5d5ec9bd1b51fb7814c7f76dee99b0b13328b6e1f8866a2d929ceb427f856"
  }
  scientific_blacklist = @(
    [ordered]@{
      name = "afexRX"
      reason = "VOID_CONCURRENT_WRITERS"
      use = "Never use counts/timings as scientific result; retained only for provenance/cost-model history."
    }
  )
}

$jsonPath = Join-Path $OutDir "PAPER4_LOCAL_REPRO_CAPTURE_2026-08-29.json"
$capture | ConvertTo-Json -Depth 10 | Set-Content -LiteralPath $jsonPath -Encoding UTF8

$sumLines = @()
foreach ($r in $records | Sort-Object path) {
  $sumLines += "$($r.sha256)  $($r.path.Replace('\','/'))"
}
$sumPath = Join-Path $OutDir "PAPER4_LOCAL_REPRO_SHA256SUMS_2026-08-29.txt"
[IO.File]::WriteAllText($sumPath, (($sumLines -join "`n") + "`n"), [Text.UTF8Encoding]::new($false))

Write-Host "Capture written:"
Write-Host "  $jsonPath"
Write-Host "  $sumPath"
Write-Host ""
Write-Host "Unique files captured: $($records.Count)"
Write-Host "Run directories captured: $($dirRecords.Count)"
Write-Host "Missing targets: $($missing.Count)"
Write-Host "Ambiguous targets: $($ambiguous.Count)"
if ($ambiguous.Count -gt 0) {
  Write-Warning "Ambiguous basenames exist. Resolve them manually before promotion."
}
