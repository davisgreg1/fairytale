import { useState, useEffect } from "react";

const useFetchMessage = (url: string) => {
  const [message, setMessage] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response: any = await fetch(url);
      const data = await response.json();

      setMessage(data.message);
      setStatus(response.status);
      setLoading(false);
    };

    fetchData();
  }, [url]);

  return { message, status, loading };
};

export default useFetchMessage;
