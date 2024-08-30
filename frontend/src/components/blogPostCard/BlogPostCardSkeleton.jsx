import React from 'react';

function BlogPostSkeleton({ mode }) {
  return (
    <div className={`animate-pulse bg-${mode === "dark" ? "gray-800" : "white"} border 
    border-${mode === "dark" ? "gray-700" : "gray-200"} rounded-lg overflow-hidden shadow-lg`}>

      {/* For Thumbnail */}
      <div className="w-full h-48 bg-gray-300 dark:bg-gray-700"></div>

      {/* Skeleton for the Content */}
      <div className="p-6">

        {/* For date */}
        <div className="h-4 bg-gray-300 dark:bg-gray-700 mb-2.5 w-1/4"></div>  

        {/* For Title  */}
        <div className="h-6 bg-gray-300 dark:bg-gray-700 mb-4 w-3/4"></div>

        {/* For Description  */}
        <div className="h-4 bg-gray-300 dark:bg-gray-700 mb-2.5 w-full"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 mb-2.5 w-full"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 mb-2.5 w-5/6"></div>

        {/* For Button  */}
        <div className="h-10 bg-gray-300 dark:bg-gray-700 mt-4 w-1/3"></div>

      </div>
    </div>
  );
}

export default BlogPostSkeleton;
