# react-list-component

[![Build Status](https://travis-ci.org/the-road-to-learn-react/react-list-component.svg?branch=master)](https://travis-ci.org/the-road-to-learn-react/react-list-component) [![Slack](https://slack-the-road-to-learn-react.wieruch.com/badge.svg)](https://slack-the-road-to-learn-react.wieruch.com/) [![Greenkeeper badge](https://badges.greenkeeper.io/the-road-to-learn-react/react-list-component.svg)](https://greenkeeper.io/)

Different list components implemented in React. [Read more about it](https://www.robinwieruch.de/react-list-components/).

[![Edit react-list-component](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/the-road-to-learn-react/react-list-component/tree/master/?fontsize=14)


## Installation

* `git clone git@github.com:the-road-to-learn-react/react-list-component.git`
* cd react-list-component
* npm install
* npm start
* visit `http://localhost:3000/`

## Node.js 17+ / OpenSSL error

If `npm start` fails with **`ERR_OSSL_EVP_UNSUPPORTED`** / **`digital envelope routines::unsupported`**, this repo uses **`react-scripts` 3.x** with an older webpack that does not match Node’s default OpenSSL provider.

This project’s `start` / `build` scripts set **`NODE_OPTIONS=--openssl-legacy-provider`** via `cross-env`, which fixes it on Node 22 and similar versions.

Alternatively, use **Node 16 LTS** with `nvm` / `fnm`, or upgrade `react-scripts` (larger change).
