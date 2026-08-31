# Paper 4 Build Instructions

This directory contains the script to reproducibly build the Paper 4 manuscript from its Markdown source.

## Requirements
* **Pandoc**: version 3.11 (or compatible range)
* **TeX Engine**: MiKTeX-pdfTeX 4.23 (or a compatible pdflatex distribution)

## Command
Run the build script from this directory:
```powershell
.\build_paper4.ps1
```

The script will copy the markdown source and figures into a temporary directory, run pandoc, and output the rebuilt PDF to `../manuscript/PAPER4_PREPRINT_v1.1_2026-08-29.pdf`.

Note that rebuilding may produce a byte-different PDF due to PDF metadata (like creation date), but the visual layout and text will be identical.
