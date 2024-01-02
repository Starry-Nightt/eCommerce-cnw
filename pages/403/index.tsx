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
        status="403"
        title="403"
        subTitle="Bạn không có quyền truy cập trang này."
        extra={
          <Button onClick={() => router.push(ROUTE_PATH.BOOK)} type="primary">
            Quay về
          </Button>
        }
      />
    </>
  );
};

export default Index;
