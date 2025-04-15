import React, { useCallback } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteProject } from "../../../features/projects/projectSlice";
import { useNavigate } from "react-router-dom";

// Lazy load image component
const LazyImage = React.memo(({ src, alt }) => (
  <img
    src={src}
    alt={alt}
    className="w-full h-60 object-cover"
    loading="lazy" // Lazy load image for better performance
  />
));

const Card = ({ project, admin = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = useCallback(() => {
    dispatch(deleteProject(project._id));
  }, [dispatch, project._id]);

  const handleUpdate = useCallback(
    (id) => {
      navigate(`/update-project/${id}`);
    },
    [navigate]
  );

  return (
    <div className="bg-white/30 text-white rounded-2xl  shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl  flex flex-col justify-between">
      {/* Lazy-loaded image */}
      {project.image && <LazyImage src={project.image} alt={project.name} />}

      <div className="p-5 flex flex-col justify-between flex-1">
        <div>
          {/* Project name */}
          <h2 className="text-xl font-semibold text-orange-400 mb-2">{project.name}</h2>
          {/* Project description */}
          <p className="text-gray-200 text-sm line-clamp-3">{project.description}</p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          {/* Project URL */}
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded hover:bg-orange-600 transition"
          >
            Visit Project
          </a>

          {admin && (
            <div className="flex space-x-2">
              {/* Edit button */}
              <button
                onClick={() => handleUpdate(project._id)}
                className="p-2 rounded-full hover:bg-orange-400 hover:text-white transition"
                aria-label="Edit project"
              >
                <FaEdit size={18} />
              </button>
              {/* Delete button */}
              <button
                onClick={handleDelete}
                className="p-2 rounded-full hover:bg-red-500 hover:text-white transition"
                aria-label="Delete project"
              >
                <MdDelete size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Card); // Memoized for performance optimization
