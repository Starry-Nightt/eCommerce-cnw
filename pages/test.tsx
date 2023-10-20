import EmptyData from "@/components/empty";
import useFetch from "@/hooks/use-fetch";
import useLogger from "@/hooks/use-logger";
import React from "react";

function Test() {
  const { data, loading, error, refetch } = useFetch(
    "https://jsonplaceholder.typicode.com/todos"
  );

  useLogger(data);

  return (
    <>
      {loading ? <h2>Loading</h2> : (error ? <EmptyData/>: <h2>Done</h2>)}
      <button onClick={refetch}>Refetch</button>
    </>
  );
}

export default Test;
