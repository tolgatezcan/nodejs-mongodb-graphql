const {
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema
} = require("graphql");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../mongodb/Users');

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

const UserSchema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "Query",
        fields: {
            login: {
                type: UserType,
                args: {
                    email: { type: GraphQLNonNull(GraphQLString) },
                    password: { type: GraphQLNonNull(GraphQLString) }
                },
                resolve: async (root, args, context, info) => {
                    // Email checking
                    const user = await Users.findOne({email: args.email});
                    if (!user) return new Error('Email or password is wrong.');
                    else {
                        // Validate password
                        const validPass = await bcrypt.compare(args.password, user.password);
                        if (!validPass) return new Error('Email or password is wrong');
                        else {
                            const userObject = user.toJSON();
                            const payload = {
                                id: user.id, 
                                email: user.email
                            }
                            // JWT creating
                            const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '30m' });
                            Object.assign(userObject, {token: token});
                            return userObject;
                        }
                    }
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

module.exports = UserSchema;