import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Toast = ({ type = "success", message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => onClose(), 3000); // auto close in 3s
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <AnimatePresence>
            {message && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.3 }}
                    className={`fixed bottom-6 right-6 max-w-xs w-full p-4 rounded-2xl shadow-lg text-sm sm:text-base 
          ${type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"}`}
                >
                    <p className="truncate text-ellipsis overflow-hidden max-w-full">
                        {message}
                    </p>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Toast;
