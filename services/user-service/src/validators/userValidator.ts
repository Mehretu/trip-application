import Joi from 'joi'

export const registerSchema = Joi.object({
    name: Joi.string().min(1).required().messages({
        'string.empty': 'Name is required',
        'any.required': 'Name is required',
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Email must be a valid email',
        'any.required': 'Email is required',
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Password must be at least 6 characters long',
        'any.required': 'Password is required',
    }),
    phone_number: Joi.string().optional().pattern(/^[0-9]{10}$/, 'numbers').messages({
        'string.pattern.name': 'Phone number must be 10 digits'
    }),
})
export const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Email must be a valid email',
        'any.required': 'Email is required',
    }),
    password: Joi.string().min(6).required().messages({
        'any.required': 'Password is required',
    }),
});