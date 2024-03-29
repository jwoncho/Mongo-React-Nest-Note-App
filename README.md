# Mongo-React-Nest-Note-App
A simple note app with user authentication using mongo, react, and nest js

## How to start the web application
### Windows
Make sure you have Docker Desktop installed.
Start Docker Desktop

Head over to the project directory and locate the docker-compose.yml file
and enter the command in the terminal
```
docker-compose up --build
```
This should get all the dependencies and start the backend, frontend, and mongo server.

To access the web application go to http://localhost:3000


## Restarting
Run the following command to remove the containers:
```
docker-compose down
```

To delete the cache:
```
docker-compose build --no-cache
```

Then restart the docker-compose:
```
docker-compose up --build
```


## Mongo Authentication Failed
Run this command to remove the docker volume:
```
docker volume rm mongo-react-nest-note-app_mongodb_data
```