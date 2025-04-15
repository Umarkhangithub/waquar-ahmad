import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Layout from "./components/Layout/Layout";
import PrivateRoute from "./components/PrivateRoutes/PrivateRoutes";
import Loader from "./components/Ui/Input/Loader/Loader";

// Lazy load pages
const Home = lazy(() => import("./pages/Home/Home"));
const About = lazy(() => import("./pages/About/About"));
const Skill = lazy(() => import("./pages/Skills/Skills"));
const Contact = lazy(() => import("./pages/Contact/Contact"));
const AdminRegister = lazy(() => import("./components/admin/AdminRegister"));
const AddProject = lazy(() => import("./pages/Add-project/AddProject"));
const AllProjects = lazy(() => import("./pages/projects/Projects"));
const UpdateProject = lazy(() => import("./components/Update/UpdateProject"));

function App() {
  return (
    <Router>
      <Layout>
        <Suspense
          fallback={
            <div className="w-full flex justify-center items-center h-[70vh]">
              <Loader size="h-20 w-20" />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skill />} />
            <Route path="/projects" element={<AllProjects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin-login" element={<AdminRegister />} />

            {/* 🔐 Protected Routes */}
            <Route
              path="/add-project"
              element={
                <PrivateRoute>
                  <AddProject />
                </PrivateRoute>
              }
            />
            <Route
              path="/update-project/:id"
              element={
                <PrivateRoute>
                  <UpdateProject />
                </PrivateRoute>
              }
            />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;
