import Navbar from "../components/Shared/Navbar/Navbar";
import Footer from "../components/Shared/Footer/Footer";
import { Outlet, useLocation } from "react-router";
import { AnimatePresence, motion } from "framer-motion";

const MainLayout = () => {
  const location = useLocation();

  return (
    <div>
      <Navbar />
      <div className="min-h-[calc(100vh-68px)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
