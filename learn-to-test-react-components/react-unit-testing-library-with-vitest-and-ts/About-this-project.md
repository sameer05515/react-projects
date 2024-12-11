# Project based on below YT video

[How to use Vitest with Jest-DOM and React Testing Library](https://www.youtube.com/watch?v=G-4zgIPsjkU)


##  triple slash directive 

[See description on Typescript documentation](https://www.typescriptlang.org/docs/handbook/triple-slash-directives.html#-reference-types-)


## Configuration issues

### 1. `Property 'toHaveTextContent' does not exist on type 'Assertion<HTMLElement>'.`

[Solution found on this link](https://github.com/testing-library/jest-dom/issues/620)

**Solution**: 

In tsconfig.json:
```
{
  "compilerOptions": {
    "types": ["@testing-library/jest-dom"]
  },
}
```