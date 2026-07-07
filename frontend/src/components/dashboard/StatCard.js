"use client";

import { motion } from "framer-motion";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color = "blue",
}) {

  const colors = {
    blue: {
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
    green: {
      bg: "bg-green-100",
      text: "text-green-600",
    },
    yellow: {
      bg: "bg-yellow-100",
      text: "text-yellow-600",
    },
    purple: {
      bg: "bg-purple-100",
      text: "text-purple-600",
    },
    red: {
      bg: "bg-red-100",
      text: "text-red-600",
    },
    indigo: {
      bg: "bg-indigo-100",
      text: "text-indigo-600",
    },
  };

  return (

    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      transition={{
        duration: 0.25,
      }}
      className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
    >

      <div className="flex justify-between items-center">

        <div>

          <p className="text-gray-500 text-sm">

            {title}

          </p>

          <h2 className="text-3xl font-bold mt-2">

            <AnimatedCounter value={value} />
            
          </h2>

          <p className="text-green-600 text-sm mt-3">

            {subtitle}

          </p>

        </div>

        <div
          className={`
            w-14
            h-14
            rounded-xl
            flex
            items-center
            justify-center
            ${colors[color].bg}
          `}
        >

          <Icon
            className={colors[color].text}
            size={30}
          />

        </div>

      </div>

    </motion.div>

  );

}