import BookForm from "@/components/book-form";
import LayoutAdmin from "@/layouts/admin/layout-admin";
import { DoubleLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import router from "next/router";


const Index = () => {
  return (
    <>
      <Button
        type="link"
        className="mb-2"
        size="large"
        icon={<DoubleLeftOutlined />}
        onClick={() => router.back()}
      >
        Quay về
      </Button>
      <BookForm />
    </>
  );
};


Index.getLayout = function PageLayout(page) {
  return <LayoutAdmin>{page}</LayoutAdmin>;
};

export default Index;
