import Joi from 'joi';

export const healthSchema = Joi.object({
    status: Joi.string().valid('OK').required(),
    timestamp: Joi.string().isoDate().required()
});