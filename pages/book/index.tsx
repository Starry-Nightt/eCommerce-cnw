import BookList from "@/components/book-list";
import BookFilter from "@/components/book-filter";
import { Author } from "@/models/author.model";
import { Book } from "@/models/book.model";
import { Category } from "@/models/category.model";
import { Publisher } from "@/models/publisher.model";
import AuthorService from "@/services/author.service";
import BookService from "@/services/book.service";
import PublisherService from "@/services/publisher.service";
import { Row, Col, Button, App, Modal } from "antd";
import { GetServerSideProps, GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SearchBox from "@/components/search-box";

interface Props {
  books: { data: Book[] };
  categories: Category[];
  authors: Author[];
  publishers: Publisher[];
  queryStringPage: string;
}

const Index = ({
  books,
  categories,
  authors,
  publishers,
  queryStringPage,
}: Props) => {
  const [data, setData] = useState(books.data);
  const [selectedAuthor, setSelectedAuthor] = useState<Author[]>([]);
  const [selectedPublishers, setSelectedPublishers] = useState<Publisher[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [q, setQ] = useState("");
  const router = useRouter();
  const [query, setQuery] = useState(queryStringPage);
  const [openFilter, setOpenFilter] = useState(false);
  useEffect(() => {
    const _selectedAuthor = [];
    const _selectedPublishers = [];
    const _selectedCategories = [];
    authors.forEach((author) => {
      if (queryStringPage.includes(author.slug))
        _selectedAuthor.push(authors.find((item) => item.slug === author.slug));
    });
    categories.forEach((category) => {
      if (queryStringPage.includes(category.slug))
        _selectedCategories.push(
          categories.find((item) => item.slug === category.slug)
        );
    });
    publishers.forEach((publisher) => {
      if (queryStringPage.includes(publisher.slug))
        _selectedPublishers.push(
          publishers.find((item) => item.slug === publisher.slug)
        );
    });

    const _q = queryStringPage
      .split("&")
      ?.find((it) => it.startsWith("searchtext"))
      ?.slice(11);
    setQ(_q ?? "");
    setSelectedAuthor(_selectedAuthor);
    setSelectedPublishers(_selectedPublishers);
    setSelectedCategories(_selectedCategories);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    selectedAuthor.forEach((item) => params.append("author", item.slug));
    selectedCategories.forEach((item) => params.append("category", item.slug));
    selectedPublishers.forEach((item) => params.append("nsx", item.slug));
    if (q.length) {
      params.append("searchtext", q);
    }
    const queryString = params.toString();
    setQuery(queryString);
  }, [selectedAuthor, selectedCategories, selectedPublishers, q]);

  useEffect(() => {
    router.push(query.length ? `/book?${query}` : "book", undefined, {
      shallow: true,
    });
    fetchData(query);
  }, [query]);

  const fetchData = async (queryString: string) => {
    const data = await BookService.getAllBook(queryString);
    setData(data.data);
  };

  const onSearch = (value: string) => {
    setQ(value);
  };

  return (
    <>
      <Head>
        <title>Tìm kiếm sách</title>
      </Head>
      <div className="ml-auto w-full md:w-64">
        <SearchBox
          className=" mb-6"
          onSearchKey={onSearch}
        />
      </div>
      <Row
        gutter={[
          { xs: 6, sm: 14, md: 20, lg: 28 },
          { xs: 6, sm: 14, md: 20, lg: 28 },
        ]}
      >
        <Col xs={24} sm={24} md={0} lg={0}>
          <div className="flex justify-end mb-2">
            <Button
              type="primary"
              size="large"
              onClick={() => setOpenFilter(true)}
            >
              Bộ lọc
            </Button>
          </div>
        </Col>
        <Col xs={0} sm={0} md={8} lg={6}>
          <BookFilter
            categories={categories}
            authors={authors}
            publishers={publishers}
            selectedAuthors={selectedAuthor}
            selectedCategories={selectedCategories}
            selectedPublishers={selectedPublishers}
            setSelectedAuthors={setSelectedAuthor}
            setSelectedCategories={setSelectedCategories}
            setSelectedPublishers={setSelectedPublishers}
          />
        </Col>
        <Col xs={24} sm={24} md={16} lg={18}>
          <BookList books={data} />
        </Col>
      </Row>

      <Modal
        open={openFilter}
        onCancel={() => setOpenFilter(false)}
        footer={null}
      >
        <BookFilter
          categories={categories}
          authors={authors}
          publishers={publishers}
          selectedAuthors={selectedAuthor}
          selectedCategories={selectedCategories}
          selectedPublishers={selectedPublishers}
          setSelectedAuthors={setSelectedAuthor}
          setSelectedCategories={setSelectedCategories}
          setSelectedPublishers={setSelectedPublishers}
        />
      </Modal>
    </>
  );
};


export const getStaticProps: GetStaticProps = async (ctx) => {
  const params = new URLSearchParams();
  const queryString = params.toString();
  const books = await BookService.getAllBook(queryString);
  const categories = (await BookService.getAllCategories()) || [];
  const categoriesData = categories?.map((it) => ({
    ...it,
    id: it?._id,
    slug: it.name,
  }));
  const authors = (await AuthorService.getAllAuthors()) || [];
  const authorData = authors?.map((it) => ({
    ...it,
    id: it?._id,
    slug: it.name,
  }));
  const publishers = (await PublisherService.getAllPublishers()) || [];
  const publisherData = publishers?.map((it) => ({
    ...it,
    id: it?._id,
    slug: it.name,
  }));
  return {
    props: {
      books: books,
      categories: categoriesData,
      authors: authorData,
      publishers: publisherData,
      queryStringPage: queryString,
    },
    revalidate: 200
  };
}

export default Index;
