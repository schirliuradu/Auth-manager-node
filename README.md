# Project Name

This project is a nodejs with TypeScript application that uses Mysql for data storage and TypeORM for database management.
This is part of the Project manager node microservice cluster, responsible only for jwt auth and user management. 

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
- [ ] Better Docker containerization
- [ ] Mono repository setup
- [ ] CI/CD pipeline setup
- [ ] Better logging

## Check the other microservices

- [ ] [Project manager] (https://github.com/schirliuradu/Project-manager-node)