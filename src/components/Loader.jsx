import { GridLoader } from "react-spinners";

const Loader = () => {
   return (
      <div className='flex justify-center items-center w-[100vw] h-[100vh]'>
         <GridLoader color='#330202' size={25} />
      </div>
   );
};

export default Loader;
