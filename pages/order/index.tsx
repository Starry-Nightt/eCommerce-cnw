import { GetServerSideProps } from "next";
import Head from "next/head";

const Index = () => {
  return (
    <>
      <Head>
        <title>Đơn hàng của bạn</title>
      </Head>
      <div>Order page</div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {},
  };
};

export default Index;
