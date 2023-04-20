# Getting started
## HTTPS/SSL
1. Run the command `dotnet dev-certs https --trust` in the root directory of the project.
2. For the Angular Client project, create a `ssl` folder in the root directory of the "Client" project.
3. Use https://github.com/FiloSottile/mkcert to generate certificate keys
4. Next, run the command `mkcert -install` and confirm installation, then run the command `mkcert localhost`
5. Restart opened browsers!

## Docker compose
1. run `docker compose up` in the root directory of the project to add Redis required container