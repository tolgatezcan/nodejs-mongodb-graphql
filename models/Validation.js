const joi = require('@hapi/joi');

const loginValidation = data => {
    const schema = joi.object({
        email: joi.string().min(6).required().email(),
        password: joi.string().min(6).max(20).required()
    });

    return schema.validate(data);
}

const registerValidation = data => {
    const schema = joi.object({
        email: joi.string().min(6).required().email(),
        password: joi.string().min(6).max(20).required()
    });

    return schema.validate(data);
}

const updateValidation = data => {
    const schema = joi.object({
        email: joi.string().min(6).required().email(),
        password: joi.string().min(6).max(20).required(),
        newpassword: joi.string().min(6).max(20).required().valid([Joi.ref('password')])
    });

    return schema.validate(data);
}

module.exports = {
    loginValidation: loginValidation,
    registerValidation: registerValidation,
    updateValidation: updateValidation
}