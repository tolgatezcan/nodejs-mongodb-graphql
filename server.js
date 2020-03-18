const express = require('express');
const ExpressGraphQL  = require('express-graphql');
const {
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema
} = require("graphql");
const mongosee = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
require('dotenv/config');
const UserType = require('./models/graphql/Users');
const Users = require('./models/mongodb/Users');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "Query",
        fields: {
            people: {
                type: GraphQLList(UserType),
                resolve: (root, args, context, info) => {
                    return Users.find().exec();
                }
            },
            person: {
                type: UserType,
                args: {
                    id: { type: GraphQLNonNull(GraphQLID) }
                },
                resolve: (root, args, context, info) => {
                    return Users.findById(args.id).exec();
                }
            }
        }
    }),
    mutation: new GraphQLObjectType({
        name: "Mutation",
        fields: {
            person: {
                type: UserType,
                args: {
                    email: { type: GraphQLNonNull(GraphQLString) },
                    password: { type: GraphQLNonNull(GraphQLString) },
                    creation_date: { type: GraphQLNonNull(GraphQLString) }
                },
                resolve: (root, args, context, info) => {
                    var person = new Users(args);
                    return person.save();
                }
            }
        }
    })
});

//GraphQL
app.use('/graphql', ExpressGraphQL({
    schema: schema,
    graphiql: true
}));

// 404 Not Found
app.use(function(req, res, next) {
    res.json({message: 'Invalid method'});
});

// Connect To MongoDB
mongosee.connect(process.env.DB_restful, {useNewUrlParser: true, useUnifiedTopology: true}, function (err) {
    if (err) 
        console.log(err)
    else
        console.log('Connect to MongoDB');
});

app.listen(process.env.PORT);
console.log('Server is listening on port ' + process.env.PORT);