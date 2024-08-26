import { useEffect, useState } from "react";
import API from "../config";

const useFetchData = (groq_query) => {
  const [data, setData] = useState(null);

  const URL = `https://${API.PROJECT_ID}.api.sanity.io/v2024-04-09/data/query/${API.DATASET}?query=${encodeURIComponent(groq_query)}`;

  useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      .then(({ result }) => {
        setData(result[0]);
      })
      .catch((err) => console.error(err));
  }, [URL])

  return data;
} 

export default useFetchData;