import React, { useEffect, useState, Suspense, lazy } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addNewProject, fetchAllProjects } from "../../features/projects/projectSlice";
import Loader from "../../components/Ui/Input/Loader/Loader";

// Lazy loading components
const InputField = lazy(() => import("../../components/Ui/Input/InputField"));
const Card = lazy(() => import("../../components/Ui/card/Card"));

const AddProject = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoggedIn } = useSelector((state) => state.admin);
  const { projects, loading } = useSelector((state) => state.projects);

  const [formData, setFormData] = useState({
    projectName: "",
    description: "",
    url: "",
    image: null,
  });

  const [errors, setErrors] = useState({});
  const [previewImage, setPreviewImage] = useState(null);
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  // 🚀 Protect route & fetch projects
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/admin-login");
    } else {
      dispatch(fetchAllProjects());
    }
  }, [dispatch, isLoggedIn, navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = files[0];
      setFormData((prev) => ({ ...prev, image: file }));
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    const { projectName, description, url, image } = formData;
    const newErrors = {};

    if (!projectName.trim()) newErrors.projectName = "Project name is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (!url.trim()) newErrors.url = "Project URL is required";
    else if (!/^https?:\/\/\S+$/.test(url)) newErrors.url = "Enter a valid URL";
    if (!image) newErrors.image = "Image is required";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setFeedback({ type: "", message: "" });

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      payload.append(key, value);
    });

    try {
      await dispatch(addNewProject(payload)).unwrap();
      setFeedback({ type: "success", message: "✅ Project added successfully!" });

      // Reset form
      setFormData({
        projectName: "",
        description: "",
        url: "",
        image: null,
      });
      setPreviewImage(null);
    } catch (err) {
      setFeedback({
        type: "error",
        message: `❌ ${err?.message || "Failed to add project"}`,
      });
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center pt-20 pb-6 px-4">
      <div className="w-xs sm:w-sm md:w-md lg:w-lg xl:w-xl backdrop-blur-sm border p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Add <span className="text-orange-500">Project</span>
        </h1>

        {feedback.message && (
          <div
            className={`text-center text-sm mb-4 ${feedback.type === "success" ? "text-green-500" : "text-red-500"}`}
          >
            {feedback.message}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="space-y-4"
        >
          {/* Lazy loaded InputField component */}
          <Suspense fallback={<Loader />}>
            <InputField
              label="Project Name"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              error={errors.projectName}
            />
          </Suspense>

          <Suspense fallback={<Loader />}>
            <InputField
              label="Description"
              name="description"
              type="textarea"
              value={formData.description}
              onChange={handleChange}
              error={errors.description}
            />
          </Suspense>

          <Suspense fallback={<Loader />}>
            <InputField
              label="Project URL"
              name="url"
              value={formData.url}
              onChange={handleChange}
              error={errors.url}
            />
          </Suspense>

          <div>
            <label className="block text-sm font-medium text-orange-500 mb-2">
              Upload Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded file:bg-orange-50 file:text-orange-600 hover:file:bg-orange-100"
            />
            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="mt-4 w-40 h-32 object-cover rounded border"
              />
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 bg-orange-500 text-white font-medium rounded hover:bg-orange-600 transition flex items-center justify-center ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <>
                <Loader className="mr-2" />
                Submitting...
              </>
            ) : (
              "Add Project"
            )}
          </button>
        </form>
      </div>

      {projects?.length > 0 && (
        <div className="w-full max-w-4xl mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Lazy loaded Card component */}
          <Suspense fallback={<Loader />}>
            {projects.map((project) => (
              <Card key={project._id} project={project} admin={true} />
            ))}
          </Suspense>
        </div>
      )}
    </div>
  );
};

export default AddProject;
