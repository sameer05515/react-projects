# React Query Builder / MUI fix

This v2 uses:
- React Query Builder 8.24.4
- @react-querybuilder/material 8.24.4
- MUI 6.5.0
- react-scripts 5.0.1
- CRACO 7.1.0

CRA 5 does not consume a root webpack.config.js. `craco.config.js` is used to set `resolve.fullySpecified = false` for the `.mjs` rules so imports such as `@mui/material/Button` resolve correctly.

## Install

```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
npm install
npm start
```
