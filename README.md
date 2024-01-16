# Auth manager 

This is the first microservice of the `Project manager` cluster.

### About _Project manager_

_**Project manager**_ is a management tool that allows company users to create projects and tasks, assign tasks to projects and users, and track the progress of the tasks.

### Tech specs 

The auth manager microservice is a _nodejs_ with _TypeScript_ application that uses _Mysql_ for data storage and _TypeORM_ for database management and _Apache Kafka_ as message broker.

## Features 

- [x] User creation
  - [x] Jwt token generation
  - [x] User password encryption
  
- [x] User login
  - [x] User password validation

- [x] Events and events listeners to decouple services code from other consequent logic 
- [x] User data propagation to other microservices through kafka
- [x] Feature and unit tests 

## Next steps 

- [ ] User data update
- [ ] User data deletion
- [ ] User updated data propagation to other microservices through kafka
- [ ] User password change 
- [ ] User password recovery
- [ ] User password recovery email sending
- [ ] User permissions management
- [ ] Production environment setup
- [ ] DI container (TypeDI or others)
- [ ] Better Docker containerization
- [ ] Swagger for API documentation
- [ ] Mono repository setup
- [ ] CI/CD pipeline setup
- [ ] Better logging

## Check the other microservices

- Project manager (https://github.com/schirliuradu/Project-manager-node)