import Joi from 'joi';

export const singleBookSchema = Joi.object({
    id: Joi.number().required(),
    title: Joi.string().required(),
    author: Joi.string().required(),
    publishedDate: Joi.string().isoDate().required()
});

export const bookArraySchema = Joi.array().items(singleBookSchema);

export const errorSchema = Joi.object({
    error: Joi.string().optional(),
    message: Joi.string().optional(),
}).or('error', 'message');
