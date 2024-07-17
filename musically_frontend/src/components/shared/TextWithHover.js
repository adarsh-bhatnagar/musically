import React from "react"
 const TextWithHover = ({displayText}) => {
     return (
       <div className='w-full flex items-center justify-start p-2 cursor-pointer'>
           <div className="text-gray-500 ml-4 font-bold font-ubuntu text-lg hover:text-white">
               {displayText}
           </div>
       </div>
     )
   }
  
  export default TextWithHover