# Neueda-Hackathon
This is a maven springboot project with Spring Web and Spring JPA Repo dependencies for accessing a MongoDB Database hosted on Atlas Cloud. It refers to a database stored in `FreeCluster` called `neueda-hackathon` containing customer data in the `customers` collection. It provides a simple Swagger UI for executing various API requests.
<br><br>

Please obtain the `Connection String for MongoDB Database` from us. It will be used to connect to the database via MongoDB Compass or via web application.

## Getting Started
1. Run the following command in the project's root directory to start the backend Springboot application, Springboot will be running on `port 8080`
```
mvn spring-boot:run
```
2. To access Swagger UI API Documentation, navigate to `http://localhost:8080/swagger-docs` in your browser
3. Run the following commands in the `front-end` directory to start the frontend React application, React will be running on `port 5173`
```
npm install
npm run dev
```