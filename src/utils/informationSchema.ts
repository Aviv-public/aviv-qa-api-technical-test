import Joi from 'joi';

export const informationSchema = Joi.object({
  message: Joi.string().required(),
  endpoints: Joi.object({
    books: Joi.string().pattern(/^\/api\/[a-z]+$/).required(),
    health: Joi.string().pattern(/^\/api\/[a-z]+$/).required(),
  }).required(),
});

export function validateInformationSchema(data: any) {
  const { error } = informationSchema.validate(data);
  expect(error).toBeUndefined();
}