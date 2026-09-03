Get-ChildItem -Path "papers\paper4" -File -Recurse | Where-Object { $_.Name -ne "PAPER4_REPRODUCIBILITY_SHA256SUMS_2026-08-29.txt" -and $_.Name -ne "PAPER4_V1.1_HASHES.sha256" } | ForEach-Object {
    $hash = Get-FileHash -Path $_.FullName -Algorithm SHA256
    $relativePath = $_.FullName.Substring($PWD.Path.Length + 1).Replace('\', '/')
    "$($hash.Hash) $relativePath"
} | Out-File -FilePath "papers\paper4\reproducibility\PAPER4_REPRODUCIBILITY_SHA256SUMS_2026-08-29.txt" -Encoding ascii
