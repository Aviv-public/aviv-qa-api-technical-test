import { faker } from '@faker-js/faker';
import moment from 'moment';
import { Book } from '../../models/book';

export type CreateBookDTO = Omit<Book, 'id'> & {
    title?: string;
    author?: string;
    publishedDate?: string;
};

export function generateBookData(): CreateBookDTO {
    return {
        title: faker.lorem.words(3),
        author: faker.person.fullName(),
        publishedDate: moment(faker.date.past()).format('YYYY-MM-DD'),
    };
}