# prod-coc-server

## Overview

This application is a POC (Proof of Concept) for a service that serves up an API
backend for poc-coc.

## How to Develop

1. Install the required packages: `npm install`
2. Run the application: `npm start`
3. Check that the application is running by visiting
   [localhost:8080](http://localhost:8080)

## Creating database migrations

1. Install db-migrate globally run `npm install -g db-migrate`
2. Install db-migrate locally by running `npm install db-migrate or npm install`
3. To create a new migration run `db-migrate create [Name_Of_Migration]`
4. Fill out the exports.up and exports.down functions with your schema changes.
5. Run `db-migrate up -e [ENV]` where [ENV] is the name of the environment you
   are targeting in the database.json file.

example command to create a new migration and run it against an environment
named "pg" targeting a postgres database: db-migrate create CreatUserTable
db-migrate up -e pg

Example database.json

```json
{
  "dev": {
    "driver": "sqlite3",
    "filename": "database/database.db"
  },

  "test": {
    "driver": "sqlite3",
    "filename": ":memory:"
  },

  "pg": {
    "driver": "pg",
    "user": "user",
    "password": "password",
    "host": "localhost",
    "port": 54320,
    "database": "coc",
    "schema": "public"
  }
}
```

Documentation https://db-migrate.readthedocs.io/en/latest/

## How to install Docker on Linux

1. update `sudo apt-get update`
2. Remove old Docker software
   `sudo apt-get remove docker docker-engine docker.io`
3. Install docker `sudo apt install docker.io`
4. State and automate docker at startup `sudo systemctl start docker`
   `sudo systemctl enable docker`
5. Install docker compose `sudo apt install docker-compose`
6. Create a new group account `sudo groupadd docker`
7. Modify system account `sudo usermod -aG docker $USER`
8. Logout and/or restart
9. Change docker compose ownership
   `sudo chown $USER:$USER /usr/local/bin/docker-compose`

## How to run docker

1. Navigate to project root
2. Start up the docker image `docker-compose up -d` 2b. If you are having issues
   running this on windows run without `-d` option
3. To access database directly `psql -h localhost -p 54320 -U coc -d coc`
4. When done spin down the container `docker-compose down`

### How to run the application end-to-end

1. run docker-compose up -d from the prod-coc-server project
2. run node index.js from the prod-coc-server project 2b. If you are having
   issues running this on windows run without -d option
3. run npm start from the prod-coc-client project
4. To access the database directly use the command
   `docker exec -it coc_postgres psql -U coc`
