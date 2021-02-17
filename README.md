# Hit and Blow

A [code-breaking game](https://en.wikipedia.org/wiki/Mastermind_(board_game))

## Play

Guess a sequence of four colors by dragging and dropping the colors into position or clicking an empty position to select it and then clicking a color to fill that position. Duplicate colors are allowed.

A color that is in the correct position will result in a hit (orange). A color that is present in the target but in a different positon will result in a blow (white).

## Build and run

Build:
````
npm run build
````

Develop:
````
npm run start
````

## Details

- [TypeScript](https://www.typescriptlang.org)
- [Webpack](https://webpack.js.org/) with webpack-dev-server in development mode
- [MobX](https://mobx.js.org) for state management
- [React](https://reactjs.org/)
- [Styled Components](https://styled-components.com) for CSS