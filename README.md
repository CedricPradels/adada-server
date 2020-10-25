# Adada - Server

## Stack
- Express
- Puppeteer
- Eslint/prettier
- Swagger/OAS3
- Typescript
- Luxon

## Current Sprint
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
  - [ ] Prettier doesn't format non elsinted files : json, md, ...
  - [ ] Typescript path aliases with module-alias does not work after build
  - [x] Clean github project (dist, yarn errors, ...)

## Backlog

## Notes
- Use GraphQL ?
- Use persistent storage ?
- Add jsdoc for function code description (typescript improvement)
- setup CI ?
- what about webpack ? 
- what about docker ? 