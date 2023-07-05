# Contact-Manager MYSQL Based API

## Table of Contents
* Description
* Purpose
* Lessons
* Installation & Setup
* Project Usage

## Project Description
This project is a Contact-Manager Web API that allows users to register and login in order to create, update, and delete their phone contacts. It is built using MYSQL as the database.

## Purpose
- To interact with a database other than MongoDB using Javascript
  
- To improve my knowledge of SQL

- To interact with MYSQL using either Raw SQL queries or the Sequelize ORM

## What I learned from this project:
- How to better handle errors without using the asynchandler npm package

- What occurs under the hood when handling errors in the request-response cycle

- How to use Sequelize when querying the database

- How to write Raw SQL

## How to Install & Run the Project
1. Clone the repository:
   - run in your terminal
   ```
     git clone https://github.com/RICHYDOS/Contact-Manager
   ```
3. Change into the repository root directory
   ```
     cd Contact-Manager
   ```
5. Install Dependencies
   ```
      npm install
   ```
7. Set up MYSQL:
  - Install MYSQL on your system
  - Create a database/Schema using your terminal or MYSQL Workbench
  - Set up the `.env` file in the root directory as seen in the `.env.example` file
5. Start the server:
  ```
      npm run dev
  ```
  - Unless it's your first time running the server, you should see something similar to this:
    ```
      > contact-manager-mysql@1.0.0 dev
      > nodemon index.js
      
      [nodemon] 2.0.22
      [nodemon] to restart at any time, enter `rs`
      [nodemon] watching path(s): *.*
      [nodemon] watching extensions: js,mjs,json
      [nodemon] starting `node index.js`
      Executing (default): SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_NAME = 'users' AND TABLE_SCHEMA = 'DatabaseName'
      Executing (default): SHOW INDEX FROM `users`
      User Table, Check...
      Executing (default): SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_NAME = 'contacts' AND TABLE_SCHEMA = 'DatabaseName'
      Executing (default): SHOW INDEX FROM `contacts`
      Contact Table, Check...
      Server running on Port <PortNumber>
    ```
  - If it's your first time running the server, there would be a lot more MYSQL statements so don't be scared 🥲


## How to Use the Project

- Currently, the project uses Sequelize to interact with MYSQL, but I've also included examples of raw SQL queries in comments for those who prefer that.

### USERS
#### Register a new user (that's you 😁):
- Send a `POST` request to `/api/users/register` as in `https://cm-mongo.onrender.com/api/users/register` with the following JSON body:
```
 {
   "username": "your-username",
   "email": "your-email",
   "password": "your-password"
 }
 ```
 - The response will include your user details

#### Login:
- Send a `POST` request to `/api/users/login` with the following JSON body:
 ```
 {
   "email": "your-email",
   "password": "your-password"
 }
 ```
 - The response will include an authentication token that needs to be included in subsequent requests(the request or HTTP headers).

#### View User:
  You must have logged in before...
- Under HTTP Headers:
  - Add: {"auth-token": yourAuthenticationToken}
- Send a `GET` request with the respective id (in the url) to `/api/users/:id`
 - The response will include your user details

### CONTACTS
- All requests must have the authentication token included in the HTTP headers under the key 'auth-token'
#### Create a new contact:
- Send a `POST` request to `/api/contacts` with the following JSON body:
 ```
 {
   "name": "John Doe",
   "phone": "1234567890",
   "email": "ohndoe@example.com"
 }
```
 - The response will include the contact's details

#### Update a contact:
- Send a `PUT` request to `/api/contacts/:id` with the contact's ID in the URL path and provide the updated contact details in the JSON body.

#### Delete a contact:
- Send a `DELETE` request to `/api/contacts/:id` with the contact's ID in the URL path.

#### View a contact:
- Send a `GET` request to `/api/contacts/:id` with the contact's ID in the URL path.

#### View all contacts:
- Send a `GET` request to `/api/contacts/` with the contact's ID in the URL path.
