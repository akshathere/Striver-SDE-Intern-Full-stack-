// Input component extends from shadcnui - https://ui.shadcn.com/docs/components/input
"use client";
/* eslint-disable */
import * as React from "react";
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";
import Cn from "../util/cn";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}
const Select1 = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type,onChange, ...props }, ref) => {
    const radius = 100; // change this to increase the rdaius of the hover effect
    const [visible, setVisible] = React.useState(false);
    
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: any) {
      const { left, top } = currentTarget.getBoundingClientRect();

      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }
  
  
    
    return (
      <motion.div
        style={{
          background: useMotionTemplate`
        radial-gradient(
          ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
          var(--blue-500),
          transparent 80%
        )
      `,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="p-[2px] rounded-lg transition duration-300 group/input"
      >
        
        <select value={className}  className={Cn(`flex h-10 w-full border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm  file:border-0 file:bg-transparent 
          file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600 
          focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600
           disabled:cursor-not-allowed disabled:opacity-50
           dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]
           group-hover/input:shadow-none transition duration-400
           `,
           className)} id="codeLanguage" onChange={onChange}  required>// @ts-ignore
          <Option className={className} value="C++">C++</Option>
          <Option className={className} value="Java">Java</Option>
          <Option className={className} value="JavaScript">JavaScript</Option>
          <Option className={className} value="Python">Python</Option>
        </select>
      </motion.div>
    );
  }
);
Select1.displayName = "Input";
function Option({ value, className,children }: { value: string; className?: string; children?: string }) {
    return (
        
      <option
        className={Cn(
          `flex h-10 w-full border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm  file:border-0 file:bg-transparent 
            file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600 
            focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600
             disabled:cursor-not-allowed disabled:opacity-50
             dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]
             group-hover/input:shadow-none transition duration-400
             `,
          className
        )}
        value={value}
      >
        {children}
      </option>
    );
  }
export { Select1 };



