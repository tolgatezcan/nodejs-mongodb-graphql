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