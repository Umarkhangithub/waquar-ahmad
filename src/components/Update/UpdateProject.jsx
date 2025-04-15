import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProject, getSingleProject } from "../../features/projects/projectSlice";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

import InputField from "../Ui/Input/InputField";
import Container from "../Ui/container/Container";
import Loader from "../Ui/Input/Loader/Loader";

const UpdateProject = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, project } = useSelector((state) => state.projects);
  const [formInitialized, setFormInitialized] = useState(false);

  const [formData, setFormData] = useState({
    projectName: "",
    description: "",
    url: "",
    image: null,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const { project } = await dispatch(getSingleProject(id)).unwrap();
        setFormData({
          projectName: project.name || "",
          description: project.description || "",
          url: project.url || "",
          image: null,
        });
        setPreviewImage(project.imageUrl || null);
        setFormInitialized(true);
      } catch (error) {
        toast.error("Failed to load project.");
      }
    };

    fetchProject();
  }, [id, dispatch]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files.length > 0) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, image: file }));

      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.projectName.trim()) newErrors.projectName = "Project Name is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.url.trim()) newErrors.url = "Project URL is required";
    else if (!/^https?:\/\/.+/.test(formData.url)) newErrors.url = "Invalid URL format";

    if (
      formData.image &&
      !["image/jpeg", "image/png"].includes(formData.image.type)
    ) {
      newErrors.image = "Image must be JPEG or PNG";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formInitialized) {
      toast.error("Please wait until the project data is loaded.");
      return;
    }

    if (!validateForm()) return;

    const submissionData = new FormData();
    submissionData.append("projectName", formData.projectName);
    submissionData.append("description", formData.description);
    submissionData.append("url", formData.url);
    if (formData.image) {
      submissionData.append("image", formData.image);
    }

    try {
      await dispatch(updateProject({ id, data: submissionData })).unwrap();
      toast.success("Project updated successfully!");
      navigate("/projects");
    } catch (error) {
      toast.error("Failed to update project.");
    }
  };

  if (loading || !formInitialized) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader size="h-20 w-20" />
      </div>
    );
  }

  return (
    <Container>
      <div className="min-h-[80vh] flex flex-col items-center pt-20 pb-6 px-4">
        <div className="w-xs sm:w-sm md:w-md lg:w-lg xl:w-xl backdrop-blur-sm border p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-white text-center mb-6">
            Update <span className="text-orange-500">Project</span>
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
            <InputField
              label="Project Name"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              error={errors.projectName}
            />

            <InputField
              label="Description"
              name="description"
              type="textarea"
              value={formData.description}
              onChange={handleChange}
              error={errors.description}
            />

            <InputField
              label="Project URL"
              name="url"
              value={formData.url}
              onChange={handleChange}
              error={errors.url}
            />

            <div>
              <label className="block text-sm font-medium text-orange-500 mb-2">
                Upload Image (Optional)
              </label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded file:bg-orange-50 file:text-orange-600 hover:file:bg-orange-100"
              />
              {errors.image && (
                <p className="text-red-500 text-sm mt-1">{errors.image}</p>
              )}
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
              disabled={loading || !formInitialized}
              className={`w-full py-2 px-4 bg-orange-500 text-white font-medium rounded hover:bg-orange-600 transition flex items-center justify-center ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <>
                  <Loader className="mr-2" />
                  Updating...
                </>
              ) : (
                "Update Project"
              )}
            </button>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default UpdateProject;
