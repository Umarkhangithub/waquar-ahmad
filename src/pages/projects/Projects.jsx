import { useEffect, useMemo } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { motion } from "framer-motion";
import Container from "../../components/Ui/container/Container";
import Loader from "../../components/Ui/Input/Loader/Loader";
import Card from "../../components/Ui/card/Card";
import { fetchAllProjects } from "../../features/projects/projectSlice";

// Animation Variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const AllProjects = () => {
  const dispatch = useDispatch();

  // Efficient Redux state reading
  const { projects, loading, error } = useSelector(
    (state) => ({
      projects: state.projects.projects,
      loading: state.projects.loading,
      error: state.projects.error,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(fetchAllProjects());
  }, [dispatch]);

  // Memoize rendered cards
  const renderedProjects = useMemo(() => {
    return projects?.map((project) => (
      <motion.div key={project._id} variants={cardVariants}>
        <Card project={project} />
      </motion.div>
    ));
  }, [projects]);

  return (
    <Container>
      <div className="w-full backdrop-blur-sm p-8 rounded-lg shadow-md ">
        {/* Animated Heading */}
        <motion.h1
          variants={headingVariants}
          initial="hidden"
          animate="visible"
          className="text-3xl font-bold text-white text-center mb-6"
        >
          All <span className="text-orange-500">Projects</span>
        </motion.h1>

        {/* Error Message */}
        {error && (
          <div className="text-center text-red-500 mb-4 text-sm">{error}</div>
        )}

        {/* Loader */}
        {loading ? (
          <div className="w-full flex justify-center">
            <Loader size="h-20 w-20" />
          </div>
        ) : (
          <>
            {projects?.length === 0 ? (
              <p className="text-center text-white">No projects found.</p>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-6 "
              >
                {renderedProjects}
              </motion.div>
            )}
          </>
        )}
      </div>
    </Container>
  );
};

export default AllProjects;
