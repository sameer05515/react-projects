# Dependency fix

This version pins `styled-components` to `6.1.19` because the current 6.5.x line introduces an optional React Native peer path that can cause npm 11 to attempt a React 19 type resolution in this React 18 / CRA 5 project.

The 6.1.19 package has React and React DOM peer dependencies (`>=16.8.0`) and does not declare the React Native peer that caused the ERESOLVE conflict.

Run:

```powershell
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
npm cache verify
npm install
npm start
```

Do not use `--force` or `--legacy-peer-deps` for this project unless you intentionally want npm to ignore dependency constraints.
