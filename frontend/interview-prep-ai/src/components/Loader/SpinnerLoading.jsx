import React from 'react';

const SpinnerLoader = () => {
  return (
    <div className="flex items-center justify-center" role="status">
      {/* w-5 h-5 (20px) = Small and precise
        border-2 = Sharp line weight
        border-t-black = Only the top edge is colored
        border-r-transparent... = All other edges are invisible
      */}
      <div 
        className="w-5 h-5 rounded-full border-2 border-t-black border-r-transparent border-b-transparent border-l-transparent animate-spin dark:border-t-white"
      ></div>
      
      {/* Accessibility label */}
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default SpinnerLoader;