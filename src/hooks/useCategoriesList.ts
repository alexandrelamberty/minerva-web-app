import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Hook that use Axios GET to retrieve all categories.
 * @returns
 */
const useCategoriesAll = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Retrieve logged in user token for the request headers
  const { loggedInUser } = useSelector((state: RootState) => state.auth);
  const headers = { Authorization: loggedInUser?.token };
  const dataUrl = API_URL + "/categories";

  useEffect(() => {
    let isMounted = true;
    const source = axios.CancelToken.source();

    const fetchData = async (url: string) => {
      setLoading(true);
      try {
        const response = await axios.get(url, {
          cancelToken: source.token,
          headers: headers,
        });
        if (isMounted) {
          setData(response.data);
        }
      } catch (error: any) {
        if (isMounted) {
          setError(error.message);
          setData([]);
        }
      } finally {
        isMounted && setLoading(false);
      }
    };

    fetchData(dataUrl);

    const cleanUp = () => {
      console.log("clean up");
      isMounted = false;
      source.cancel();
    };

    return cleanUp;
  }, [dataUrl]);

  return { data, error, loading };
};

export default useCategoriesAll;
