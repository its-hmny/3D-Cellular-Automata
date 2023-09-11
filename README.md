<p align="center">
    <img alt="Logo" width="400" src="https://github.com/its-hmny/3D-Cellular-Automata/blob/main/public/logo.png?raw=true">
</p>

<p align="center">
    <img alt="GPLv3 License" src="https://img.shields.io/badge/License-GPL%20v3-yellow.svg">
    <img alt="Code Size" src="https://img.shields.io/github/languages/code-size/its-hmny/3D-Cellular-Automata?color=green&label=Code%20Size">
    <img alt="Deploy" src="https://github.com/its-hmny/3D-Cellular-Automata/actions/workflows/Deploy.yaml/badge.svg">
    <img alt="Release" src="https://img.shields.io/github/v/release/its-hmny/3D-Cellular-Automata?label=Version">
</p>

# 3D Cellular Automata

## A Three.js webapp to simulate cellular automata in 3D

This project implements a simple playground to interact and tinker with Cellular Automata in 3D space. A live demo is available [here](https://its-hmny.github.io/3D-Cellular-Automata).

The webapp allows to import, export or generate a random seed as well as tweak with the simulation settings. The simulations can be carried out automatically, nevertheless the user can always stop it and manually step into the next generation.

## Installation

To install the dependencies and run the webapp locally, simply type in your terminal:

```bash
  # NOTE: npm or pnpm can be used as well
  yarn install
  yarn start:dev
```

You can also build a production version, both with an embedded Node.js server as well as standalone HTML (thanks to `next export`):

```bash
  yarn build:all  # With embedded Node.js server
  yarn build:html # Plain HTML, CSS and JS files exported
```

## Technology Stack

- [Typescript](https://www.typescriptlang.org/)
- [Next.js](https://nextjs.org/) / [React](https://reactjs.org/)
- [Three.js](https://threejs.org/) / [react-three-fiber](https://docs.pmnd.rs/react-three-fiber)

## Authors

- [@its-hmny](https://www.github.com/its-hmny) Follow me on [Twitter](https://twitter.com/its_hmny) as well

## License

This project is distributed under the [GPLv3](https://choosealicense.com/licenses/gpl-3.0/) license.
