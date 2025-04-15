import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import waquarImg from "../../assets/img/waquar.png";
import bgImage from "../../assets/img/bgImg.jpg";

import Container from "../../components/Ui/container/Container";
import SocialIcons from "../../components/Ui/icons/SocialIcons";

// Motion Variants
const fadeInFromRight = {
  hidden: { x: 100, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

const fadeInZoom = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

const About = () => {
  return (
    <Container>
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh] w-full shadow-2xl rounded-xl overflow-hidden">
        
        {/* Left: About Text Content */}
        <div className="flex items-center justify-center bg-black px-6 lg:px-12 py-12">
          <motion.aside
            variants={fadeInFromRight}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-6 max-w-xl text-white"
          >
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-orange-400">
              Hello, I'm Waquar Ahmad
            </h1>

            <h2 className="text-lg md:text-xl lg:text-2xl font-medium">
              I'm a 3D Animator,{" "}
              <span className="text-orange-500 font-semibold">Blender Artist</span>
            </h2>

            <p className="text-gray-300 text-base md:text-lg leading-relaxed">
              I specialize in creating CGI ads and product visualizations,
              bringing ideas to life with high-quality, photorealistic visuals.
              Using advanced 3D modeling, texturing, and rendering techniques,
              I deliver compelling content for marketing and branding. Let's
              craft visuals that truly captivate your audience.
            </p>

            <SocialIcons />

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="/Resume.pdf"
                download="Waquar_Ahmad_Resume.pdf"
                className="px-6 py-2 rounded-md bg-orange-500 hover:bg-orange-600 text-white font-medium transition duration-300"
                aria-label="Download Waquar Ahmad's Resume"
              >
                Download CV
              </a>
              <Link
                to="/contact"
                className="px-6 py-2 rounded-md border border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white transition duration-300"
                aria-label="Navigate to Contact Page"
              >
                Contact Me
              </Link>
            </div>
          </motion.aside>
        </div>

        {/* Right: Profile Image */}
        <div
          className="flex items-center justify-center bg-cover bg-center relative"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <motion.div
            variants={fadeInZoom}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="backdrop-blur-md bg-black/30 p-6 rounded-full shadow-lg w-80 h-80 flex items-center justify-center"
          >
            <img
              src={waquarImg}
              alt="Waquar Ahmad smiling portrait in a circular frame"
              loading="lazy"
              className="rounded-full w-full h-full object-cover shadow-2xl"
            />
          </motion.div>
        </div>
      </div>
    </Container>
  );
};

export default About;
