import { motion } from "framer-motion";

export const EASE = [0.16, 1, 0.3, 1];

export default function Reveal({ children, delay = 0, className = "", ...rest }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
