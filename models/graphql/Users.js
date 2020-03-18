const {
    GraphQLID,
    GraphQLString,
    GraphQLObjectType,
} = require("graphql");
const UserType = new GraphQLObjectType({
    name: 'Users',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        email: {
            type: GraphQLString
        },
        password: {
            type: GraphQLString
        },
        creation_date: {
            type: GraphQLString
        }
    })
});

module.exports = UserType;