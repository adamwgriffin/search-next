# Search-Next

A real estate search app written with Next.js.

## Getting Started

Add a .env.local file at the top level of the project with the following environment variables:

```
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=[the Google Maps API key]
NEXT_PUBLIC_GOOGLE_MAPS_ID=[A Map ID is required for the version of Google Maps API that we use]
NEXT_PUBLIC_LOCALE=en-US
NEXT_PUBLIC_CURRENCY=USD
SERVICE_BASE=http://localhost:3001
```

Install:
* Node.js >= 18.17.0 
* yarn >= 1.22.19

If you use asdf you can just run `asdf install` for node.

Run `yarn install` to install dependencies.

Run the development server with `yarn dev`.

Run the tests with `yarn test`.
