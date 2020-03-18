const jwt = require('jsonwebtoken');
//const moment = require('moment');
const bcrypt = require('bcryptjs');
//const crypto = require('crypto');
//const fs = require('fs');
const Users = require('../models/mongodb/Users');
const {loginValidation} = require('../models/Validation');
const {registerValidation} = require('../models/Validation');
const {updateValidation} = require('../models/Validation');

exports.login = async function (root, args) {

    // Login validate
    const {error} = loginValidation(args);
    if (error) return new Error(error.details[0].message);
    else {

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
                    id: user._id, 
                    email: user.email
                }
                // JWT creating
                const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '30m' });
                Object.assign(userObject, {id_user: token});
                return userObject;
            }
        }
    }
};

exports.register = async function (root, args) {

    // Register validate
    const {error} = registerValidation(args);
    if (error) return new Error(error.details[0].message);
    else {

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(args.password, salt);
        
        //Create a new user
        const post = new Users({
            email: args.email,
            password: hashPassword
        });
    
        try {
            const user = await post.save();
            const userObject = user.toJSON();
            const payload = {
                id: user._id, 
                email: user.email
            }
            // JWT creating
            const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '30m' });
            Object.assign(userObject, {id_user: token});
            return userObject;
        }
        catch (err) {
            if(err.code == 11000) return new Error('Email already exists');
            else return new Error(err);
        }
    }
};

exports.update = async function (root, args) {

    // Update validate
    const {error} = updateValidation(args);
    if (error) return new Error(error.details[0].message);
    else {

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(args.password, salt);
        
        //Create a new user
        const post = new Users({
            email: args.email,
            password: hashPassword
        });
    
        try {
            const user = await post.save();
            const userObject = user.toJSON();
            const payload = {
                id: user._id, 
                email: user.email
            }
            // JWT creating
            const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '30m' });
            Object.assign(userObject, {id_user: token});
            return userObject;
        }
        catch (err) {
            if(err.code == 11000) return new Error('Email already exists');
            else return new Error(err);
        }
    }
};