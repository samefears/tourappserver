# Tour App Server

Node application running an Express application. Connected to a Mongo instance.

## Development Locally
A Docker image exists that will run a local instance of MongoDB and the Node application. Changes are automatically loaded via Nodemon, and data is persisted in the volume for DB information.

### Install Docker locally
To run a docker image on your machine, you will need to install Docker - [https://docs.docker.com/docker-for-mac/install/](https://docs.docker.com/docker-for-mac/install/)

### Build the local development container for Docker
If this is the first time running the application, you will need to build to image.
```bash
docker-compose -f docker-compose.development.yml build
```

### Running the app
To run the image and start MongoDB and the application, run docker-compose with the development configuration
```bash
docker-compose -f docker-compose.development.yml up
```

To stop the running container, press `ctrl-c` to kill the processes.

**Note: if you want to run the container in the background, follow the steps below**
- Run the container in detached mode:
  ```bash
  docker-compose -f docker-compose.development.yml up -d
  ```
- To stop the container:
  ```bash
  docker-compose -f docker-compose.development.yml down
  ```
