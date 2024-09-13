# React storybook tutorial

Link: https://www.youtube.com/watch?v=BySFuXgG-ow&list=PLC3y8-rFHvwhC-j3x3t9la8-GQJGViDQk&index=1

## 01- Introduction

### What and Why?

- A development environment and playground for UI components
- Create components independently
- Showcase those components interactively in an isolated development environment
- Ability to view the different components that have already been developed
- View what are the different props that those developed components accept
- Ability to visually showcase those components to your stakeholders for feedback
- Dynamically change props, accessibility score.

## 2.1 - Getting Started with v6

- create a new react project
```
npx create-react-app react-storybook-v6
```

- add storybook
```
npx sb init
```

- by running `npx sb init` 
  - it adds `.storybook` folder in project root. There are 2 js files in this folder
    - `main.js` - from this js we export object with 2 properties
      - `stories`
      - `addons` - addons are additional features, which get used while developing stories
    - `preview.js` - contains configurations for the stories
  - it adds `stories` folder in src
    - this folder contains boiler-plate code for stories

- To run storybook
```
npm storybook
```

## 2.2 - Getting Started
- Same as 2.1, but for storybook v5

## 3 - Writing Stories

- A storybook is , basically, a collection of stories. and each story represents a single vision of component.

- As part of the story writing process, we will have 3 files
  - component itself
  - styles related to component
  - story related to component

### What happens after running `npm run storybook` command (after adding a custom component)
- command checks in `.storybook/main.js` for pattern and pickup the appropriate stories
- It sees that any file with `*.stories.js` has to be picked up.

## 4.1 - Story Hierarchy

## 4.2 - Renaming and Sorting Stories in v6

## 4.3 - Story within Story

## 4.4 - Using args in v6

## 5 - Decorators

## 6.1 - Theming

## 6.2 - Decorators and Theming in v6

## 7.1 - Addons in V6

## 7.2 - Addons

