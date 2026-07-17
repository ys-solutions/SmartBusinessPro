"use client";

import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function Modal({

    open,
    onClose,
    title,
    children,
    width = "max-w-lg",

}) {

    if (!open) return null;

    return (

        <AnimatePresence>

            <motion.div

                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}

                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"

                onClick={onClose}

            >

                <motion.div

                    initial={{
                        opacity: 0,
                        scale: .9,
                        y: 30,
                    }}

                    animate={{
                        opacity: 1,
                        scale: 1,
                        y: 0,
                    }}

                    exit={{
                        opacity: 0,
                        scale: .9,
                        y: 30,
                    }}

                    transition={{
                        duration: .20,
                    }}

                    onClick={(e) => e.stopPropagation()}

                    className={`bg-white rounded-2xl shadow-2xl w-full ${width} mx-4 overflow-hidden`}

                >

                    <div className="flex items-center justify-between px-6 py-4 border-b">

                        <h2 className="text-xl font-semibold">

                            {title}

                        </h2>

                        <button

                            onClick={onClose}

                            className="p-2 rounded-lg hover:bg-gray-100 transition"

                        >

                            <X size={20} />

                        </button>

                    </div>

                    <div className="p-6">

                        {children}

                    </div>

                </motion.div>

            </motion.div>

        </AnimatePresence>

    );

}