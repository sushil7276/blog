import { forwardRef, useId } from "react";

const Select = ({ options = [], className = "", label, ...props }, ref) => {
   const id = useId();
   return (
      <div className='w-full'>
         {label && <label htmlFor={id}></label>}
         <select
            id={id}
            ref={ref}
            {...props}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
         >
            {options?.map((item) => (
               <option key={item} value={item}>
                  {item}
               </option>
            ))}
         </select>
      </div>
   );
};

export default forwardRef(Select);
