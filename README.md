# GenericCDSS - Generic Clinical Decision Support System


[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://github.com/bioinformatics-ua/GenericCDSS/tree/master)

GenericCDSS is a web-based application, which provides the main dashboard where professionals (e.g, practitioners, nurses) can follow all the patients that are under their responsibility and some details about the state of each one.
Dillinger is a cloud-enabled, mobile-ready, offline-storage, AngularJS powered HTML5 Markdown editor.

# New Features!

  - Manage all the patient information dynamically
  - Create and manage clinical protocols
  - Assign protocols to the patients and execute them

You can also:
  - Easly costumize the patient information
  - Keep track of all the patient data
  - Be reminder about the next measurement for each patient admitted in the system
 
GenericCDSS follows a Client-Server model, in which each side is sub-divided in several layers.

The Client side encapsulate mostly of the presentation part of the system. It is divided into 2 layers, the presentation, and the controller layer. The presentation layer is responsible for the user interfaces. The controller layer consumes the backend webservices and provides the data to the presentation layer.

The Server, which is mainly the backend core, is subdivided into 3 sub-layers: 1) business; 2) persistence; and 3) service provider. The persistence layer is responsible for storing and maintaining the system’s data. The business layer contains most of the application’s logic. Finally, the service layer provides a RESTful API with services prepared to interact with all the system’s functions with or without the client. This layer will be used by the client to access all the core features.

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

Edit docker-compose.yml with deploy specific details. The varibles that should be configured are the following:

```sh
4  - POSTGRES_USER= user used in the postgreSQL. This user should match wih the user used in row 23
5  - POSTGRES_PASS= password used in the postgreSQL. This password should match wih the user used in row 23
...
10 - "xxxx:8000" change the xxxx for the port to access the container
...      
23 - DOCKER_POSTGRES_USER= user used in the postgreSQL.
24 - DOCKER_POSTGRES_PASS= password used in the postgreSQL. 
25 - DOCKER_POSTGRES_DB= database name
26 - DOCKER_POSTGRES_HOST= host name, default is the container defined in the docker-compose file
27 - DOCKER_POSTGRES_PORT= db container port
28 - DEPLOY_MODE= the execution mode, if demo the database will be fulfilled with random data
29 - API_URL= the api url, that ends with api/
30 - HOMEPAGE= the system homepage url
31 - BASE_URL= the base url is used when exist a prefix in the homepage url. For instance, www.page.com/genericcdss, in this case it is necessary define the genericcdss in this variable
```

After the costumization of the docker-compose file, it is only necessary perform the following commands to have the installation running. (This process can take a few minutes)

```sh
$ make build
$ make run
```

### Scientific contributions

<pre>
João Rafael Almeida, Joana Guimarães, and José Luís Oliveira. "Simplifying the digitization of clinical protocols for diabetes management." 2018 IEEE 31st International Symposium on Computer-Based Medical Systems (CBMS). IEEE, 2018.
</pre>

### Todos

 - Write the todos

License
----
