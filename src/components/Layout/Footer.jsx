import React from "react";
import { Link } from "react-router-dom";
import { navItems } from "./Header";
import SocialIcons from "../Ui/icons/SocialIcons";

const Footer = () => {
  return (
    <footer className="footer footer-horizontal footer-center rounded p-10 backdrop-blur-md shadow-md bg-black/60 text-base-50">
      <nav>
        <ul className="flex flex-wrap justify-center gap-4">
          {navItems.map(({ path, label }) => (
            <li key={path}>
              <Link
                to={path}
                className="px-3 py-2 rounded-md text-center text-white hover:text-orange-400"
                activeClassName="bg-orange-500 text-white"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <nav>
        <div className="grid grid-flow-col gap-4">
          {/* 🔗 Social Media Icons */}
          <SocialIcons iconSize="text-3xl"color="text-base-500"/>
        </div>
      </nav>

      <aside>
        <p>
          <small>
            Copyright © {new Date().getFullYear()} - All rights reserved by ACME Industries Ltd
          </small>
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
