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
const UserController = require('../../controller/User');

const UserType = new GraphQLObjectType({
    name: 'Users',
    fields: () => ({
        _id: {
            type: GraphQLID
        },
        email: {
            type: GraphQLString
        },
        password: {
            type: GraphQLString
        },
        id_user: {
			type: GraphQLString,
			description: 'Status of the user, whether active or disabled',
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
                resolve: (root, args, context, info) => {
                    return UserController.login(root, args);
                }
            },
            person: {
                type: UserType,
                args: {
                    id: { type: GraphQLNonNull(GraphQLID) }
                },
                resolve: async (root, args, context, info) => {
                    // Find user by id
                    const user = await Users.findById(args.id).exec();
                    const payload = {
                        id: user._id, 
                        email: user.email
                    }
                    // JWT creating
                    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '30m' });
                    Object.assign(user, {id_user: token});
                    return user;
                }
            }
        }
    }),
    mutation: new GraphQLObjectType({
        name: "Mutation",
        fields: {
            register: {
                type: UserType,
                args: {
                    email: { type: GraphQLNonNull(GraphQLString) },
                    password: { type: GraphQLNonNull(GraphQLString) },
                },
                resolve: async (root, args, context, info) => {
                    return UserController.register(root, args);
                }
            }
        }
    })
});

module.exports = UserSchema;