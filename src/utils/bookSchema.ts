import Joi from 'joi';

export const bookSchema = Joi.object({
  id: Joi.number().integer().required(),
  title: Joi.string().min(1).required(),
  author: Joi.string().required(),
  publishedDate: Joi.string().isoDate().required(),
});

export function validateBookSchema(bookData: any) {
  const { error } = bookSchema.validate(bookData);
  expect(error).toBeUndefined();
}