export class Book {
  _id: string;
  id: string;
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

export interface BookUpdateInfo {
  name?: string;
  id_category?: string;
  id_author?: string;
  id_nsx?: string;
  price?: number;
  release_date?: string;
  describe?: string;
  urlImg?: string;
}
