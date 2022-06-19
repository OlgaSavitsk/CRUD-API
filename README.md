# CRUD-API

##Setup

- Clone this repo: $ git clone https://github.com/OlgaSavitsk/CRUD-API.git
- Go to downloaded folder: $ cd CRUD-API
- Go to branch: $ git checkout feature/crud-api
- Install dependencies: $ npm install
- development mode: $ npm run start:dev
- production mode: $ npm run start:prod

##Usage

- Get Users
  Returns json data about users.

    - URL
    /users

    - Method
    GET

- Get User
  Returns json data about specified user.
    - URL
    /users/:id

    - Method
    GET

- Create User
  Creates a new user
    - URL
    /users

    - Method
    POST

- Delete User
  Delete specified user
    - URL
    /users/:id

    - Method
    DELETE

- Update User
  Updates attributes of specified user
    - URL
    /users/:id

    - Method
    PUT
