# Neueda-Hackathon
This is a maven springboot project with Spring Web and Spring JPA Repo dependencies for accessing a MongoDB Database hosted on Atlas Cloud. It refers to a database stored in FreeCluster called neueda-hackathon containing customer data in the 'customers' collection. It provides a simple Swagger UI for making various commands.
<br><br>

Connection String for MongoDB database is: mongodb+srv://htho002:asdfghjkl@freecluster.7zxdvqe.mongodb.net/neueda_hackathon?retryWrites=true&w=majority&appName=FreeCluster

Please connect to it via MongoDB Compass or via web application.

## Getting Started
1. Run the following command in the neueda-hackathon directory to run the backend Springboot application, Springboot will be running on port 8080
```
mvn spring-boot:run
```
2. To access Swagger UI API Documentation, navigate to `http://localhost:8080/swagger-docs` in your browser
