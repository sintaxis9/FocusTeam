// src/pages/Home.tsx
import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/hero';
import Analytics from '../components/analytics';
import Footer from '../components/footer';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 }
};

const pageTransition = {
  duration: 0.6,
  ease: "easeInOut" as const,
};

const Home: React.FC = () => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-screen"
    >
      <Hero />
      <Analytics />
      <Footer />
    </motion.div>
  );
};


export default Home;
