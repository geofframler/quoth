# Quoth

## A Quotes App

Quoth is a single page application built in React as a front end demonstration for future employers. It lets the user:

1. Pull a list of quotes from an API.
2. Create a new quote.
3. Update a quote.
4. Delete a quote.
5. Sort quotes New to Old, Old to New, Author A-Z, and Author Z-A.
6. Search for quotes.

There are also examples of e2e tests using [cypress](https://www.cypress.io) in the cypress folder.

This project was built using:

1. A [create-react-app](https://facebook.github.io/create-react-app/docs/) to run the application in development mode.
2. The [cypress](https://www.cypress.io/) testing suite.
3. A local json-server api to CRUD (Create Read Update Delete) the quotes.

## Getting started

Make sure you are running `nodejs >= 10` before starting.

In the project directory, run: `yarn` to install all the dependencies. Then you can run the following commands:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn api`

Runs the api locally.<br>
The api is available @ [http://localhost:3001](http://localhost:3001).

### `yarn cypress run`

Executes the Cypress test suite in the terminal (headless mode).

## API Specification

All the data is persisted in the `db.json` file located at the root of the repository. The API is built using [json-server](https://github.com/typicode/json-server)

### Data model

The data model includes a single entity, the `quote` object:

```
{
  id: int, //auto increment
  author: string, // the quote author
  body: string, // the quote text
  source: string // the url pointing to the author profile
}
```