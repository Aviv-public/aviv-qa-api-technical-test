export interface Book {
    id: number;
    title: string;
    author: string;
    publishedDate: string;
}

export interface UpdateBookDTO {
    title: string;
    author: string;
    publishedDate: string;
}
