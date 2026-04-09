import * as React from "react"
import { motion } from "framer-motion"

export default function FloatingClouds() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center z-0">
       {/* 1. Original Sky Blue */}
       <motion.div
         className="absolute w-[600px] h-[300px] bg-sky-400/40 rounded-[100%] blur-[100px]"
         animate={{ x: ["-100vw", "100vw"] }}
         transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
         style={{ top: "20%" }}
       />
       {/* 2. Original Deep Blue */}
       <motion.div
         className="absolute w-[800px] h-[400px] bg-blue-500/35 rounded-[100%] blur-[120px]"
         animate={{ x: ["-120vw", "120vw"] }}
         transition={{ duration: 35, repeat: Infinity, ease: "linear", delay: 3 }}
         style={{ top: "40%" }}
       />
       {/* 3. Original Cyan */}
       <motion.div
         className="absolute w-[500px] h-[250px] bg-cyan-300/40 rounded-[100%] blur-[80px]"
         animate={{ x: ["-80vw", "100vw"] }}
         transition={{ duration: 45, repeat: Infinity, ease: "linear", delay: 8 }}
         style={{ top: "35%" }}
       />
       
       {/* 4. New Theme Indigo */}
       <motion.div
         className="absolute w-[700px] h-[350px] bg-teal-500/25 rounded-[100%] blur-[110px]"
         animate={{ x: ["-110vw", "110vw"] }}
         transition={{ duration: 30, repeat: Infinity, ease: "linear", delay: 1 }}
         style={{ top: "15%" }}
       />
       {/* 5. New Theme Violet */}
       <motion.div
         className="absolute w-[850px] h-[450px] bg-blue-500/25 rounded-[100%] blur-[130px]"
         animate={{ x: ["-130vw", "130vw"] }}
         transition={{ duration: 42, repeat: Infinity, ease: "linear", delay: 15 }}
         style={{ top: "50%" }}
       />
       {/* 6. New Theme Teal/Indigo Mix */}
       <motion.div
         className="absolute w-[450px] h-[250px] bg-teal-400/35 rounded-[100%] blur-[90px]"
         animate={{ x: ["-70vw", "120vw"] }}
         transition={{ duration: 32, repeat: Infinity, ease: "linear", delay: 5 }}
         style={{ top: "65%" }}
       />
    </div>
  )
}
