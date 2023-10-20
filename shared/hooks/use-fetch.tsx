import http from "@/services/http.service";
import { useCallback, useEffect, useState } from "react";

function useFetch(url: string, params?: Record<string, any>) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();
    http
      .get(url, { signal: controller.signal, params })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
    return () => {
      controller.abort();
    };
  }, [url, params]);

  const refetch = useCallback(() => {
    setLoading(true);
    http
      .get(url)
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url, params]);

  return { data, loading, error, refetch };
}

export default useFetch;
