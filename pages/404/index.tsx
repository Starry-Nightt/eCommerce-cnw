import { ROUTE_PATH } from "@/constants/route-path.const";
import { Result, Button } from "antd";
import Head from "next/head";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Error</title>
      </Head>
      <Result
        status="404"
        title="404"
        subTitle="Trang không tồn tại."
        extra={
          <Button type="primary" onClick={() => router.push(ROUTE_PATH.BOOK)}>
            Quay về
          </Button>
        }
      />
    </>
  );
};

export default Index;
