export class Book {
  _id: string;
  release_date: string;
  describe: string;
  view_count: number;
  sales: number;
  categoryId: string;
  name: string;
  price: number;
  img: string;
  publisherId: string;
  authorId: string;
}

export class BookDetailInfo extends Book {
  category: string;
  nsx: string;
  author: string;
}
