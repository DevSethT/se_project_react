import { useCallback, useState } from "react";

function useForm(inputValues) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = useCallback(
    (newValues = inputValues) => {
      setValues(newValues);
    },
    [inputValues]
  );

  return { values, handleChange, resetForm };
}

export default useForm;
