# MERN-website-api

### A website implemented using the MERN stack.

### Tools in use

- MongoDB (Mongoose)
- Express
- React
- Node.js

Additional dependencies

- Passport - for authentication

# Running the server

## Environment variables setup

There are environment variables that must be set.

**Development**: dotenv dev-dependency is used. Create a file called '.env' in server root directory. Each line of the file should be formatted like `KEY=VALUE` for each environment variable to be set

**Production**: To be written

### Environment variables:

- **CLIENT_SOCKET** - the address and port to UI, in development e.g. http://localhost:3000

- **EXPRESS_SESSION_SECRET** - a randomized string used in hashing the session for security. Should just not be any easily guessable default string

- **COOKIE_MAX_AGE_MS** - After this time of user inactivity (in milliseconds), the user is logged out (session expired)

- **MONGO_URI** - MongoDB connection URI.

- **NODE_ENV** - If server is running in an 'development' or 'production' environment

- **PASSPORT_GOOGLE_OAUTH20_CLIENT_ID** - OAuth 2.0 client ID of your GCP (Google Cloud Platform) project with People API enabled. (In GCP -> Your project -> APIs & Services -> Credentials)

* **PASSPORT_GOOGLE_OAUTH20_CLIENT_SECRET** - OAuth 2.0 client secret of your GCP project

* **PORT** - the port the server should listen to, e.g. 5000

## Run server

- In development: `yarn run dev`
- In production: To be written
