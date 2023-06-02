import { useContext, useState } from "react";
import { boolean } from "yup";

export default function useSuggestCategory() {
  const [loading, setLoading] = useContext<boolean>(false);
  const [errors, setErrors] = useContext("");
  const [suggestion, setSuggestion] = useState("");

  suggest: () => {
    //
  };
  //
  return () => {
    setToken();
    setUser();
  };
}
