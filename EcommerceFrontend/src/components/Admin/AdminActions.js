import React from "react";
import { useNavigate } from "react-router-dom";
import AdminNavi from "./AdminNavi";
import AdminButtons from "./ActionButtons";
import { motion } from "framer-motion";

const AdminActions = () => {
  const navigate = useNavigate();
  return (
    <motion.div 
    initial={{opacity:0}}
    animate={{opacity:1}}
    transition={{duration:0.2}}
    exit={{opacity:0}}
    >
    <div className="body">
      <AdminNavi />
      <AdminButtons/>
    </div>
    </motion.div>
  );
};

export default AdminActions;