import { Author } from "@/models/author.model";
import { Category } from "@/models/category.model";
import { Publisher } from "@/models/publisher.model";
import { Button, Card, Checkbox, Divider, Space } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import React, { Dispatch, SetStateAction } from "react";

interface Props {
  categories: Category[];
  authors: Author[];
  publishers: Publisher[];
  selectedCategories: Category[];
  setSelectedCategories: Dispatch<SetStateAction<Category[]>>;
  selectedPublishers: Publisher[];
  setSelectedPublishers: Dispatch<SetStateAction<Publisher[]>>;
  selectedAuthors: Author[];
  setSelectedAuthors: Dispatch<SetStateAction<Author[]>>;
}

function BookFilter({
  categories,
  authors,
  publishers,
  selectedAuthors,
  setSelectedAuthors,
  selectedCategories,
  setSelectedCategories,
  selectedPublishers,
  setSelectedPublishers,
}: Props) {
  const onCheckAuthor = (e: CheckboxChangeEvent, author: Author) => {
    if (e.target.checked) setSelectedAuthors((prev) => [...prev, author]);
    else
      setSelectedAuthors((prev) =>
        prev.filter((item) => item.id !== author.id)
      );
  };

  const onCheckCategory = (e: CheckboxChangeEvent, category: Category) => {
    if (e.target.checked) setSelectedCategories((prev) => [...prev, category]);
    else
      setSelectedCategories((prev) =>
        prev.filter((item) => item.id !== category.id)
      );
  };

  const onCheckPublisher = (e: CheckboxChangeEvent, publisher: Publisher) => {
    if (e.target.checked) setSelectedPublishers((prev) => [...prev, publisher]);
    else
      setSelectedPublishers((prev) =>
        prev.filter((item) => item.id !== publisher.id)
      );
  };

  const onResetFilter = () => {
    setSelectedAuthors([]);
    setSelectedPublishers([]);
    setSelectedCategories([]);
  };

  const canReset =
    selectedAuthors.length > 0 ||
    selectedCategories.length > 0 ||
    selectedPublishers.length > 0;

  return (
    <Card title="Bộ lọc" bordered={true}>
      <Space direction="vertical" size="middle" className="w-full">
        {categories && !!categories.length && (
          <>
            <Divider orientation="left">Danh mục</Divider>
            {categories.map((item) => (
              <Checkbox
                key={item.id}
                value={item.id}
                className="select-none"
                checked={selectedCategories
                  .map((category) => category.id)
                  .includes(item.id)}
                onChange={(e) => onCheckCategory(e, item)}
              >
                {item.name}
              </Checkbox>
            ))}
          </>
        )}

        {authors && !!authors.length && (
          <>
            <Divider orientation="left">Tác giả</Divider>
            {authors.map((item) => (
              <Checkbox
                key={item.id}
                value={item.id}
                className="select-none"
                checked={selectedAuthors
                  .map((author) => author.id)
                  .includes(item.id)}
                onChange={(e) => onCheckAuthor(e, item)}
              >
                {item.name}
              </Checkbox>
            ))}
          </>
        )}

        {publishers && !!publishers.length && (
          <>
            <Divider orientation="left">Nhà sản xuất</Divider>
            {publishers.map((item) => (
              <Checkbox
                key={item.id}
                value={item.id}
                className="select-none"
                checked={selectedPublishers
                  .map((publisher) => publisher.id)
                  .includes(item.id)}
                onChange={(e) => onCheckPublisher(e, item)}
              >
                {item.name}
              </Checkbox>
            ))}
          </>
        )}
        <Button
          type="primary"
          block
          className="mt-4"
          size="large"
          disabled={!canReset}
          onClick={onResetFilter}
        >
          Xóa bộ lọc
        </Button>
      </Space>
    </Card>
  );
}

export default BookFilter;
