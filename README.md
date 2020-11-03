# Adada - Server

## Stack
- Express
- Puppeteer
- Eslint/prettier
- Swagger/OAS3
- Typescript
- Luxon

## Current Sprint
### Sprint 2
- [x] get day races
- [x] extract data from races
- [ ] get multiple filters from request
- [ ] filter races
- [ ] test
- [x] write contributing
- [ ] Unifying terminologies
- [x] Setup DB
- [ ] Setup online DB
- [x] Add models for races
- [x] Setup agenda (crontab like) 
- [x] Add races update to agenda (care geographic zones)
- [x] Add auto wakeup to agenda


## Backlog

## Notes
- Use GraphQL ?
- Use persistent storage ?
- Add jsdoc for function code description (typescript improvement)
- setup CI ?
- what about webpack ? 
- what about docker ? 

## Issues
  - [ ] Prettier doesn't format non elsinted files : json, md, ...
  - [ ] Typescript path aliases with module-alias does not work after build

## Terminologies
- *Meeting*: ok
- *Race*: ok
- *Runners*: to be confirmed
- *Allocation*: to be confirmed
- *Discipline*: to be confirmed

## Ended sprints

### Sprint 0
- Setup project 
    - [x] setup eslint and prettier
    - [x] setup typescript compiler
    - [x] setup package.json
    - [x] setup dev env : nodemon and ts-node
- Setup documentation 
    - [x] create oas3.json skeleton
    - [x] add route for doc
- Setup unit tests environment
    - [x] add and setup jest
    - [x] setup watch 
    - [x] add configuration to package.json 
    - [x] setup 1 test
- Deploy
  - [x] : heroku
    - [x] without puppeteer 
    - [x] issue with puppeteer
- Issues
  - [x] Clean github project (dist, yarn errors, ...)

### Sprint 1
- [x] Add routes definition in api doc
  - [x] races
  - [x] ... with filters : date, participants count, discipline