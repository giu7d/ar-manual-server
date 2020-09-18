```
 ▄▄▄▄▄▄▄ ▄▄▄▄▄▄▄ ▄▄▄▄▄▄   ▄▄   ▄▄ ▄▄▄▄▄▄▄ ▄▄▄▄▄▄
█       █       █   ▄  █ █  █ █  █       █   ▄  █
█  ▄▄▄▄▄█    ▄▄▄█  █ █ █ █  █▄█  █    ▄▄▄█  █ █ █
█ █▄▄▄▄▄█   █▄▄▄█   █▄▄█▄█       █   █▄▄▄█   █▄▄█▄
█▄▄▄▄▄  █    ▄▄▄█    ▄▄  █       █    ▄▄▄█    ▄▄  █
 ▄▄▄▄▄█ █   █▄▄▄█   █  █ ██     ██   █▄▄▄█   █  █ █
█▄▄▄▄▄▄▄█▄▄▄▄▄▄▄█▄▄▄█  █▄█ █▄▄▄█ █▄▄▄▄▄▄▄█▄▄▄█  █▄█
```

# SERVER - MSc.

Server module for Agmented Reality Manual Application.

Part of my MSc. project

## Installing

We are using docker to manage our project dependencies, so first you will need to install [docker](https://www.docker.com/products/docker) and [docker compose](https://docs.docker.com/compose/install).

```bash
#Clone this repository:
git clone <url> server

# Open the project folder:
cd server

# Copy the sample ENV to a local `.env`:
cp .env.sample .env

# And finally, build the project using docker-compose:
docker-compose build
```

## Running

To run the application in **development** is simple as this

```bash
docker-compose up
```

### Production

To run the application in **production** use

```bash
docker-compose -f ./docker-compose.prod.yml up
```
