const express = require('express');
const ExpressGraphQL  = require('express-graphql');
const mongosee = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
require('dotenv/config');
const UserSchema = require('./models/graphql/Users');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//GraphQL
app.use('/graphql', ExpressGraphQL({
    schema: UserSchema,
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

// test

app.listen(process.env.PORT);
console.log('Server is listening on port ' + process.env.PORT);