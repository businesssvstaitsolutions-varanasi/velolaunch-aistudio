# VeloLaunch Portable Media Source Package

This package contains a portable copy of the VeloLaunch visual assets and company video used by the website as of August 2026.

| Directory | Contents | Intended use |
|---|---|---|
| `optimized/` | WebP hero and supporting artwork | Efficient web delivery alternatives |
| `original/` | Supplied PNG artwork and logo sources | Design, editing, or high-fidelity reuse |
| `video/` | The company-section MP4 video | Reuse in supported deployments |
| `icons/` | Favicon and application icon files | Browser and PWA branding |
| `technology-logos/` | Contextual technology marks | Website ecosystem display only |

## Important delivery note

The deployed VeloLaunch site intentionally continues to load its live images and video from managed `/manus-storage/...` URLs. This archive is for portability and source control; it does **not** change runtime asset URLs or add large media to the deployable application tree.

To obtain a local copy after downloading this package, extract the ZIP and use the files directly from the listed directories. Do not commit environment files or private credentials alongside these assets.
