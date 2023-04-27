# Getting started

## Setup

### Server - Docker containers & HTTPS

1. Run the command `dotnet dev-certs https --trust` in the root directory of the project.
2. Run `docker compose up` in the root directory of the project to add Redis container and PostgreSQL Database.

### Client - HTTPS/SSL & Environment

#### HTTPS/SSL

1. Create a `ssl` folder in the root directory of the "Client" project.
2. Use https://github.com/FiloSottile/mkcert to generate certificate keys.
3. Next, `cd` into `ssl` folder and run the command `mkcert -install` and confirm installation, then run the command `mkcert localhost`
4. Restart any opened browsers!

#### Environment variables

1. Create `.env` file in the root directory of the "Client" project.
2. Fill the required environment variables (use `.env.example` to see the variables that the app uses)
