import React, { useEffect, Suspense } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAdmin } from "../../features/admin/adminSlice";
import Loader from "../Ui/Input/Loader/Loader";

// Lazy loading the Resume to prevent blocking the main UI thread
const Resume = React.lazy(() => import("../../assets/Resume.pdf"));

export const navItems = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/skills", label: "Skills" },
  { path: "/projects", label: "Projects" },
  { path: "/admin-login", label: "Register" },
  { path: "/contact", label: "Contact Us" },
];

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isLoggedIn } = useSelector((state) => state.admin);

  // Sync route after login only from login page
  useEffect(() => {
    if (isLoggedIn && location.pathname === "/admin-login") {
      navigate("/add-project");
    }
  }, [isLoggedIn, location, navigate]);

  const handleLogout = () => {
    dispatch(logoutAdmin());
    navigate("/admin-login");
  };

  return (
    <header className="navbar backdrop-blur-md shadow-md border-b border-green-50 bg-black/60 text-white">
      <div className="navbar-start">
        <div className="dropdown lg:hidden">
          <button tabIndex={0} className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52 bg-black text-white text-center"
          >
            {navItems.map(({ path, label }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-md text-center ${
                      isActive
                        ? "bg-orange-500 text-white"
                        : "text-white hover:text-orange-400"
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <Link to="/" className="text-2xl font-bold pl-3 lg:pl-10">
          Waquar <span className="text-orange-500">Ahmad</span>
        </Link>
      </div>

      <nav className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-4">
          {navItems.map(({ path, label }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-md text-center ${
                    isActive
                      ? "bg-orange-500 text-white"
                      : "text-white hover:text-orange-400"
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="navbar-end pr-4 lg:pr-10 flex gap-2">
        <Suspense fallback={<Loader />}>
          <a
            href={Resume}
            download="Waquar_Ahmad_Resume.pdf"
            className="px-6 py-2  rounded-md bg-orange-500 hover:bg-orange-600 text-white font-medium transition duration-300"
          >
            Resume
          </a>
        </Suspense>

        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="px-6 py-2 rounded-md bg-orange-500 hover:bg-orange-600 text-white font-medium transition duration-300"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
