# GenericCDSS - Generic Clinical Decision Support System


[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://github.com/bioinformatics-ua/GenericCDSS/tree/master)

GenericCDSS is a web-based application, which provides the main dashboard where professionals (e.g., practitioners, nurses) can follow all the patients that are under their responsibility and some details about the state of each one.

# New Features!

  - Manage all the patient information dynamically
  - Create and manage clinical protocols
  - Assign protocols to the patients and execute them

You can also:
  - Easily customise the patient information
  - Keep track of all the patient data
  - Be reminder about the next measurement for each patient admitted in the system
 
GenericCDSS follows a Client-Server model, in which each side is sub-divided in several layers.

The Client-side encapsulate most of the presentation part of the system. It is divided into two layers, the presentation, and the controller layer. The presentation layer is responsible for the user interfaces. The controller layer consumes the backend web services and provides the data to the presentation layer.

The Server, which is mainly the backend core, is subdivided into three sub-layers: 1) business; 2) persistence; and 3) service provider. The persistence layer is responsible for storing and maintaining the system’s data. The business layer contains most of the application’s logic. Finally, the service layer provides a RESTful API with services prepared to interact with all the system’s functions with or without the client. This layer will be used by the client to access all the core features.

### Tech

GenericCDSS uses a number of open source projects to work properly:

<pre>
* [ReactJS] - HTML enhanced for web apps!
* [NPM] - The frontend package manager
* [Django] - Web framework python-based
* [Django Rest Framework] - Toolkit for building Web APIs in Django projects
* [PostgreSQL] - The object-relational database management system
* [Docker] - The computer program that performs operating-system-level virtualization
* [Make] -  Utility for building and maintaining groups of programs
</pre>

### Installation

GenericCDSS requires Docker, Docker-compose and Make to run.

Install Docker

<pre>
* Full instructions here https://docs.docker.com/install/
</pre>

Install docker-compose

<pre>
* Full instructions here https://docs.docker.com/compose/install/
</pre>

Edit docker-compose.yml with deploy specific details. The variables that should be configured are the following:

```sh
4  - POSTGRES_USER= user used in the PostgreSQL. This user should match with the user used in row 23
5  - POSTGRES_PASS= password used in the PostgreSQL. This password should match with the user used in row 23
...
10 - "xxxx:8000" change the xxxx for the port to access the container
...      
23 - DOCKER_POSTGRES_USER= user used in the PostgreSQL.
24 - DOCKER_POSTGRES_PASS= password used in the PostgreSQL. 
25 - DOCKER_POSTGRES_DB= database name
26 - DOCKER_POSTGRES_HOST= hostname, the default configuration is the container defined in the docker-compose file
27 - DOCKER_POSTGRES_PORT= DB container port
28 - DEPLOY_MODE= the execution mode, if demo the database will be fulfilled with random data
29 - API_URL= the API URL, that ends with api/
30 - HOMEPAGE= the system homepage URL
31 - BASE_URL= the base URL is used when existing a prefix in the homepage URL. For instance, www.page.com/genericcdss, in this case, it is necessary to define the genericcdss in this variable
```

After the customisation of the docker-compose file, it is only necessary to perform the following commands to have the installation running. (This process can take a few minutes)

```sh
$ make build
$ make docker-run
```



----
