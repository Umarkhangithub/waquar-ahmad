import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitContactForm, clearMessages } from "../../features/contact/contactSlice";

import InputField from "../../components/Ui/Input/InputField";
import Loader from "../../components/Ui/Input/Loader/Loader";
import Container from "../../components/Ui/container/Container";

// Utility function to validate form
const validateForm = (formData) => {
  const errors = {};
  if (!formData.firstName.trim()) errors.firstName = "First name is required.";
  if (!formData.lastName.trim()) errors.lastName = "Last name is required.";
  if (!formData.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
    errors.email = "Invalid email format.";
  }
  if (!formData.phoneNumber.trim()) {
    errors.phoneNumber = "Phone number is required.";
  } else if (!/^\d{10}$/.test(formData.phoneNumber.replace(/[-()\s]/g, ""))) {
    errors.phoneNumber = "Phone number must be 10 digits.";
  }
  if (!formData.message.trim()) {
    errors.message = "Message is required.";
  } else if (formData.message.length < 10) {
    errors.message = "Message must be at least 10 characters.";
  }
  return errors;
};

const Contact = () => {
  const dispatch = useDispatch();
  const { isLoading, successMessage, errorMessage } = useSelector((state) => state.contact);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setErrors({});
      dispatch(clearMessages()); // Clear any previous messages

      const validationErrors = validateForm(formData);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors); // Set validation errors
        return;
      }

      // Dispatch the form submission
      dispatch(submitContactForm(formData));
    },
    [dispatch, formData]
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(clearMessages()); // Clear messages after 3 seconds
    }, 3000);

    return () => clearTimeout(timeout); // Cleanup timeout on unmount
  }, [successMessage, errorMessage, dispatch]);

  return (
    <Container>
      <div className="grid min-h-[80vh] place-items-center">
        <div className="w-full max-w-3xl mx-auto backdrop-blur-sm border p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-orange-500 text-center mb-6">
            Contact <span className="text-orange-500">Us</span>
          </h1>

          {(successMessage || errorMessage) && (
            <p
              className={`text-center text-sm mb-4 ${
                successMessage ? "text-green-500" : "text-red-500"
              }`}
            >
              {successMessage || errorMessage}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 lg:grid-cols-2 sm:grid-cols-1">
              <InputField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                error={errors.firstName}
              />
              <InputField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                error={errors.lastName}
              />
            </div>

            <InputField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />

            <InputField
              label="Phone Number"
              name="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={handleChange}
              error={errors.phoneNumber}
            />

            <InputField
              label="Message"
              name="message"
              type="textarea"
              value={formData.message}
              onChange={handleChange}
              error={errors.message}
            />

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 px-4 bg-orange-500 text-white font-medium rounded hover:bg-orange-600 transition flex items-center justify-center ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <>
                  <Loader className="mr-2" />
                  Sending...
                </>
              ) : (
                "Contact"
              )}
            </button>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default Contact;
