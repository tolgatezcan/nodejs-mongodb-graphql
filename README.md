# GraphQL API With Node.js And MongoDB

I started this project to provide a simple level of ease of use. I build a completed and fully working GraphQL API using the Express framework for Node with MongoDB as database, without being too specific.

## Table of Contents
- [Features](#features)
- [Getting Started](#getting-started)
- [Packages](#packages)
- [Query & Mutations](#query-mutation)

## Features
- **Local Authentication** using Email and Password
- MVC Project Structure
- GraphQL Mutations, Queries, Resolvers
- **Account Management**
     - Register
     - Login
     - Update profile
     - Profile Details
- JSON Web Token (JWT) Sign in

## Getting Started

- Clone this repo or download it's release archive and extract it somewhere
- You may delete `.git` folder if you get this code via `git clone`
- Run `npm install`
- Configure your `.env` file for authenticating via database
- Create a database named `graphql`

## Packages
| Package                         | Description                                                           |
| ------------------------------- | --------------------------------------------------------------------- |
| @hapi/joi                       | Data validator for JavaScript.                                        |
| bcryptjs                        | Library for hashing and salting user passwords.                       |
| body-parser                     | Express 4 middleware.                                                 |
| cors                            | Express 4 middleware.                                                 |
| crypto                          | JavaScript library of crypto standards.                               |
| dotenv                          | Loads environment variables from .env file.                           |
| express                         | Node.js web framework.                                                |
| express-graphql                 | Running an Express GraphQL Server.                                    |
| graphql                         | The JavaScript reference implementation for GraphQL.                  |
| jsonwebtoken                    | An implementation of JSON Web Tokens.                                 |
| mongoose                        | MongoDB ODM.                                                          |

## Query & Mutation

### Login
![](https://raw.githubusercontent.com/tolgatezcan/nodejs-mongodb-graphql/master/public/login.png)
```
{
    login(email: "aaa@aaa.com", password:"123456") {
        _id,
        email,
        id_user
    }
}
```

### Profile Details
![](https://raw.githubusercontent.com/tolgatezcan/nodejs-mongodb-graphql/master/public/detail.png)
```
{
    person(id: "5e728488371d0928c04f0291") {
        _id,
        email,
        id_user
    }
}
```

### Register
![](https://raw.githubusercontent.com/tolgatezcan/nodejs-mongodb-graphql/master/public/register.png)
```
mutation Register($email: String!, $password: String!) {
    register(email: $email, password: $password) {
        _id,
        email,
        id_user
    }
}
```

```
{
  "email": "aaa@aaa.com",
  "password": "123456"
}
```

### Update
![](https://raw.githubusercontent.com/tolgatezcan/nodejs-mongodb-graphql/master/public/update.png)
```
mutation Update($id: String!, $email: String!, $newpassword: String!, $renewpassword: String!) {
    update(id: $id, email: $email, newpassword: $newpassword, renewpassword: $renewpassword) {
        _id,
        email,
        id_user
    }
}
```

```
{
	"id": "5e72bb248fc1f41720799164",
	"email": "aaa@aaa.com",
	"newpassword": "1234567",
	"renewpassword": "1234567"
}
```