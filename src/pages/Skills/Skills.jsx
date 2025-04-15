import React from "react";
import { motion } from "framer-motion";
import Container from "../../components/Ui/container/Container";
import { skills } from "./SKILLS_DATA.jsx";

// Memoized SkillCard to avoid unnecessary re-renders
const SkillCard = React.memo(({ skill, index }) => {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={cardVariants}
      className="bg-white text-black rounded-xl shadow-md backdrop-blur-sm bg-opacity-90 transition-transform transform hover:scale-105 p-6"
    >
      <h3 className="text-xl font-semibold text-orange-500 mb-4">
        {skill.title}
      </h3>
      {skill.points.map((point, idx) => (
        <p key={idx} className="text-sm mb-2">
          <span className="font-medium text-orange-500">
            {point.highlight}:
          </span>{" "}
          {point.text}
        </p>
      ))}
    </motion.div>
  );
});

// Animation Variants
const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const Skill = () => {
  return (
    <Container>
      <section className="bg-black px-4 py-10">
        {/* Section Header */}
        <motion.header
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          className="flex flex-col justify-center items-center text-center mb-10"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            <span className="text-orange-500">Skills</span>
          </h2>
          <p className="text-base md:text-lg text-gray-300 leading-relaxed max-w-3xl">
            I specialize in 3D animation with a focus on modeling, texturing,
            rigging, and storytelling using tools like Blender and Photoshop.
            My process includes concept visualization, detailed asset creation,
            and final video editing for high-quality, immersive animations.
          </p>
        </motion.header>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <SkillCard key={index} skill={skill} index={index} />
          ))}
        </div>
      </section>
    </Container>
  );
};

export default Skill;
