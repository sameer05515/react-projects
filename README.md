# react-projects

## Error message "error:0308010C:digital envelope routines::unsupported"
Open terminal and paste these as described:

Linux and macOS (Windows Git Bash)-

```export NODE_OPTIONS=--openssl-legacy-provider```

Windows command prompt-

```set NODE_OPTIONS=--openssl-legacy-provider```

Windows PowerShell-

```$env:NODE_OPTIONS = "--openssl-legacy-provider"```

https://stackoverflow.com/questions/69692842/error-message-error0308010cdigital-envelope-routinesunsupported