import { faker } from '@faker-js/faker';

export const generateBookData = () => ({
  title: faker.lorem.words(3),
  author: faker.person.fullName(), 
  publishedYear: faker.date.past({ years: 10 }).getFullYear(),
});

export const generateUpdatedBookData = () => ({
  title: faker.lorem.words(4),
  author: faker.person.fullName(),
  publishedYear: faker.date.past({ years: 5 }).getFullYear(),
});
