import { useCallback, useState } from "react";

export default function useFormWithValidation(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const validateForm = useCallback((formValues) => {
    const newErrors = {};

    // name
    if ("name" in formValues) {
      if (!formValues.name || formValues.name.trim() === "") {
        newErrors.name = "Name is required";
      } else if (formValues.name.length < 2) {
        newErrors.name = "Name must be at least 2 characters";
      } else if (formValues.name.length > 30) {
        newErrors.name = "Name must be 30 characters or less";
      }
    }

    // imageUrl (AddItemModal)
    if ("imageUrl" in formValues) {
      if (!formValues.imageUrl || formValues.imageUrl.trim() === "") {
        newErrors.imageUrl = "Image URL is required";
      } else {
        try {
          new URL(formValues.imageUrl);
        } catch {
          newErrors.imageUrl = "Please enter a valid URL";
        }
      }
    }

    // weather (AddItemModal)
    if ("weather" in formValues) {
      if (!formValues.weather || formValues.weather.trim() === "") {
        newErrors.weather = "Please select a weather type";
      }
    }

    // email (RegisterModal)
    if ("email" in formValues) {
      if (!formValues.email || formValues.email.trim() === "") {
        newErrors.email = "Email is required";
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formValues.email)) {
          newErrors.email = "Please enter a valid email";
        }
      }
    }

    // password (RegisterModal)
    if ("password" in formValues) {
      if (!formValues.password || formValues.password.trim() === "") {
        newErrors.password = "Password is required";
      } else if (formValues.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }
    }

    // avatar (RegisterModal)
    if ("avatar" in formValues && formValues.avatar.trim() !== "") {
      try {
        new URL(formValues.avatar);
      } catch {
        newErrors.avatar = "Please enter a valid URL";
      }
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
