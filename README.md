# URL Shortener Microservice

## About The Project

Back-end project for the freeCodeCamp "Back End Development and APIs Projects" certification: an Express microservice that shortens URLs.

From the original README: this is the boilerplate code for the URL Shortener Microservice project. Instructions for building the project can be found at https://www.freecodecamp.org/learn/back-end-development-and-apis/back-end-development-and-apis-projects/url-shortener-microservice.

### Built With

- Node.js and Express
- CORS and dotenv

## Usage

- `POST /api/shorturl` with a `url` form field validates the URL (format and DNS lookup) and returns `{ "original_url": ..., "short_url": ... }`, or `{ "error": "invalid url" }`.
- `GET /api/shorturl/:short_url` redirects to the original URL, or to `/` when it is unknown.
- `GET /api/hello` returns a test greeting.

Shortened URLs are saved to a `urls.json` file in the working directory.

## Getting Started

### Prerequisites

- Node.js and npm

### Installation

```sh
npm install
cp sample.env .env
```

Set `PORT` in `.env` (the app falls back to 3000).

### Running

```sh
npm start
```

## License

The `package.json` declares the MIT license.

## Contact

Dyrits - https://github.com/Dyrits
