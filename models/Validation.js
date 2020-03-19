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
        id: joi.string().required(),
        email: joi.string().min(6).required().email(),
        newpassword: joi.string().min(6).max(20),
        renewpassword: joi.string().min(6).max(20).valid(joi.ref('newpassword'))
    });

    return schema.validate(data);
}

module.exports = {
    loginValidation: loginValidation,
    registerValidation: registerValidation,
    updateValidation: updateValidation
}