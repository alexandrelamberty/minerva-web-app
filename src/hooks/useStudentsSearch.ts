import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { StudentSearchSuccess } from "../models/student.model";
import { RootState } from "../store/store";

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Hook that use Axios GET to search for students.
 * @param terms The search terms, email, first name, last name.
 * @returns
 */
const useStudentSearch = (terms: string) => {
  const [data, setData] = useState<StudentSearchSuccess | null>();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Retrieve logged in user token for the request headers
  const { loggedInUser } = useSelector((state: RootState) => state.auth);
  // const { API_URL } = useSelector((state: RootState) => state.app);
  const headers = { Authorization: loggedInUser?.token };
  const dataUrl = API_URL + "/students";

  useEffect(() => {
    let isMounted = true;
    const source = axios.CancelToken.source();

    const urlParams = new URLSearchParams();
    urlParams.set("terms", terms);

    const fetchData = async (url: string) => {
      setLoading(true);
      try {
        const response = await axios.get(url, {
          cancelToken: source.token,
          headers: headers,
          params: urlParams,
        });
        if (isMounted) {
          setData(response.data);
        }
      } catch (error: any) {
        if (isMounted) {
          setError(error.message);
          setData(null);
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
  }, [terms]);

  return { data, error, loading };
};

export default useStudentSearch;
