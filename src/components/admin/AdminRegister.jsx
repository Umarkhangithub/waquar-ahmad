import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../../components/Ui/Input/InputField";
import Loader from "../Ui/Input/Loader/Loader";
import { fetchAdmins, loginAdmin } from "../../features/admin/adminSlice";

const AdminRegister = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { admins, loading, isLoggedIn } = useSelector((state) => state.admin);

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/add-project");
    }
  }, [isLoggedIn, navigate]);

  // Fetch admins on component mount
  useEffect(() => {
    if (admins.length === 0) {
      dispatch(fetchAdmins());
    }
  }, [dispatch, admins.length]);

  // Handle input changes
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  // Handle form submission
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setMessage("🔐 Validating...");
      setErrors({});

      try {
        await dispatch(loginAdmin(formData)).unwrap();
        setMessage("✅ Logged in successfully!");
        navigate("/add-project");
      } catch (error) {
        const errorMessages = error?.response?.data?.errors || {};
        setErrors(errorMessages);
        setMessage(`❌ ${error?.message || "Login failed"}`);
      } finally {
        setTimeout(() => setMessage(""), 3000);
      }
    },
    [dispatch, formData, navigate]
  );

  return (
    <div className="flex min-h-screen w-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className=" w-xs sm:w-sm md:w-md lg:w-lg xl:w-lg rounded-xl bg-black/90 p-6 shadow-xl sm:p-8">
        <h1 className="mb-6 text-center text-2xl font-bold text-orange-600 sm:text-3xl">
          Admin Register
        </h1>

        {message && (
          <p
            className={`mb-4 text-center text-sm font-medium ${
              message.startsWith("✅")
                ? "text-green-600"
                : message.startsWith("❌")
                ? "text-red-500"
                : "text-yellow-500"
            }`}
          >
            {message}
          </p>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <InputField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            error={errors.username}
         
          />
          <InputField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-orange-300 sm:text-base"
          >
            {loading ? (
              <>
                <Loader className="mr-2 h-5 w-5 animate-spin" />
                Registering...
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminRegister;
