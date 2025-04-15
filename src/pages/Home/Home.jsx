import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import waquarImg from "../../assets/img/waquar.png";
import bgImage from "../../assets/img/bgImg.jpg";

import Container from "../../components/Ui/container/Container";
import SocialIcons from "../../components/Ui/icons/SocialIcons";

const Home = () => {
  return (
    <Container>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh] w-full shadow-2xl rounded-xl overflow-hidden"
      >
        {/* 🔹 Left: Profile with background */}
        <div
          className="flex items-center justify-center bg-cover bg-center relative"
          style={{ backgroundImage: `url(${bgImage})` }}
          aria-label="Waquar Ahmad's background section"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="backdrop-blur-md bg-black/30 p-6 rounded-full shadow-xl w-80 h-80 flex items-center justify-center hover:scale-105 transition-transform duration-300"
          >
            <img
              src={waquarImg}
              alt="Portrait of Waquar Ahmad"
              className="rounded-full w-full h-full object-cover shadow-2xl"
              loading="lazy"
            />
          </motion.div>
        </div>

        {/* 🔸 Right: Content */}
        <div className="flex items-center justify-center bg-black px-6 lg:px-12 py-12">
          <motion.aside
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 max-w-xl text-white"
          >
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-orange-400">
              Hello, I'm Waquar Ahmad
            </h1>

            <h2 className="text-lg md:text-xl lg:text-2xl font-medium">
              I'm a 3D Animator,&nbsp;
              <span className="text-orange-500 font-semibold">Blender Artist</span>
            </h2>

            <p className="text-gray-300 text-base md:text-lg leading-relaxed">
              I specialize in modeling, texturing, and animation—bringing stories to life
              through immersive visuals with tools like Blender and Photoshop. Let’s
              collaborate and build something amazing!
            </p>

            {/* 🔗 Social Media Icons */}
            <SocialIcons />

            {/* 🔘 Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="/Resume.pdf"
                download="Waquar_Ahmad_Resume.pdf"
                className="px-6 py-2 rounded-md bg-orange-500 hover:bg-orange-600 text-white font-medium transition duration-300"
                aria-label="Download Waquar Ahmad's resume"
              >
                Download CV
              </a>
              <Link
                to="/contact"
                className="px-6 py-2 rounded-md border border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white transition duration-300"
              >
                Contact Me
              </Link>
            </div>
          </motion.aside>
        </div>
      </motion.section>
    </Container>
  );
};

export default Home;
