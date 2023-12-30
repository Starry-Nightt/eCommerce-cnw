import { BookDetailInfo } from "@/models/book.model";
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Space,
  Typography,
  Select,
  DatePicker,
  InputNumber,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import BookUpload from "./book-upload";
import FormRules from "@/utils/form-rules";
import useFetch from "@/hooks/use-fetch";
import BookService from "@/services/book.service";
import AuthorService from "@/services/author.service";
import PublisherService from "@/services/publisher.service";
import { Category } from "@/models/category.model";
import { Author } from "@/models/author.model";
import { Publisher } from "@/models/publisher.model";
import moment from "moment";
const { Option } = Select;

interface Props {
  isEdit?: boolean;
  data?: BookDetailInfo;
}

function BookForm({ isEdit, data }: Props) {
  const [form] = Form.useForm();
  const [url, setUrl] = useState<string>();
  const [selectedDate, setSelectedDate] = useState(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [publishers, setPublishers] = useState<Publisher[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      const _categories = await BookService.getAllCategories();
      setCategories(_categories);
    };
    const getAuthors = async () => {
      const _authors = await AuthorService.getAllAuthors();
      setAuthors(_authors);
    };

    const getPublishers = async () => {
      const _publishers = await PublisherService.getAllPublishers();
      setPublishers(_publishers);
    };

    getCategories();
    getAuthors();
    // getPublishers();
  }, []);

  useEffect(() => {
    if (isEdit && data) {
      const input = {
        id_author: authors.find((it) => it.name == data.author)?._id,
        id_category: categories.find((it) => it.name == data.category)?._id,
        id_nsx: "1",
        name: data.name,
        price: data.price,
        describe: data.describe,
        release_date: moment(data.release_date)
      };
      form.setFieldsValue(input);
      setUrl(data.img);
      setSelectedDate(moment(data.release_date));
    }
  }, []);

  const onFinish = (values: any) => {
    if (!isEdit) {
      const detail = { ...values, urlImage: url, release_date: selectedDate };
      BookService.createBook(detail)
        .then(() => {
          message.success("Thêm mới sách thành công");
        })
        .catch((e) => {
          message.error("Đã có lỗi xảy ra. Xin vui lòng thử lại");
        });
    } else {
      const detail = { ...values, urlImage: url };
      BookService.updateBook(data.id, detail)
        .then(() => {
          message.success("Cập nhật sách thành công");
        })
        .catch((e) => {
          message.error("Đã có lỗi xảy ra. Xin vui lòng thử lại");
        });
    }
  };

  const handleDateChange = (date, dateString) => {
    setSelectedDate(dateString);
  };

  return (
    <div className="p-3">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item rules={FormRules.required} name="name" label="Tên sách">
          <Input placeholder="Nhập tên sách" />
        </Form.Item>
        <Row gutter={{ xs: 6, sm: 14, md: 20, lg: 28 }}>
          <Col span={8}>
            <Form.Item
              rules={FormRules.required}
              name="id_category"
              label="Thể loại"
            >
              <Select placeholder="Chọn thể loại">
                {categories.map((it) => (
                  <Option key={it?._id} value={it?._id}>
                    {it.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              rules={FormRules.required}
              name="id_nsx"
              label="Nhà sản xuất"
            >
              <Select placeholder="Chọn nhà sản xuất" disabled={isEdit}>
                <Option value="Zhejiang">Zhejiang</Option>
                <Option value="Jiangsu">Jiangsu</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              rules={FormRules.required}
              name="id_author"
              label="Tác giả"
            >
              <Select placeholder="Chọn tác giả" disabled={isEdit}>
                {authors.map((it) => (
                  <Option key={it?._id} value={it?._id}>
                    {it.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              rules={FormRules.required}
              name="price"
              label="Giá tiền (VND)"
            >
              <InputNumber min={0} className="w-full" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              rules={FormRules.required}
              name="release_date"
              label="Ngày sản xuất"
            >
              <DatePicker onChange={handleDateChange} disabled={isEdit} format="YYYY-MM-DD" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item rules={FormRules.required} name="describe" label="Mô tả">
          <Input.TextArea rows={4} />
        </Form.Item>

        <div className="form-upload my-4">
          <p className="font-semibold mb-4">Chọn hình ảnh sách</p>
          <BookUpload imageUrl={url} setImageUrl={setUrl} />
        </div>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="w-24"
          >
            {isEdit ? "Cập nhật" : "Tạo"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default BookForm;
