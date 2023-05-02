# Getting started

## Setup

### Server - Docker containers & HTTPS

1. Run the command `dotnet dev-certs https --trust` in the root directory of the project.
   For Linux, follow the instructions [Here](https://learn.microsoft.com/en-us/aspnet/core/security/enforcing-ssl?view=aspnetcore-7.0&tabs=visual-studio%2Clinux-ubuntu#ssl-linux).
2. Run `docker-compose up -d` in the root directory of the project to add Redis container and PostgreSQL Database.

#### Environment variables

The application uses "Secret manager" More info can be found [here](https://learn.microsoft.com/en-us/aspnet/core/security/app-secrets)

1. `cd` into `API` project and run the following commands to set up the secret keys for this app:
2. `dotnet user-secrets set "StripeSettings:SecretKey" "[Value]"`
3. `dotnet user-secrets set "StripeSettings:PublishableKey" "[Value]"`
4. `dotnet user-secrets set "StripeSettings:WebhookEndpointSecret" "[Value]"`

These commands will create a `secrets.json` on your local machine that will be used for this app!  
And as mentioned in the documentation, that will be stored in:

- For windows - `%APPDATA%\Microsoft\UserSecrets\40b43269-683b-41a0-9485-2385ec3ce3dc\secrets.json`
- For Linux/macOs - `~/.microsoft/usersecrets/40b43269-683b-41a0-9485-2385ec3ce3dc/secrets.json`

### Client - HTTPS/SSL & Environment

#### HTTPS/SSL

1. Create a `ssl` folder in the root directory of the "Client" project.
2. Use https://github.com/FiloSottile/mkcert to generate certificate keys.
3. Next, `cd` into `ssl` folder and run the command `mkcert -install` and confirm installation, then run the command `mkcert localhost`
4. Restart any opened browsers!

#### Environment variables

1. Create `.env` file in the root directory of the "Client" project.
2. Fill the required environment variables. (use `.env.example` to see the variables that the app uses)

## Edit mode

In both, API `appsettings.json` project and Client `environments folder`, there is a "Edit Mode" trigger in the environment variables to control adding and updating shop products, this only for convenience and should use in development only.
