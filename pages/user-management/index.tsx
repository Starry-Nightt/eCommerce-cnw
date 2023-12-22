import LayoutAdmin from "@/layouts/admin/layout-admin";
import { GetServerSideProps } from "next";

const Index = () => {
  return <div>User management</div>;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {},
  };
};

Index.getLayout = function PageLayout(page) {
    return <LayoutAdmin>{page}</LayoutAdmin>;
  };

export default Index;
