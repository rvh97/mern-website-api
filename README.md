# MERN-website-api

### A website implemented using the MERN stack.

### Tools in use

- MongoDB (Mongoose)
- Express
- React
- Node.js

Additional dependencies

- Passport - for authentication

# Setup

## GCP (Google Cloud Platform)

Info: Used to be able to login using Google.

### In APIs & Services:

- Enable the People API
- Create credentials (OAuth client ID) for an 'Web application' with redirect URI pointing to `/auth/google/redirect` route of server domain.
  - Development: the redirect URI should be set to
    `http://localhost:<PORT>/auth/google/redirect`
  - Production: To be written

### In App Engine:

Clone this repository to the cloud shell:

    git clone <repository>

## Environment variables setup

There are environment variables that must be set. They can be put in a file called `env_variables.yaml` (in root directory) in the format:

    env_variables:
      ENVIRONMENT_VARIABLE1: VALUE1
      ENVIRONMENT_VARIABLE2: VALUE2
      ...

### Environment variables:

- **CLIENT_SOCKET** - the address and port to UI, in development e.g. http://localhost:3000

- **SESSION_SECRET** - a randomized string used in hashing the server user sessions for security. Should just not be any easily guessable default string

- **COOKIE_MAX_AGE_MS** - After this time of user inactivity (in milliseconds), the user is logged out (session expired)

- **MONGO_URI** - MongoDB connection URI.

- **NODE_ENV** - If server is running in an `development` or `production` environment. In App Engine it is automatically set to `production`.

- **PASSPORT_GOOGLE_OAUTH20_CLIENT_ID** - OAuth 2.0 client ID of your GCP (Google Cloud Platform) project with People API enabled. (In GCP -> Your project -> APIs & Services -> Credentials)

* **PASSPORT_GOOGLE_OAUTH20_CLIENT_SECRET** - OAuth 2.0 client secret of your GCP project

* **PORT** - the port the server should listen to, e.g. 5000. In App Engine it is automatically set.

# Running the server

- In development:

      yarn run dev

- In production App Engine cloud shell:

      cd <repository>
      gcloud app create
      gcloud app deploy
