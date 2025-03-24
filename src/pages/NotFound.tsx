
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div 
        className="text-center glass-card rounded-xl p-8 w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="text-6xl mb-4 inline-block"
          initial={{ rotate: -20 }}
          animate={{ rotate: [0, 5, 0, -5, 0] }}
          transition={{ 
            duration: 5, 
            repeat: Infinity,
            repeatType: "mirror" 
          }}
        >
          🌙
        </motion.div>
        <h1 className="text-4xl font-bold mb-2 text-glow">404</h1>
        <p className="text-xl text-space-silver mb-6">Houston, we have a problem.</p>
        <p className="text-space-silver/70 mb-8">The lunar coordinates you're looking for seem to be out of orbit.</p>
        
        <Link to="/">
          <motion.button
            className="px-6 py-3 rounded-lg bg-space-purple hover:bg-space-purple/90 text-white font-medium flex items-center gap-2 mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Home className="w-4 h-4" /> Return to Home
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
