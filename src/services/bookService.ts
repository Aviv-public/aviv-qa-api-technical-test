import { Book, UpdateBookDTO } from '../models/book';

class BookService {
    private books: Book[] = [];
    private currentId: number = 1;

    public createBook(title: string, author: string, publishedDate: string): Book {
        const newBook: Book = {
            id: this.currentId++,
            title,
            author,
            publishedDate
        };
        this.books.push(newBook);
        console.log('Created book:', newBook); // Debug log
        return newBook;
    }

    public getBooks(): Book[] {
        console.log('Current books:', this.books); // Debug log
        return this.books;
    }

    public updateBook(id: number, title: string, author: string, publishedDate: string, bookData: UpdateBookDTO): Book | null {
        const index = this.books.findIndex(book => book.id === id);
        if (index === -1) return null;
        
        this.books[index] = {
            ...this.books[index],
            ...bookData
        };
        
        return this.books[index];
    }

    public patchBook(id: number, updates: Partial<Book>): Book | null {
        const index = this.books.findIndex(book => book.id === id);
        if (index === -1) return null;

        // Only update the fields that are provided
        const updatedBook = {
            ...this.books[index],  // Keep existing book data
            ...updates            // Override only the provided fields
        };

        // Ensure id remains unchanged
        updatedBook.id = this.books[index].id;
        
        this.books[index] = updatedBook;
        return updatedBook;
    }

    public getBookById(id: number): Book | null {
        console.log('Getting book with id:', id);
        const book = this.books.find(b => b.id === id);
        console.log('Found book:', book);
        return book || null;
    }

    public deleteBook(id: number): Book | null {
        const bookIndex = this.books.findIndex(book => book.id === id);
        if (bookIndex === -1) return null;

        const deletedBook = this.books.splice(bookIndex, 1);
        return deletedBook[0];
    }
}

export default BookService;