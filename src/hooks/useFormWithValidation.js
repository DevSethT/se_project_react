import { useCallback, useState } from "react";

export default function useFormWithValidation(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const validateForm = useCallback((formValues) => {
    const newErrors = {};

    // Validate name
    if (!formValues.name || formValues.name.trim() === "") {
      newErrors.name = "Name is required";
    }

    // Validate imageUrl
    if (!formValues.imageUrl || formValues.imageUrl.trim() === "") {
      newErrors.imageUrl = "Image URL is required";
    } else {
      // Basic URL validation
      try {
        new URL(formValues.imageUrl);
      } catch {
        newErrors.imageUrl = "Please enter a valid URL";
      }
    }

    // Validate weather
    if (!formValues.weather || formValues.weather.trim() === "") {
      newErrors.weather = "Please select a weather type";
    }

    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
    return Object.keys(newErrors).length === 0;
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => {
      const updatedValues = { ...prev, [name]: value };
      validateForm(updatedValues);
      return updatedValues;
    });
  };

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setIsValid(false);
  }, [initialValues]);

  return { values, handleChange, resetForm, errors, isValid, validateForm };
}
