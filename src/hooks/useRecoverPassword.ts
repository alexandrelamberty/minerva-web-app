import { useState, useEffect } from "react";

/**
 *
 * @param url
 * @returns
 */
const userRecoverPassword = () => {
  const url = "";
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [url]);

  return [data];
};

export default userRecoverPassword;
