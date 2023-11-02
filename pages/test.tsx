import EmptyData from "@/components/empty";
import useFetch from "@/hooks/use-fetch";
import useLogger from "@/hooks/use-logger";
import LayoutAdmin from "@/layouts/admin/layout-admin";
import React from "react";

function Test() {
  const { data, loading, error, refetch } = useFetch(
    "https://jsonplaceholder.typicode.com/todos"
  );

  useLogger(data);

  return (
    <>
      {loading ? <h2>Loading</h2> : error ? <EmptyData /> : <h2>Done</h2>}
      <button onClick={refetch}>Refetch</button>
    </>
  );
}

export default Test;

Test.getLayout = function PageLayout(page) {
  return <LayoutAdmin>{page}</LayoutAdmin>;
};
